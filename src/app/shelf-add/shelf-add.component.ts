import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Release } from '../release';
import { ShelfService } from '../shelf.service';
import { Shelf } from '../shelf';

@Component({
  selector: 'app-shelf-add',
  templateUrl: './shelf-add.component.html',
  styleUrls: ['./shelf-add.component.scss']
})
export class ShelfAddComponent implements OnInit {
  private release: Release;
  private userShelves: Shelf[];

  constructor(
    @Inject(MAT_DIALOG_DATA) release,
    private shelfService: ShelfService,
    public dialogRef: MatDialogRef<ShelfAddComponent>) {
      this.release = release;
    }

  ngOnInit() {
    this.getUserShelves();
  }

  getUserShelves() {
    this.shelfService.getMyShelves()
      .subscribe((resp) => {
        this.userShelves = resp.body;
      }, (error) => {
        console.log(error);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

}
