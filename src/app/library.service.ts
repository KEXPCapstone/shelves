import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Release } from './models/release';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LibraryService {

  constructor(private http: HttpClient) { }

  /** GET release by id. Will 404 if id not found */
  getReleaseById(id: string): Observable<Release> {
    const url = `${environment.apiUrl}/library/releases/${id}`;
    return this.http.get<Release>(url).pipe(
      tap(_ => this.log(`fetched release id=${id}`)),
      catchError(this.handleError<Release>(`getRelease id=${id}`))
    );
  }

  // Get a single artist summary from it's 'id'
  getArtistById(id: string): Observable<any> {
    const url = `${environment.apiUrl}/library/artists/${id}`;
    console.log(`called getArtistById with: ${id}`);
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getArtist id=${id}`))
    );
  }

  // Get a list of artists with name 'greater than' start
  // limit specifies maximum # of artists to return
  getArtists(start: string, limit: number): Observable<any[]> {
    const url = `${environment.apiUrl}/library/artists`;
    const options = {
      params: new HttpParams()
      .append('last_id', start)
      .append('limit', limit.toString())
    };
    return this.http.get<any[]>(url, options).pipe(
      catchError(this.handleError('getArtists', []))
    );
  }


  // Get a single label summary from it's 'id'
  getLabelById(id: string): Observable<any> {
    const url = `${environment.apiUrl}/library/labels/${id}`;
    console.log(`called getLabelById with: ${id}`);
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getLabel id=${id}`))
    );
  }

  // Get a list of labels with name 'greater than' start
  // limit specifies maximum # of labels to return
  getLabels(start: string, limit: number): Observable<any[]> {
    const url = `${environment.apiUrl}/library/labels`;
    const options = {
      params: new HttpParams()
      .append('last_id', start)
      .append('limit', limit.toString())
    };
    return this.http.get<any[]>(url, options).pipe(
      catchError(this.handleError('getLabels', []))
    );
  }

  // fetch releases matching a given field value
  getRelatedReleases(field: string, value: string): Observable<Release[]> {
    const url = `${environment.apiUrl}/library/releases/related`;
    const options = {
      params: new HttpParams()
      .append('field', field)
      .append('value', value)
    };
    console.log(url);
    return this.http.get<Release[]>(url, options).pipe(
      tap(releases => this.log(`fetched related releases`)),
      catchError(this.handleError('getRelatedReleases', []))
    );
  }

  private log(message: string) {
    // TODO: better logging, don't log to console
    console.log(message);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
