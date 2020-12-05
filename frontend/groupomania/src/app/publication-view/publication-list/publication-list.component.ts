
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../publication.service';
import { take } from 'rxjs/operators';

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

  constructor(private publicationService: PublicationService) { }

  ngOnInit() {
    this.loading = true;
    this.publicationSub = this.publicationService.publications$.subscribe(
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
    this.publicationService.getPublications();
  }


  onDelete(publication){
    console.log(publication.idpublications)
    let publicationId = {
      "idpublication" : publication.idpublications
    }
    this.publicationService.deletePublication(publicationId)
    .pipe(take(1))
    .subscribe(
      response => {
        console.log('lol')
      this.publicationService.getPublications()
      console.log(response)}
    )
  }

  onModify(index : number){
    this.currentIndex = index;
    this.modify = true ;
  }

  dataBack(event : number){ // response from child to parent element after update
    this.currentIndex = event;
  }

}