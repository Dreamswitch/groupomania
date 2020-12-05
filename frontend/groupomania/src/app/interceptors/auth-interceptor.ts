import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user-view/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private user: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.user.getToken();
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(newRequest);
  }
}
