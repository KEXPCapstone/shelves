import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Release } from './models/release';
import { Note, NewNote } from './models/note';

@Injectable()
export class NoteService {

    constructor(private http: HttpClient) {}

    getNotes(release: Release): Observable<Note[]> {
        const url = `${environment.apiUrl}/library/notes/releases/${release.id}`;
        return this.http.get<Note[]>(url).pipe(
            tap((resp) => {
            }),
            catchError(this.handleError('getNotes', []))
        );
    }

    postNote(note: string, release: Release): Observable<Note> {
        const url = `${environment.apiUrl}/library/notes/releases/${release.id}`;
        const noteObj: NewNote = {comment: note};
        return this.http.post<Note>(url, noteObj).pipe(
            tap((resp) => {
            }),
            catchError(this.handleError())
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
