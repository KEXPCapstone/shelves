import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Release } from '../../release';

@Component({
  selector: 'app-release-notes',
  templateUrl: './release-notes.component.html',
  styleUrls: ['./release-notes.component.scss']
})
export class ReleaseNotesComponent implements OnInit {
  private release : Release;

  constructor(@Inject(MAT_DIALOG_DATA) release) {
    this.release = release;    
   }

  ngOnInit() {
  }

}
