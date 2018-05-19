import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable ,  of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { Shelf, NewShelf } from './models/shelf';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const textHttpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text',
  observe: 'response'
};

@Injectable()
export class ShelfService {

  constructor(private http: HttpClient) { }

  // GET shelves from the server
  getShelves (): Observable<Shelf[]> {
    const url = `${environment.apiUrl}/shelves`;
    return this.http.get<Shelf[]>(url)
      .pipe(
        tap(shelves => this.log(`fetched shelves`)),
        catchError(this.handleError('getShelves', []))
      );
  }

  // GET the current users's shelves.
  getMyShelves(): Observable<Shelf[]> {
    const url = `${environment.apiUrl}/shelves/mine`;
    return this.http.get<Shelf[]>(url)
      .pipe(
        tap((shelves) => {
          console.log('Fetched current users shelves');
        })
      );
  }

  getFeaturedShelves(): Observable<Shelf[]> {
    const url = `${environment.apiUrl}/shelves/featured`;
    return this.http.get<Shelf[]>(url)
      .pipe(
        tap((shelves) => {
          console.log('fetched featured shelves');
        })
      );
  }

  /** GET shelf by id. Will 404 if id not found */
  getShelf(id: string): Observable<Shelf> {
    const url = `${environment.apiUrl}/shelves/${id}`;
    return this.http.get<Shelf>(url).pipe(
      tap(_ => this.log(`fetched shelf id=${id}`)),
      catchError(this.handleError<Shelf>(`getShelf id=${id}`))
    );
  }

  // GET a specified user's shelves
  getUserShelves(userId: string): Observable<Shelf[]> {
    const url = `${environment.apiUrl}/shelves/users/${userId}`;
    return this.http.get<Shelf[]>(url).pipe(
      tap(shelves => this.log(`fetched user's shelves`)),
      catchError(this.handleError('getUserShelves', []))
    );
  }

  // Put: update a shelf
  // api/shelves/{id}
  updateShelf(shelf: Shelf) {
    const url = `${environment.apiUrl}/shelves/${shelf.id}`;
    return this.http.put(url, shelf, {headers: new HttpHeaders({ 'Content-Type': 'application/json' }), responseType: 'text'}).pipe(
      tap(_ => this.log(`updated shelf id=${shelf.id}`))
      // ,catchError(this.handleError<any>('updateShelf')) // commented out so the subscriber can receive and process the error
    );
  }

  // Post: add a new shelf to the server
  // api/shelves
  addShelf(newShelf: NewShelf): Observable<Shelf> {
    const url = `${environment.apiUrl}/shelves`;
    return this.http.post<Shelf>(url, newShelf, httpOptions).pipe(
      tap((returnedShelf: Shelf) => this.log(`added shelf w/ id=${returnedShelf.id}`))
      // , catchError(this.handleError<Shelf>('addShelf')) // commented out so the subscriber can receive and process the error
    );
  }

  // Delete: delete a shelf
  // api/shelves/{id}
  deleteShelf(shelf: Shelf | string): Observable<Shelf> {
    const id = typeof shelf === 'string' ? shelf : shelf.id;
    const url = `${environment.apiUrl}/shelves/${id}`;

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
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
