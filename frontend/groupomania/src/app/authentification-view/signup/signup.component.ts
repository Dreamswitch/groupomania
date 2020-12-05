import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user-view/user.service';
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
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', Validators.required);
  firstname = new FormControl('', Validators.required);
  lastname = new FormControl('', Validators.required);



  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSignup() {
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
                console.log('communication avec le serveur reussi')
                this.userService.isAuth$.next(true);
                this.router.navigate(['/publications']);
              },
              error => {
                console.log('registration error')
                this.loading = false;
                this.router.navigate(['/login']);
              }
            )
        },
        error => {
          console.log('registration error')
          this.loading = false;
          this.router.navigate(['/login']);
        }
      );
    /*       .subscribe(
            (response: { token: string, userId : string }) => {
              this.userId = response.userId;
              this.authToken = response.token;
              console.log(this.authToken)
              console.log('communication avec le serveur reussi')
              this.isAuth$.next(true);
            },
          ); */
    /* .then(
          (response: { message: string }) => {
            console.log(response.message);
            this.userService.loginUser(newUser.email, newUser.password).then(
              () => {
                this.loading = false;
                this.router.navigate(['/publications']);
              }
            ).catch(
              (error) => {
                this.loading = false;
                console.error(error);
                this.errorMsg = error.message;
              }
            );
          }
        ).catch((error) => {
            this.loading = false;
            console.error(error);
            this.errorMsg = error.message;
        }); */

  }

}
