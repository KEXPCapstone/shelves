import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Release } from '../../release';
import { NoteService } from '../../note.service';
import { Note } from '../../note';
import { FormControl, NgForm } from '@angular/forms';


@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  private release : Release;
  private notes : Note[];

  constructor(@Inject(MAT_DIALOG_DATA) release, private noteService: NoteService, public dialogRef: MatDialogRef<ReleaseNotesComponent>) {
    this.release = release;    
   }

  ngOnInit() {
    this.getNotes();
  }

  private getUserInfo(userId: string) {
    // something in authSerivce which gets the name back and displays it within one of the ngFor things
  }


  getNotes() {
    this.noteService.getNotes(this.release)
      .subscribe((resp) => {
        this.notes = resp.body;
      }, (error) => {
        console.log("Oh shit boy subscribe method got an error from notes!")
        console.log(error)
        // TODO: Display dat error boy
      }
    )
  }

  postNote(form: NgForm) {
    console.log(form.value.note)
    this.noteService.postNote(form.value.note, this.release)
      .subscribe((resp) => {
        console.log(resp)
        this.notes.push(resp.body)
      }, (error) => {
        console.log(error);
      }
    )
  }


  close() {
    this.dialogRef.close();
  }
}
