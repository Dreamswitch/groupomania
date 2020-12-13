import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from 'src/app/services/like.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() publication: any;

  constructor(
    private publicationService: PublicationService,
    private likeService: LikeService
  ) { }


  ngOnInit(): void {
  }


  onPublicationLike(idPublication: number): void {

    const publicationLike = {
      idpublication: idPublication,
      like: 1
    };
    if (this.publication.likeValue) {
      publicationLike.like = 0;
    }
    this.likeService.postLikePublication(publicationLike)
      .subscribe(() => {
        console.log('Like');
        this.publicationService.getPublications();
      });
  }

  onPublicationDislike(idPublication: number): void {
    const publicationLike = {
      idpublication: idPublication,
      like: -1
    };
    if (this.publication.likeValue) {
      publicationLike.like = 0;
    }
    this.likeService.postLikePublication(publicationLike)
      .subscribe(() => {
        console.log('Dislike');
        this.publicationService.getPublications();
      });
  }
}
