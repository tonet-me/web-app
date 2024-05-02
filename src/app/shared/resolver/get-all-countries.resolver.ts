import {ResolveFn} from '@angular/router';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {catchError, map, mergeMap, Observable, of, shareReplay} from "rxjs";
import {DestroyRef, inject} from "@angular/core";
import {LocationService} from "@shared/services/location.service";
import {countryModel, IpInfoModel} from "@shared/models/location.model";

export const getAllCountriesResolver: ResolveFn<Observable<{
  countryList: countryModel[],
  ipInfo: IpInfoModel
}>> = () => {
  const locationService = inject(LocationService)
  const destroyRef = inject(DestroyRef)
  return locationService.getCountries().pipe(
    shareReplay(1),
    takeUntilDestroyed(destroyRef),
    mergeMap((countryList) =>
      locationService.getIpInfo().pipe(
        shareReplay(1),
        map(ipInfo => {
          return ({countryList, ipInfo});
        }),
        catchError(() => {
          return of({
            countryList, ipInfo: {
              ip: "170.171.1.0",
              city: "New York City",
              region: "New York",
              country: "US",
              loc: "40.7143,-74.0060",
              org: "AS11790 Random House, Inc.",
              postal: "10001",
              timezone: "America/New_York",
            }
          })
        })
      )
    ))
};
