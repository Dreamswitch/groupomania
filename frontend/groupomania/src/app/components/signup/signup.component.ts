import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  onSignup(): any {
    const formValue = this.signupForm.value;
    return formValue;
  }

}
