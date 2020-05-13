import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if ((JSON.parse(localStorage.getItem('username'))) && JSON.parse(localStorage.getItem('token'))) {
      req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + JSON.parse(localStorage.getItem('token'))) });
    }
    return next.handle(req);
  }
}
