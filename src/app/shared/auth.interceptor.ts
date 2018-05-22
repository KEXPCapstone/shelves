import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>  {
        let copiedReq;
        if (this.authService.getToken()) {
            copiedReq = req.clone({headers: req.headers.append('Authorization', this.authService.getToken())});
        } else {
            copiedReq = req;
        }
        return next.handle(copiedReq)
        .pipe(
            tap((resp) => {
            }, (err) => {
                if (err.status === 401) {
                    this.authService.removeToken();
                }
            })
        );
    }
}
