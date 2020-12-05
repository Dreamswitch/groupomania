
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../publication.service';
import { UserService } from '../../user-view/user.service';
import { User } from '../../models/user.model';
import { first, take } from 'rxjs/operators';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  publicationSub: Subscription;
  publications: Publication[];
  loading: boolean;
  errorMsg: string;
  userId: string;
  currentIndex: number;

  modify : boolean = false;

  constructor(private publication: PublicationService,
              private router: Router, private user : UserService) { }

  ngOnInit() {
    this.userId = this.user.getUserId();
    this.loading = true;
    this.publicationSub = this.publication.publications$.subscribe(
      (publications) => {
        this.publications = publications;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.publication.getPublications();
  }


  onDelete(publication){
    console.log(publication.idpublications)
    let publicationId = {
      "idpublication" : publication.idpublications
    }
    this.publication.deletePublication(publicationId)
    .pipe(take(1))
    .subscribe(
      response => {
        console.log('lol')
      this.publication.getPublications()
      console.log(response)}
    )
  }

  onModify(index){
    this.currentIndex = index;
    this.modify = true ;
  }

  dataBack(event){ // response from child element after update
    this.currentIndex = event;
  }

}