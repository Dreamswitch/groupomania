import { Component, Input } from '@angular/core';
import { LikeService } from 'src/app/services/like.service';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-like',
  templateUrl: './publication-like.component.html',
  styleUrls: ['./publication-like.component.scss']
})
export class LikeComponent {
  @Input() publication: any;

  constructor(
    private publicationService: PublicationService,
    private likeService: LikeService
  ) { }

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
        this.publicationService.getPublications();
      });
  }
}
