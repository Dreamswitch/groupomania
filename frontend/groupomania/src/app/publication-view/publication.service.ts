import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Publication } from '../models/publication.model';
import { Observable, Subject } from 'rxjs';
import { HandleError, HttpErrorHandler } from '../services/http-error-handler.service';






@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  publications$ = new Subject<Publication[]>();
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    public httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('PublicationService');
  }

  /** GET Publications from the server */
  /*   getPublications(): Observable<Publication[]> {
      return this.http.get<Publication[]>('http://localhost:3000/api/publications')
        .pipe(
          tap(_ => console.log('fetched heroes')),
        );
    } */

  getPublications(): void {
    this.http.get('http://localhost:3000/api/publications').subscribe(
      (publications: Publication[]) => {
        this.publications$.next(publications);
      },
      (error) => {
        this.publications$.next([]);
        console.error(error);
      }
    );
  }


  updatePublication(publication): Observable<Publication> {
    return this.http.put<Publication>('http://localhost:3000/api/publications', publication)
      .pipe(
        catchError(this.handleError('addPublication', publication))
      );
  }


  postPublication(publication): Observable<Publication> {
    return this.http.post<Publication>('http://localhost:3000/api/publications', publication)
      .pipe(
        catchError(this.handleError('addPublication', publication))
      );
  }

  deletePublication(idPublication: object): Observable<object> {
    return this.http.request('DELETE', 'http://localhost:3000/api/publications', { body: idPublication })
      .pipe(
        catchError(this.handleError('addPublication', idPublication))
      );
  }


}
