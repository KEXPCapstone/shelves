import { Component, OnInit, Input } from '@angular/core';
import { Release } from '../../models/release';
import { Shelf } from '../../models/shelf';

@Component({
  selector: 'app-shelf-preview',
  templateUrl: './shelf-preview.component.html',
  styleUrls: ['./shelf-preview.component.scss']
})
export class ShelfPreviewComponent implements OnInit {
  @Input() shelf: Shelf;
  @Input() clickable: boolean;

  constructor() { }

  ngOnInit() {
  }



}
