import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Release } from '../release';
import { ShelfService } from '../shelf.service';
import { Shelf, NewShelf } from '../shelf';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-shelf-add',
  templateUrl: './shelf-add.component.html',
  styleUrls: ['./shelf-add.component.scss']
})
export class ShelfAddComponent implements OnInit {
  private release: Release;
  private userShelves: Shelf[];
  private selectedShelfReleaseIds: string[] = [];
  private currShelfName: string;


  constructor(
    @Inject(MAT_DIALOG_DATA) release,
    private shelfService: ShelfService,
    private authService: AuthService,
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

  updateShelfPreview(form: NgForm) {
    console.log(form.value.shelfPicker);
    this.selectedShelfReleaseIds = form.value.shelfPicker.releaseIDs;
    this.currShelfName = form.value.shelfPicker.name;
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
        form.reset();
      });
  }

  getCurrShelf() {}

  addToShelf(form: NgForm) {
    console.log(form.value.shelfPicker.releaseIDs);
    const shelf = form.value.shelfPicker;
    shelf.releaseIDs.push(this.release.id);
    console.log(shelf);
    this.shelfService.updateShelf(shelf)
      .subscribe((resp) => {
        console.log(resp);
        console.log('updated!');
      });
  }

  close() {
    this.dialogRef.close();
  }

}
