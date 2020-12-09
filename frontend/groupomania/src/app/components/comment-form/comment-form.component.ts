import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { PublicationService } from '../../services/publication.service';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  commentForm: FormGroup;
  loading: boolean;
  errorMsg: string;
  mode: string;
  comment: Comment;
  imagePreview: string;
  @Input() currentPublication: any;
  @Input() currentComment: any;
  @Output() commentDisplayOff = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private publicationService: PublicationService
  ) { }

  ngOnInit(): void {
    if (this.currentComment) {
      console.log('modify comment');
      this.commentForm = this.formBuilder.group({
        body: [this.currentComment.body, Validators.required],
        media: [this.currentComment.media],
      });
      this.imagePreview = this.currentComment.media;
    } else {
      console.log('create comment');
      this.commentForm = this.formBuilder.group({
        body: ['', Validators.required],
        media: [''],
      });
    }
  }


  onSubmit(): void {
    const comment = {
      body: this.commentForm.get('body').value
    };
    const formData = new FormData();
    formData.append('image', this.commentForm.get('media').value);
    formData.append('comment', JSON.stringify(comment));

    if (this.currentComment) {
      console.log(this.currentComment.idcomments);
      formData.append('idcomment', this.currentComment.idcomments);
      this.commentService.updateComment(formData)
        .subscribe(() => {
          this.commentForm.reset();
          this.imagePreview = null;
          this.commentDisplayOff.emit(false);
          this.publicationService.getPublications();
        });
    } else {
      formData.append('id_publication', this.currentPublication.idpublications);
      this.commentService.postComment(formData)
        .subscribe(() => {
          this.commentForm.reset();
          this.imagePreview = null;
          this.loading = false;
          this.commentDisplayOff.emit(false);
          this.publicationService.getPublications();
        });
    }
  }
  /*
    onModifyComment(event): void {
      event.preventDefault();
      const comment = {
        body: this.commentForm.get('body').value
      };
      const formData = new FormData();
      formData.append('image', this.commentForm.get('media').value);
      formData.append('comment', JSON.stringify(comment));
      formData.append('idpublication', this.currentPublication.idpublications);
      console.log(this.currentPublication.idPublications);
      this.commentService.updateComment(formData)
        .subscribe(() => {
          this.commentForm.reset();
          this.imagePreview = null;
          this.loading = false;
          this.commentDisplayOff.emit(false);
          this.publicationService.getPublications();
        });
    } */

  onFileAdded(event): void {
    event.preventDefault();
    console.log('ajout');
    const file = (event.target as HTMLInputElement).files[0];
    console.log(file);
    this.commentForm.get('media').setValue(file);
    this.commentForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log(this.commentForm.get('media').value);
  }

  /*   onModifyCanceled(event): void {
      event.preventDefault();
      this.commentDisplayOff.emit(false);
    } */

  onCancelComment(event): void {
    event.preventDefault();
    this.commentDisplayOff.emit(false);
  }
}

