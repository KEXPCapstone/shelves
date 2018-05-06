import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';


import { Shelf, NewShelf } from './shelf';
import { environment } from '../environments/environment';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ShelfService {

  private shelvesUrl = 'api/shelves'; // URL to web api

  constructor(private http: HttpClient) { }

  // GET shelves from the server
  getShelves (): Observable<Shelf[]> {
    return this.http.get<Shelf[]>(this.shelvesUrl)
      .pipe(
        tap(shelves => this.log(`fetched shelves`)),
        catchError(this.handleError('getShelves', []))
      );
  }

  // GET the current users's shelves. Returns entire HTTP response
  getMyShelves(): Observable<HttpResponse<Shelf[]>> {
    const url = `${environment.apiUrl}/shelves/mine`;
    return this.http.get<HttpResponse<Shelf[]>>(url)
      .pipe(
        tap((shelves) => {
          console.log('Fetched current users shelves');
        })
      );
  }

  /** GET shelf by id. Will 404 if id not found */
  getShelf(id: number): Observable<Shelf> {
    const url = `${this.shelvesUrl}/${id}`;
    return this.http.get<Shelf>(url).pipe(
      tap(_ => this.log(`fetched shelf id=${id}`)),
      catchError(this.handleError<Shelf>(`getShelf id=${id}`))
    );
  }

  // Put: update a shelf
  // api/shelves/{id}
  updateShelf(shelf: Shelf): Observable<any> {
    return this.http.put(this.shelvesUrl, shelf, httpOptions).pipe(
      tap(_ => this.log(`updated shelf id=${shelf.id}`)),
      catchError(this.handleError<any>('updateShelf'))
    );
  }

  // Post: add a new shelf to the server
  // api/shelves
  addShelf(newShelf: NewShelf): Observable<Shelf> {
    const url = `${environment.apiUrl}/shelves`;
    return this.http.post<Shelf>(url, newShelf, httpOptions).pipe(
      tap((returnedShelf: Shelf) => this.log(`added shelf w/ id=${returnedShelf.id}`)),
      catchError(this.handleError<Shelf>('addShelf'))
    );
  }

  // Delete: delete a shelf
  // api/shelves/{id}
  deleteShelf(shelf: Shelf | number): Observable<Shelf> {
    const id = typeof shelf === 'number' ? shelf : shelf.id;
    const url = `${this.shelvesUrl}/$id`;

    return this.http.delete<Shelf>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted shelf id=${id}`)),
      catchError(this.handleError<Shelf>('deleteShelf'))
    );
  }

  private log(message: string) {
    // TODO: log these somwhere more useful than the console
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
