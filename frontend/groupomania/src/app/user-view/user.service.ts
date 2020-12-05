import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  public authToken: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createUser(newUser: User) {
    return this.http.post('http://localhost:3000/api/auth/signup', newUser);
  };

  loginUser(email: string, password: string) {
    return this.http.post('http://localhost:3000/api/auth/login', { email: email, password: password });
  };


  logout() {
    this.authToken = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

  getToken() {
    return this.authToken;
  }

}
