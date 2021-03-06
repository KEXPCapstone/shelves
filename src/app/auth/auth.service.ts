import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User, Credentials, NewUser } from '../models/user';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const fullHttpOptions = {
    observe: 'response',
};


@Injectable()
export class AuthService {
    public isAuthenticated: boolean = this.getToken() ? true : false;

    constructor(private http: HttpClient, private router: Router) { }

    public getToken(): string {
        return localStorage.getItem('auth-token');
    }

    public setToken(token: string) {
        localStorage.setItem('auth-token', token);
        this.isAuthenticated = true;
    }

    public removeToken() {
        localStorage.removeItem('auth-token');
        this.isAuthenticated = false;
    }

    public getCurrUser(): Observable<User> {
        // return localStorage.getItem('auth-token') != null;
        const url = `${environment.apiUrl}/users/me`;
        return this.http.get<User>(url).pipe(
            tap((resp) => {
                // this.setToken(resp.headers.get('Authorization'));
            }),
            catchError(this.handleError())
        );
    }

    // Returns the entire HTTP Response. JSON response
    // body is accessible via resp.body
    public login(email: string, password: string): Observable<HttpResponse<any>> {
        this.removeToken();
        const creds: Credentials = {email: email, password: password};
        const url = `${environment.apiUrl}/sessions`;
        return this.http.post<HttpResponse<User>>(url, creds, {observe: 'response'}).pipe(
            tap((resp) => {
                this.successfulSignIn(resp);
            })
            // ,
            // catchError(this.handleError())
        );
    }

    // will pass authorization header in http interceptor
    public logout() {
        const url = `${environment.apiUrl}/sessions/mine`;
        return this.http.delete(url, {responseType: 'text'})
        .pipe(
            tap(_ => {
                this.removeToken();
                this.router.navigate(['/login']);
            }),
            catchError(this.handleError())
        );
    }

    public newUser(
        email: string,
        password: string,
        passwordConf: string,
        firstName: string,
        lastName: string): Observable<HttpResponse<any>> {
        const url = `${environment.apiUrl}/users`;
        const usr: NewUser = {
            email: email,
            password: password,
            passwordConf: passwordConf,
            firstName: firstName,
            lastName: lastName
        };
        return this.http.post<HttpResponse<User>>(url, usr, {observe: 'response'})
            .pipe(
                tap((resp) => {
                    this.successfulSignIn(resp);
                })
            );
}

    private successfulSignIn(resp) {
        this.setToken(resp.headers.get('Authorization'));
        this.isAuthenticated = true;
        this.router.navigate(['/browse']);
    }

    private log(message: string) {
        // TODO: better logging, don't log to console
        console.log(message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          // TODO: send the error to remote logging infrastructure
          console.log('An error occurred:', error.error.message);

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
          this.removeToken();
          // let the app keep running by returning an empty result
          return of(result as T);
        };
    }
}
