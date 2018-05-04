import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Release } from '../../release';
import { NoteService } from '../../note.service';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  private release : Release;

  constructor(@Inject(MAT_DIALOG_DATA) release, private noteService: NoteService) {
    this.release = release;    
   }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.noteService.getNotes(this.release)
      .subscribe((resp) => {
        console.log(resp.body)
      }, (error) => {
        console.log("Oh shit boy subscribe method got an error from notes!")
        console.log(error)

      }
    )
  }

}
