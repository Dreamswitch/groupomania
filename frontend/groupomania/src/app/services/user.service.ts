import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { share } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  /* authToken: string; */
  currentUser$: Observable<object>;

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
    /* this.authToken = null; */
    sessionStorage.clear();
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

  /*   getToken(): string {
      return this.authToken;
    } */


  getUser(): Observable<object> {
    return this.http.get('http://localhost:3000/api/auth/profil').pipe(share());
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/api/auth/users').pipe(share());
  }


  grantPrivileges(data: object): Observable<any> {
    return this.http.put<FormData>('http://localhost:3000/api/auth/privileges', data);
  }

  updateUser(data): Observable<any> {
    return this.http.put<FormData>('http://localhost:3000/api/auth/profil', data);
  }

  deleteUser(): Observable<object> {
    return this.http.request('DELETE', 'http://localhost:3000/api/auth/profil');
  }
}
