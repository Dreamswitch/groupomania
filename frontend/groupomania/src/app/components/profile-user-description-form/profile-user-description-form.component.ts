import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserDescription } from 'src/app/models/userDescription.model';

@Component({
  selector: 'app-user-description-form',
  templateUrl: './profile-user-description-form.component.html',
  styleUrls: ['./profile-user-description-form.component.scss']
})
export class UserDescriptionFormComponent implements OnInit {

  userDescriptionForm: FormGroup;
  errorMsg: string;
  userDescription: UserDescription;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.userDescriptionForm = this.formBuilder.group({
        description: [this.data.body, Validators.required],
      });

    } else {
      this.userDescriptionForm = this.formBuilder.group({
        description: ['', Validators.required],
      });
    }
  }


  onModify(): FormData {
    const description = {
      description: this.userDescriptionForm.get('description').value
    };
    const formData = new FormData();
    formData.append('description', JSON.stringify(description));

    return formData;
  }


}
