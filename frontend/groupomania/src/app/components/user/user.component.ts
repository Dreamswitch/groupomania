import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  currentUser$: Observable<any>;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.getUser().pipe(share());
  }

}
