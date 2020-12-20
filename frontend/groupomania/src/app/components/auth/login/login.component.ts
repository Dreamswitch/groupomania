import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
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

  ngOnInit(): void {
    // feature if cookies in client side
    /*     console.log(this.userService.isAuth$.value);
        if (this.userService.isAuth$) {
          this.router.navigate(['/publications']);
        } */
    if (sessionStorage.connect) {
      this.userService.isAuth$.next(true);
      this.router.navigate(['/publications']);
    }
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

  /*signup dialog part*/
  onOpenDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent);
    dialogRef.afterClosed().subscribe(formValue => {
      if (!formValue) {
        return 'canceled subscription';
      }
      this.userService.createUser(formValue)
        .pipe(take(1))
        .subscribe(
          data => {
            this.userService.loginUser(formValue.email, formValue.password)
              .pipe(take(1))
              .subscribe(
                (logs: any) => {
                  /* this.userService.authToken = logs.token; */
                  sessionStorage.setItem('connect', 'true');
                  this.userService.isAuth$.next(true);
                  this.router.navigate(['/publications']);
                  this.loading = false;

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

  onLogin(): void {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.userService.loginUser(email, password)
      .pipe(take(1))
      .subscribe(
        (/* log: any */) => {
          /* this.userService.authToken = log.token; */
          sessionStorage.setItem('connect', 'true');
          this.loading = false;
          this.userService.isAuth$.next(true);
          this.router.navigate(['/publications']);
        },
        (error: any) => {
          this.loading = false;
          this.errorMsg = error.message;
          console.log(this.errorMsg);
        }
      );
  }
}
