import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = sessionStorage.getItem("jwt");
    if(request.url.indexOf("getOffers.php") === -1 && request.url.indexOf("login.php") === -1){
    request = request.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }
    return next.handle(request);
  }
}

