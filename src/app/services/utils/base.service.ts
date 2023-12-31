import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BaseService extends ApiService{

  constructor(http: HttpClient) {
    super(http);
    this.server = `${environment.url}/`;
  }

}
