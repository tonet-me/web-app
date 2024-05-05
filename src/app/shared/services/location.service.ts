import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {countryModel, IpInfoModel} from "..//models/location.model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<countryModel[]> {
      return this.http.get<countryModel[]>(window.location.origin + '/assets/data/country-code.json')
  }

  getIpInfo(): Observable<IpInfoModel> {
    return this.http.get<IpInfoModel>('https://ipinfo.io')
  }

}
