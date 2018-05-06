import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Release } from '../release';
import { ShelfService } from '../shelf.service';
import { Shelf, NewShelf } from '../shelf';
import { FormControl, NgForm } from '@angular/forms';


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
      .subscribe((shelves) => {
        console.log(shelves);
        this.userShelves = shelves;
        console.log(this.userShelves);
      }, (error) => {
        console.log(error);
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  newShelf(form: NgForm) {
    console.log(form.value.shelfName);
    const newShelf: NewShelf = {
      name: form.value.shelfName,
      description: '',
      featured: false
    };
    this.shelfService.addShelf(newShelf)
      .subscribe((resp) => {
        console.log(resp);
        this.getUserShelves();
      });
  }

  getCurrShelf() {}

  addToShelf(form: NgForm) {
    console.log(form.value.shelfPicker.releaseIDs);
    const shelf = form.value.shelfPicker;
    shelf.releaseIDs.push(this.release.id);
    console.log(shelf);
  }

}
