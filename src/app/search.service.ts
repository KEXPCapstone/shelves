import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ReleaseSearchResult } from './release';
import { environment } from '../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) { }

  getSearchResults(query: string, limit: number): Observable<ReleaseSearchResult[]> {
    const url = `${environment.apiUrl}/library/releases/search`;
    const options = {
      params: new HttpParams()
      .append('q', query)
      .append('limit', limit.toString())
    };
    return this.http.get<ReleaseSearchResult[]>(url, options).pipe(
      tap(releases => console.log(`fetched search results`)),
      catchError(this.handleError('getSearchResults', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
