import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';

@Component({
  selector: 'app-publication-form',
  templateUrl: './publication-form.component.html',
  styleUrls: ['./publication-form.component.scss']
})
export class PublicationFormComponent implements OnInit {

  publicationForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  mode: string;
  publication: Publication;
  imagePreview: string;
  @Input() currentPublication: any;
  @Output() currentPublicationIndex = new EventEmitter<number>();

  constructor(
    private formBuilder: FormBuilder,
    private publicationService: PublicationService
  ) { }

  ngOnInit(): void {
    if (this.currentPublication) {
      this.publicationForm = this.formBuilder.group({
        title: [this.currentPublication.title, Validators.required],
        body: [this.currentPublication.body, Validators.required],
        media: [this.currentPublication.media, Validators.required],
      });
      this.imagePreview = this.currentPublication.media;
    } else {
      this.publicationForm = this.formBuilder.group({
        title: ['', Validators.required],
        body: ['', Validators.required],
        media: ['', Validators.required],
      });
    }
  }



  onSubmit(): void {
    this.loading = true;
    const publication = {
      title: this.publicationForm.get('title').value,
      body: this.publicationForm.get('body').value
    };
    const formData = new FormData();
    formData.append('image', this.publicationForm.get('media').value);
    formData.append('publication', JSON.stringify(publication));
    this.publicationService.postPublication(formData)
      .subscribe(() => {
        this.publicationForm.reset();
        this.imagePreview = null;
        this.loading = false;
        this.publicationService.getPublications();
      });
  }

  onModify(event): void {
    event.preventDefault();
    const publication = {
      title: this.publicationForm.get('title').value,
      body: this.publicationForm.get('body').value
    };
    const formData = new FormData();
    formData.append('image', this.publicationForm.get('media').value);
    formData.append('publication', JSON.stringify(publication));
    formData.append('idpublication', this.currentPublication.idpublications
    );
    console.log(this.currentPublication.idPublications);
    this.publicationService.updatePublication(formData)
      .subscribe(() => {
        this.publicationForm.reset();
        this.imagePreview = null;
        this.loading = false;
        this.currentPublicationIndex.emit(null);
        this.publicationService.getPublications();
      });
  }

  onFileAdded(event): void {
    event.preventDefault();
    console.log('ajout');
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
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
    this.currentPublicationIndex.emit(null);
  }
}
