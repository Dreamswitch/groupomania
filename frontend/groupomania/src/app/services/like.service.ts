import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    public httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('PublicationService');
  }

  postLikePublication(publicationLike): Observable<any> {
    return this.http.post('http://localhost:3000/api/publications/like', publicationLike)
      .pipe(
        catchError(this.handleError('addPublication', publicationLike))
      );

  }
}
