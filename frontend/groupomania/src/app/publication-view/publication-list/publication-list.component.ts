
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../publication.service';
import { take } from 'rxjs/operators';
import { CommentService } from '../comment.service';

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
  currentPublicationIndex: number;
  currentPublication: number; // index de la publication courrante
  currentComment: number; // index du commentaire courrant
  commentDisplay = false;
  modifyCommentDisplay = false;

  modify = false;

  constructor(
    private publicationService: PublicationService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.commentDisplay = false;
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


  onDeletePublication(publication): void {
    console.log(publication.idpublications);
    const publicationId = {
      idpublication: publication.idpublications
    };
    this.publicationService.deletePublication(publicationId)
      .pipe(take(1))
      .subscribe(
        response => {
          console.log('lol');
          this.publicationService.getPublications();
          console.log(response);
        }
      );
  }

  onModifyPublication(index: number): void {
    this.currentPublicationIndex = index;
    this.modify = true;
  }

  dataBack(event: number): void { // response from child to parent element after update
    this.currentPublicationIndex = event;
  }

  commentDisplayOff(state: boolean): void { // child to parent
    this.commentDisplay ? this.commentDisplay = state : this.modifyCommentDisplay = state;
  }

  displayCommentForm(index: number): void {
    this.commentDisplay = true;
    this.modifyCommentDisplay = false;
    this.currentPublication = index;
  }


  onModifyComment(commentIndex: number, publicationIndex: number): void {
    console.log('modify comment');
    this.currentComment = commentIndex;
    this.currentPublication = publicationIndex;
    this.modifyCommentDisplay = true;
    this.commentDisplay = false;
  }

  onDeleteComment(comment: any): void {
    const commentId = {
      idcomment: comment.idcomments
    };
    this.commentService.deleteComment(commentId)
      .pipe(take(1))
      .subscribe(
        (response) => {
          this.publicationService.getPublications();
          console.log(response);
        }
      );
  }
}
