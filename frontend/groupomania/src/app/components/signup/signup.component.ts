import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading: boolean;
  errorMsg: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  getErrorMessage(): string {
    if (this.signupForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    return this.signupForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  onSignup(): void {
    const formValue = this.signupForm.value;
    this.loading = true;

    this.userService.createUser(formValue)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.userService.loginUser(formValue.email, formValue.password)
            .pipe(first())
            .subscribe(
              (logs: any) => {
                this.userService.authToken = logs.token;
                this.loading = false;
                console.log('communication avec le serveur reussi');
                this.userService.isAuth$.next(true);
                this.router.navigate(['/publications']);
              },
              (error: any) => {
                console.log('registration error' + error);
                this.loading = false;
                this.router.navigate(['/login']);
              }
            );
        },
        (error: any) => {
          console.log('registration error' + error);
          this.loading = false;
          this.router.navigate(['/login']);
        }
      );


  }

}
