import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user-view/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  userSubscription: Subscription;

  constructor(private user: UserService) { }

  ngOnInit(): void {
    this.userSubscription = this.user.isAuth$.subscribe(
      (user) => {
        this.isAuth = user;
      }
    );
  }

  onLogout(): void {
    this.user.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
