import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;
  errorMsg: string;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent);

    dialogRef.afterClosed().subscribe(formValue => {
      if (!formValue) {
        return 'canceled subscription';
      }
      this.userService.createUser(formValue)
        .pipe(take(1))
        .subscribe(
          data => {
            console.log(data);
            this.userService.loginUser(formValue.email, formValue.password)
              .pipe(take(1))
              .subscribe(
                (logs: any) => {
                  this.userService.authToken = logs.token;
                  this.loading = false;
                  console.log('communication avec le serveur reussi');
                  this.userService.isAuth$.next(true);
                },
                (error: any) => {
                  console.log('registration error' + error);
                  this.loading = false;
                }
              );
          },
          (error: any) => {
            console.log('registration error' + error);
            this.loading = false;
          }
        );
    });

  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getErrorMessage(): string {
    if (this.loginForm.get('email').hasError('required')) { } {
      return 'You must enter a value';
    }

    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  onLogin(): void {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.userService.loginUser(email, password)
      .pipe(take(1))
      .subscribe(
        (log: any) => {
          this.userService.authToken = log.token;
          this.loading = false;
          console.log('communication avec le serveur reussi');
          this.userService.isAuth$.next(true);
          this.router.navigate(['/publications']);
        },
        (error) => {
          this.loading = false;
          this.errorMsg = error.message;
          console.log(this.errorMsg);
        }

      );
    /*     .then(
          () => {
            this.loading = false;
            this.router.navigate(['/publications']);
          }
        ).catch(
          (error) => {
            this.loading = false;
            this.errorMsg = error.message;
          }
        ); */
  }
}
