import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user-view/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private user: UserService,
    private router: Router) { }

/*   canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.user.isAuth$.subscribe(
          (user) => {
            if (user) {
              observer.next(true);
            } else {
              this.router.navigate(['/login']);
            }
          }
        );
      }
    );
  } */

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
    if (this.user.isAuth$.value) {
      return true;
    }
    else {
      return this.router.parseUrl("/login");
    }
  }

}