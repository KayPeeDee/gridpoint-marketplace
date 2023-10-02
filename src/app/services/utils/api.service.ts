import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server!: string;
  // contentType = 'multipart-form-data';
  contentType = '';

  constructor(private http: HttpClient) {}

  get<T>(
    path: string,
    params: HttpParams = new HttpParams(),
    contentType: string = this.contentType
  ): Observable<T> {
    return this.http
      .get<T>(`${this.server}${path}`, {
        headers: this.setHeaders(contentType),
        params: params,
      })
      .pipe(catchError(this.formatErrors));
  }

  post<T>(
    path: string,
    body: any,
    params: HttpParams = new HttpParams(),
    contentType: string = this.contentType
  ): Observable<T> {
    return this.http
      .post<T>(`${this.server}${path}`, body, {
        headers: this.setHeaders(contentType),
        params: params
      })
      .pipe(catchError(this.formatErrors));
  }

  put<T>(
    path: string,
    body: any = {},
    params: HttpParams = new HttpParams(),
    contentType: string = this.contentType
  ): Observable<T> {
    return this.http
      .put<T>(`${this.server}${path}`, body, {
        headers: this.setHeaders(contentType),
        params: params
      })
      .pipe(catchError(this.formatErrors));
  }

  patch<T>(
    path: string,
    body: any = {},
    contentType: string = this.contentType
  ): Observable<T> {
    return this.http
      .patch<T>(`${this.server}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(contentType)
      })
      .pipe(catchError(this.formatErrors));
  }

  delete<T>(
    path: string,
    contentType: string = this.contentType,
    params: HttpParams = new HttpParams()
  ): Observable<T> {
    return this.http
      .delete<T>(`${this.server}${path}`, {
        headers: this.setHeaders(contentType),
        params: params
      })
      .pipe(catchError(this.formatErrors));
  }

  file(path: string, file: File, contentType: string = ''): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http
      .post(`${this.server}${path}`, formData)
      .pipe(catchError(this.formatErrors));
  }

  getFile(
    path: string,
    params: HttpParams = new HttpParams()
  ): Observable<Blob> {
    return this.http.get(`${this.server}${path}`, {
      responseType: 'blob',
      params: params
    });
  }

  public upload<T>(path: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.request(
      new HttpRequest('POST', `${this.server}${path}`, formData, {
        reportProgress: false
      })
    );
  }

  private setHeaders(contentType: string = ''): HttpHeaders {
    const headersConfig = {
      'Content-Type' : 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
    switch (contentType) {
      case 'file':
        break;
      case 'form-data':
        headersConfig['Content-Type'] = `application/x-www-form-urlencoded`;
        break;
      case 'multipart-form-data':
        headersConfig['Content-Type'] = `multipart/form-data`;
        break;
      default:
        headersConfig['Content-Type'] = `application/json`;
        break;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: Error) {
    return throwError(error);
  }
}
