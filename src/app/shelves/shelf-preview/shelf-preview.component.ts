import { Component, OnInit, Input } from '@angular/core';
import { Release } from '../../release';

@Component({
  selector: 'app-shelf-preview',
  templateUrl: './shelf-preview.component.html',
  styleUrls: ['./shelf-preview.component.scss']
})
export class ShelfPreviewComponent implements OnInit {
  @Input() releaseIds: string[];

  constructor() { }

  ngOnInit() {
  }

}
