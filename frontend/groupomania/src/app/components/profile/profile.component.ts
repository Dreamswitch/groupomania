import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  publicationForm: FormGroup;
  currentUser: object;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.currentUser$ = this.userService.getUser();
    this.currentUser = this.userService.currentUser$;
    this.publicationForm = this.formBuilder.group({
      media: ['', Validators.required],
    });
    this.loading = false;
  }


  onFileAdded(event): void {
    event.preventDefault();
    const file = (event.target as HTMLInputElement).files[0];
    this.publicationForm.get('media').setValue(file);
    this.publicationForm.updateValueAndValidity();

    const description = {
      description: 'modified',
    };
    const formData = new FormData();
    formData.append('image', this.publicationForm.get('media').value);
    formData.append('description', JSON.stringify(description));
    this.userService.updateUser(formData)
      .subscribe(() => {
        this.publicationForm.reset();
        this.userService.currentUser$ = this.userService.getUser();
      });

  }
}
