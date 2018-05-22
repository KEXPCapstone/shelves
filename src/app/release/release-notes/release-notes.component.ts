import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { NoteService } from '../../note.service';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Release } from '../../models/release';
import { Note } from '../../models/note';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  release: Release;
  notes: Note[];
  numNotes = 0;
  numPosters = 0;
  artURL: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) release,
    private noteService: NoteService,
    public authService: AuthService,
    public dialogRef: MatDialogRef<ReleaseNotesComponent>,
    public http: HttpClient,
    private snackbar: MatSnackBar
  ) {
    this.release = release;
   }

  ngOnInit() {
    this.getNotes();
    if (this.release.coverArtArchive.artwork) {
      this.artURL = `${environment.coverArtUrl}/release/${this.release.id}/front-500.jpg`;
    } else if (this.release.asin !== '') {
      this.artURL = `http://images-eu.amazon.com/images/P/${this.release.asin}`;
    } else {
      this.artURL = `${environment.coverArtUrl}/release-group/${this.release.KEXPReleaseGroupMBID}/front-500.jpg`;
    }
  }

  setNumberPosters() {
    const seen: string[] = [];
    let count = 0;
    this.notes.forEach(function(note) {
      if (seen.indexOf(note.ownerID) === -1) {
        count++;
        seen.push(note.ownerID);
      }
    });
    this.numPosters = count;
  }


  getNotes() {
    this.noteService.getNotes(this.release)
      .subscribe((resp) => {
        this.notes = resp;
        this.numNotes = this.notes.length;
        this.setNumberPosters();
      }, (error) => {
        this.snackbar.open('Error getting notes. Please try again later.', '', {
          duration: 2000
        });
      }
    );
  }

  postNote(form: NgForm) {
    this.noteService.postNote(form.value.note, this.release)
      .subscribe((resp) => {
        this.notes.push(resp);
        this.numNotes = this.notes.length;
        this.setNumberPosters();
        form.reset();
      }, (error) => {
        this.snackbar.open(error.error, '', {
          duration: 2000
        });
      }
    );
  }


  close() {
    this.dialogRef.close();
  }
}
