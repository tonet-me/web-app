import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {countryModel, IpInfoModel} from "../models/setting.model";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<countryModel[]> {
    return this.http.get<countryModel[]>(environment.panelUrl + 'assets/data/country-code.json')
  }

  getIpInfo(): Observable<IpInfoModel> {
    return this.http.get<IpInfoModel>('https://ipinfo.io')
  }

}
