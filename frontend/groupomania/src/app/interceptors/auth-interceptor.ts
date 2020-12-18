import { HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private user: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    /* const authToken = this.user.getToken(); */
    const newRequest = req.clone({
      withCredentials: true/* ,
      headers: req.headers.set('Authorization', 'Bearer ' + authToken) */
    });
    return next.handle(newRequest);
  }

}
