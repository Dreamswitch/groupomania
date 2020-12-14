import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Publication } from '../../models/publication.model';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

  publicationForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  publication: Publication;
  imagePreview: string;
  @Output() currentPublicationIndex = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.publicationForm = this.formBuilder.group({
        title: [this.data.title, Validators.required],
        body: [this.data.body, Validators.required],
        media: [this.data.media, Validators.required],
      });
      if (this.data.preLoadMedia) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(this.data.media);
      } else {
        this.imagePreview = this.data.media;
      }

    } else {
      this.publicationForm = this.formBuilder.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        media: ['', Validators.required],
      });
    }
  }



  onSubmit(): FormData {
    const publication = {
      title: this.publicationForm.get('title').value,
      body: this.publicationForm.get('body').value
    };
    const formData = new FormData();
    formData.append('image', this.publicationForm.get('media').value);
    formData.append('publication', JSON.stringify(publication));
    return formData;
  }

  onModify(): FormData {
    const publication = {
      title: this.publicationForm.get('title').value,
      body: this.publicationForm.get('body').value
    };
    const formData = new FormData();
    formData.append('image', this.publicationForm.get('media').value);
    formData.append('publication', JSON.stringify(publication));
    formData.append('idpublication', this.data.idpublications
    );
    return formData;
  }

  onFileAdded(event): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.publicationForm.get('media').setValue(file);
    this.publicationForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onModifyCanceled(event): void {
    event.preventDefault();
    this.data.currentPublicationIndex.emit(null);
  }
}
