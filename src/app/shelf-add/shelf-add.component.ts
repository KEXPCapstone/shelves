import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Release } from '../release';

@Component({
  selector: 'app-shelf-add',
  templateUrl: './shelf-add.component.html',
  styleUrls: ['./shelf-add.component.scss']
})
export class ShelfAddComponent implements OnInit {
  private release: Release;

  constructor(
    @Inject(MAT_DIALOG_DATA) release,
    public dialogRef: MatDialogRef<ShelfAddComponent>) {
      this.release = release;
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
