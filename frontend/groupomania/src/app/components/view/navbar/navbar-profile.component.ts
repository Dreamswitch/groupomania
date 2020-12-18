import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserDeleteComponent } from '../../user-delete/user-delete.component';
import { UserDescriptionFormComponent } from '../../user-description-form/user-description-form.component';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './navbar-profile.component.html',
  styleUrls: ['./navbar-profile.component.scss']
})
export class NavbarProfileComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private userService: UserService

  ) { }

  ngOnInit(): void {
  }


  onDeleteUser(): void {
    const dialogRef = this.dialog.open(UserDeleteComponent);

    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        return 'canceled subscription';
      }
      this.userService.deleteUser()
        .subscribe(() => {
          console.log('user deleted');
          this.userService.logout();
        });

    });

  }

  openDialogModify(): void {
    const dialogRef = this.dialog.open(UserDescriptionFormComponent);

    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        return 'canceled subscription';
      }
      this.userService.updateUser(formData)
        .subscribe(() => {
          this.userService.currentUser$ = this.userService.getUser();
        });

    });
  }
}
