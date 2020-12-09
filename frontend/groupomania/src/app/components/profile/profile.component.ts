import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser$: Observable<any>;
  publicationForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.getUser().pipe(share());
    this.publicationForm = this.formBuilder.group({
      media: ['', Validators.required],
    });
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
        this.userService.getUser();
      });

  }
}
