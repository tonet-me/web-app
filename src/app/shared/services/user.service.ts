import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "@shared/models/user.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userData = new BehaviorSubject<UserModel | null>(null);
  private _userData$: Observable<UserModel | null> = this._userData.asObservable();

  constructor(private http: HttpClient) {
  }

  getUserApi(): Observable<{ user: UserModel } | null> {
    return this.http.get<{ user: UserModel }>('users/profile')
  }

  updateUser(values: Partial<UserModel>): Observable<{ update_data: UserModel }> {
    return this.http.put<{ update_data: UserModel }>('users/profile', {update_data: values})
  }

  get userData(): BehaviorSubject<UserModel | null> {
    return this._userData
  }

  set userData(user: UserModel | null) {
    this._userData.next(user)
  }

  getUserData$(): Observable<UserModel | null> {
    return this._userData$
  }

}
