import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from 'src/app/services/publication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-article-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ArticleAboutComponent implements OnInit {

  descriptionForm: FormGroup;
  publications: Publication[];
  publicationSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    public userService: UserService,
    private publicationService: PublicationService
  ) { }

  ngOnInit(): void {

    this.descriptionForm = this.formBuilder.group({
      image: ['', Validators.required],
    });

    this.publicationSub = this.publicationService.publications$/* .pipe(
      filter(publication => publication.isOwner)
    ) */.subscribe(
      (response) => {
        this.publications = response.filter(publication => publication.isOwner);
      }
    );

    this.publicationService.getPublications();
  }



}
