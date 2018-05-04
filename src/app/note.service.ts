import { Injectable } from "@angular/core";
import { Release } from "./release";
import { environment } from "../environments/environment";
import { Note, NewNote } from "./note";
import { HttpClient, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { tap, catchError } from "rxjs/operators";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";

@Injectable()
export class NoteService {

    constructor(private http: HttpClient) {}

    getNotes(release : Release): Observable<HttpResponse<Note[]>> {
        const url = `${environment.apiUrl}/library/notes/releases/${release.id}`
        return this.http.get<HttpResponse<Note[]>>(url, {observe: 'response'}).pipe(
            tap((resp) => {
                console.log(resp)
            }),
            catchError(this.handleError)
        );
    }

    postNote(note: string, release: Release): Observable<HttpResponse<Note>> {
        const url = `${environment.apiUrl}/library/notes/releases/${release.id}`
        let noteObj : NewNote = {comment: note}
        return this.http.post<HttpResponse<Note>>(url, noteObj, {observe: 'response'}).pipe(
            tap((resp) => {
                console.log(resp)
            }),
            catchError(this.handleError)
        )

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