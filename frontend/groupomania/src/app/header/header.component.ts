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

  ngOnInit() {
    this.userSubscription = this.user.isAuth$.subscribe(
      (user) => {
        this.isAuth = user;
      }
    );
  }

  onLogout() {
    this.user.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
