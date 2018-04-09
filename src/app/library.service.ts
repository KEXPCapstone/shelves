import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Release } from './release';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LibraryService {

  private libraryUrl = 'api/library'; // replace with URL to web api

  constructor(private http: HttpClient) { }

  /** GET release by id. Will 404 if id not found */
  getReleaseById(id: string): Observable<Release> {
    console.log('id: ' + id);
    const url = `${this.libraryUrl}/${id}`;
    return this.http.get<Release>(url).pipe(
      tap(_ => this.log(`fetched release id=${id}`)),
      catchError(this.handleError<Release>(`getRelease id=${id}`))
    );
  }

  // GET Releases matching the supplied KEXP category
  getReleasesByCategory(category: string): Observable<Release[]> {
    const url = `${this.libraryUrl}/releases/categories/${category}`;
    return this.http.get<Release[]>(url).pipe(
        tap(releases => this.log(`fetched releases`)),
        catchError(this.handleError('getReleases', []))
      );
  }

  // fetch releases related to a given release by some criteria
  getRelatedReleases(releaseId: number, matchCriteria: string): Observable<Release[]> {
    return null;
  }

  private log(message: string) {
    // TODO: better logging, don't log to console
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
