import {ResolveFn} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map, mergeMap, Observable, of, shareReplay} from "rxjs";
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
        })
      )
    ))
};
