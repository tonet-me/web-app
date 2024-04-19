import {ResolveFn} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {catchError, map, mergeMap, Observable, of, shareReplay} from "rxjs";
import {DestroyRef, inject} from "@angular/core";
import {SettingService} from "@app/modules/settings/services/setting.service";
import {countryModel, IpInfoModel} from "@app/modules/settings/models/setting.model";

export const getAllCountriesResolver: ResolveFn<Observable<{
  countryList: countryModel[],
  ipInfo: IpInfoModel
}>> = () => {
  const settingService = inject(SettingService)
  const destroyRef = inject(DestroyRef)
  return settingService.getCountries().pipe(
    shareReplay(1),
    takeUntilDestroyed(destroyRef),
    mergeMap((countryList) =>
      settingService.getIpInfo().pipe(
        shareReplay(1),
        map(ipInfo => {
          return ({countryList, ipInfo});
        }),
        catchError(() => {
          return of({
            countryList, ipInfo: {
              ip:"170.171.1.0",
              city:"New York City",
              region:"New York",
              country:"US",
              loc:"40.7143,-74.0060",
              org:"AS11790 Random House, Inc.",
              postal:"10001",
              timezone:"America/New_York",
            }
          })
        })
      )
    ))
};
