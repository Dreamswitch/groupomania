import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserDeleteComponent } from '../profile-user-delete/profile-user-delete.component';
import { UserDescriptionFormComponent } from '../profile-user-description-form/profile-user-description-form.component';

@Component({
  selector: 'app-navbar-profile',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.scss']
})
export class NavbarProfileComponent {

  constructor(
    public dialog: MatDialog,
    private userService: UserService
  ) { }



  onDeleteUser(): void {
    const dialogRef = this.dialog.open(UserDeleteComponent);

    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        return 'canceled subscription';
      }
      this.userService.deleteUser()
        .subscribe(() => {
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
