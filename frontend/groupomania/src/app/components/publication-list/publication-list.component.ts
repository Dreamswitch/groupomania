
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Publication } from '../../models/publication.model';
import { PublicationService } from '../../services/publication.service';
import { take } from 'rxjs/operators';
import { CommentService } from '../../services/comment.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { PublicationFormComponent } from '../publication-form/publication-form.component';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  constructor(
    private publicationService: PublicationService,
    private commentService: CommentService,
    public userService: UserService,
    public dialog: MatDialog,

  ) { }
  publicationSub: Subscription;
  publications: Publication[];
  loading: boolean;
  errorMsg: string;
  currentPublication: number; // index de la publication courrante
  currentComment: number; // index du commentaire courrant
  commentDisplay = false;
  modifyCommentDisplay = false;

  ngOnInit(): void {
    this.loading = true;
    this.commentDisplay = false;
    this.publicationSub = this.publicationService.publications$.subscribe(
      (publications) => {
        console.log('publications');
        this.publications = publications;
        this.loading = false;
        this.errorMsg = null;
      },
      (error) => {
        console.log(error);
        this.errorMsg = JSON.stringify(error);
        this.loading = false;
      }
    );
    this.publicationService.getPublications();
  }


  onDeletePublication(publication): void {
    const publicationId = {
      idpublication: publication.idpublications
    };
    this.publicationService.deletePublication(publicationId)
      .pipe(take(1))
      .subscribe(
        response => {
          this.publicationService.getPublications();
          console.log(response);
        }
      );
  }

  commentDisplayOff(state: boolean): void { // child to parent
    this.commentDisplay ? this.commentDisplay = state : this.modifyCommentDisplay = state;
  }

  onModifyComment(commentIndex: number, publicationIndex: number): void {
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

  openDialogCreatePublication(file): void {
    const dialogRef = !file ?
      this.dialog.open(PublicationFormComponent)
      :
      this.dialog.open(PublicationFormComponent, {
        data: {
          media: file,
          preLoadMedia: true
        }
      })
      ;

    dialogRef.afterClosed().subscribe(formData => {

      if (!formData) {
        return 'canceled subscription';
      }
      this.publicationService.postPublication(formData)
        .subscribe(() => {
          this.publicationService.getPublications();
        });
    });

  }
  openDialogModify(currentPublication): void {
    const dialogRef = this.dialog.open(PublicationFormComponent, { data: currentPublication });
    dialogRef.afterClosed().subscribe(formData => {
      if (!formData) {
        return 'canceled subscription';
      }
      this.publicationService.updatePublication(formData)
        .subscribe(() => {
          this.loading = false;
          this.publicationService.getPublications();
        });
    });
  }
  preLoadMedia(event): any {
    const file = (event.target as HTMLInputElement).files[0];
    this.openDialogCreatePublication(file);
  }
}
