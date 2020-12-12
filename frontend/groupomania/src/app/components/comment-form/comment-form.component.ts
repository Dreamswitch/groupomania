import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
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
  placeHolder = true;
  @Input() currentPublication: any;
  @Input() currentComment: any;
  @Output() commentDisplayOff = new EventEmitter<boolean>();
  preloadData: string;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private publicationService: PublicationService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.currentComment) {
      console.log('modify comment');
      this.commentForm = this.formBuilder.group({
        body: [this.currentComment.body, Validators.required],
        media: [this.currentComment.media],
      });
      this.preloadData = this.currentComment.body;
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

  onModifyCanceled(event): void {
    event.preventDefault();
    this.commentDisplayOff.emit(false);
  }

  onContentChange(content): void {
    this.placeHolder = false;
    this.commentForm.get('body').setValue(content);
    this.commentForm.updateValueAndValidity();
  }

}

