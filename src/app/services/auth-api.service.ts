import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoreService} from "./utils/core.service";
import {BaseService} from "./utils/base.service";
import {BehaviorSubject, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private apiService: BaseService
  ) {}

  createUserAccount(requestData: any): Observable<any>{
    return this.apiService.post(`users/create`, requestData);
  }

  loginAndGetAccessToken(requestData: any): Observable<any>{
    return this.apiService.post(`token`, requestData);
  }

  getAuthTokenFromLocalStorage() {
    try {
      const lsValue = localStorage.getItem('tokens');
      if (!lsValue) {
        return undefined;
      }
      return JSON.parse(lsValue);
    } catch (error) {
      return undefined;
    }
  }

  getGroups(params: any): Observable<any>{
    return this.apiService.get(`users/groups/list`, params);
  }

  getAuthUser(params: any): Observable<any>{
    return this.apiService.get(`users/auth/user`, params);
  }

  private formatErrors(error: Error) {
    return throwError(() => error);
  }

}
