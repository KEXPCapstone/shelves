import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { Credentials } from 'crypto';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    public getToken(): string {
        return localStorage.getItem('token');
    }

    public setToken(token : string){
        localStorage.setItem('token', token)
    }

    // Returns the entire HTTP Response. Component must then be responsible for
    // setting localStorage's token key via AuthService.setToken().  JSON response 
    // body is accessible via resp.body
    // See: https://angular.io/guide/http
    public login(creds : Credentials): Observable<HttpResponse<User>> {
        const url = `${environment.apiUrl}/sessions`
        return this.http.post<HttpResponse<User>>(url, creds, httpOptions).pipe(
            tap(_ => this.log(`logged in user`)),
            catchError(this.handleError<HttpResponse<User>>('login'))
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