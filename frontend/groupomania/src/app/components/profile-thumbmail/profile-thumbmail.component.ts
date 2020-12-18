import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-thumbmail-profile',
  templateUrl: './profile-thumbmail.component.html',
  styleUrls: ['./profile-thumbmail.component.scss']
})
export class ThumbmailProfileComponent implements OnInit {

  thumbmailForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.thumbmailForm = this.formBuilder.group({
      image: ['', Validators.required],
    });
  }


  onUploadThumbmail(event): void {
    event.preventDefault();
    const file = (event.target as HTMLInputElement).files[0];
    this.thumbmailForm.get('image').setValue(file);
    this.thumbmailForm.updateValueAndValidity();
    const formData = new FormData();
    formData.append('image', this.thumbmailForm.get('image').value);
    this.userService.updateUser(formData)
      .subscribe(() => {
        this.thumbmailForm.reset();
        this.userService.currentUser$ = this.userService.getUser();
      });
  }
}
