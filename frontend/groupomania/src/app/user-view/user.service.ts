import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
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

  createUser(newUser: User): Observable<object> {
    return this.http.post('http://localhost:3000/api/auth/signup', newUser);
  }

  loginUser(email: string, password: string): any {
    return this.http.post('http://localhost:3000/api/auth/login', { email, password });
  }


  logout(): void {
    this.authToken = null;
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

  getToken(): string {
    return this.authToken;
  }

}
