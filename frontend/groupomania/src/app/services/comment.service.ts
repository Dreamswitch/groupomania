import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../services/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    public httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('CommentService');
  }

  updateComment(comment): Observable<Comment> {
    return this.http.put<Comment>('http://localhost:3000/api/publications/comment', comment)
      .pipe(
        catchError(this.handleError('addPublication', comment))
      );
  }

  postComment(comment): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:3000/api/publications/comment', comment)
      .pipe(
        catchError(this.handleError('addPublication', comment))
      );
  }

  deleteComment(idComment: object): Observable<object> {
    return this.http.request('DELETE', 'http://localhost:3000/api/publications/comment', { body: idComment })
      .pipe(
        catchError(this.handleError('addPublication', idComment))
      );
  }
}
