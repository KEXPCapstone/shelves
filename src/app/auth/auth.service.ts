import { Injectable } from '@angular/core';
import { User, Credentials } from '../user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const fullHttpOptions = {
    observe: 'response',
}


@Injectable()
export class AuthService {

    constructor(private http: HttpClient) { }

    public getToken(): string {
        return localStorage.getItem('authToken');
    }

    public setToken(token : string){
        localStorage.setItem('authToken', token)
    }

    public isAuthenticated() : boolean {
        return localStorage.getItem('authToken') != null;
    }

    // Returns the entire HTTP Response. Component must then be responsible for
    // setting localStorage's token key via AuthService.setToken().  JSON response 
    // body is accessible via resp.body
    // See: https://angular.io/guide/http

    // this.log(`logged in user`)
    public login(email: string, password: string): Observable<HttpResponse<User>> {
        let creds : Credentials = {email: email, password: password}
        const url = `${environment.apiUrl}/sessions`
        console.log(url)
        return this.http.post<HttpResponse<User>>(url, creds, {observe: 'response'}).pipe(
            tap(resp => this.setToken(resp.headers.get('Authorization'))),
            catchError(this.handleError)
        );
    }

    private log(message: string) {
        // TODO: log these somwhere more useful than the console
        console.log(message);
    }

    // private handleError<T> (operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {
    //       // TODO: send the error to remote logging infrastructure
    //       console.error(error); // log to console instead
    
    //       // TODO: better job of transforming error for user consumption
    //       this.log(`${operation} failed: ${error.message}`);
    
    //       // let the app keep running by returning an empty result
    //       return of(result as T);
    //     };
    //   }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
        //   console.error(
        //     `Backend returned code ${error.status}, ` +
        //     `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(error)
            // `Backend returned code ${error.status}, ` +
            // `body was: ${error.error}`);
      };
}