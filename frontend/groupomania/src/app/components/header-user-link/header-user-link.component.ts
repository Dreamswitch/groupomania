import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './header-user-link.component.html',
  styleUrls: ['./header-user-link.component.scss']
})
export class HeaderUserLinkComponent {

  constructor(
    public userService: UserService,
  ) { }

}
