import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../../user-view/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onLogin(): void {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.userService.loginUser(email, password)
      .pipe(first())
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
