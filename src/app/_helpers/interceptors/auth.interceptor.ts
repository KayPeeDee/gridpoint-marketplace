import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthApiService} from "../../services/auth-api.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getAuthTokenFromLocalStorage();
    if (authToken){
      const authReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken.access}`)
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }

}
