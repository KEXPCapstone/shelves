import { Component, OnInit, Input } from '@angular/core';

import { Shelf } from '../shelf';

@Component({
  selector: 'app-shelf-editor',
  templateUrl: './shelf-editor.component.html',
  styleUrls: ['./shelf-editor.component.css']
})
export class ShelfEditorComponent implements OnInit {

  @Input() shelf: Shelf;

  constructor() { }

  ngOnInit() {
  }

}
