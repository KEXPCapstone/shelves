import { Injectable } from '@angular/core';
import { User, Credentials } from '../user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const fullHttpOptions = {
    observe: 'response',
}


@Injectable()
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    public getToken(): string {
        return localStorage.getItem('auth-token');
    }

    public setToken(token : string){
        localStorage.setItem('auth-token', token)
    }

    public isAuthenticated() : boolean { 
        return localStorage.getItem('auth-token') != null;
    }

    public removeToken() {
        localStorage.removeItem('auth-token');
    }

    // Returns the entire HTTP Response. JSON response 
    // body is accessible via resp.body
    public login(email: string, password: string): Observable<HttpResponse<User>> {
        let creds : Credentials = {email: email, password: password}
        const url = `${environment.apiUrl}/sessions`
        console.log(url)
        return this.http.post<HttpResponse<User>>(url, creds, {observe: 'response'}).pipe(
            tap((resp) => {
                this.setToken(resp.headers.get('Authorization'))
                this.router.navigate(['/library'])
            }),
            catchError(this.handleError)
        );
    }

    public logout() {
        // will pass authorization header in http interceptor
        const url = `${environment.apiUrl}/sessions/mine`
        return this.http.delete(url, {})
        .pipe(
            tap(_ => {
                this.removeToken();
                this.router.navigate(['/login'])
            }),
            catchError(this.handleError)
        )
    }

    private log(message: string) {
        // TODO: log these somwhere more useful than the console
        console.log(message);
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(error);
      };
}