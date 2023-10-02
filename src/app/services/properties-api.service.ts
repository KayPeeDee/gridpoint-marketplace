import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoreService} from "./utils/core.service";
import {BaseService} from "./utils/base.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertiesApiService {

  constructor(
    private http: HttpClient,
    private coreService: CoreService,
    private apiService: BaseService
  ) {}

  createProperty(requestData: any): Observable<any>{
    return this.apiService.post(`properties/create`, requestData);
  }

  createPropertyLocation(requestData: any): Observable<any>{
    return this.apiService.post(`properties/property/locations`, requestData);
  }


  createPropertyDeeds(requestData: any): Observable<any>{
    return this.apiService.post(`properties/property/deeds/create-multiple`, requestData);
  }

  createAdditionalPropertyInfo(requestData: any): Observable<any>{
    return this.apiService.post(`properties/property/additional-info/create`, requestData);
  }

  createPropertyFinancialInfo(requestData: any): Observable<any>{
    return this.apiService.post(`properties/property/financials-info/create`, requestData);
  }

  createPropertyMarketingInfo(requestData: any): Observable<any>{
    return this.apiService.post(`properties/property/marketing-info/create`, requestData);
  }

  getPropertiesByUser(params: any): Observable<any>{
    return this.apiService.get(`properties/list/by-user`, params);
  }

  createPropertyOwners(requestData: any, type: string): Observable<any>{
    return this.apiService.post(`properties/property/ownership/create/${type}`, requestData);
  }

  getPropertiesOwnership(propertyId: number, params: any): Observable<any>{
    return this.apiService.get(`properties/property/ownership/list/${propertyId}`, params);
  }


}
