import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-shelf-add',
  templateUrl: './shelf-add.component.html',
  styleUrls: ['./shelf-add.component.scss']
})
export class ShelfAddComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ShelfAddComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
