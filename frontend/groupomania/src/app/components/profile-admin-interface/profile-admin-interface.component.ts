import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-admin',
  templateUrl: './profile-admin-interface.component.html',
  styleUrls: ['./profile-admin-interface.component.scss']
})
export class ArticleAdminComponent {

  constructor(public userService: UserService) { }
}
