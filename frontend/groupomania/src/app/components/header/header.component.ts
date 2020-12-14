import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuth: boolean;
  userSubscription: Subscription;


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userSubscription = this.userService.isAuth$.subscribe(
      (user) => {
        this.isAuth = user;
      }
    );
  }

  onLogout(): void {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }


}
