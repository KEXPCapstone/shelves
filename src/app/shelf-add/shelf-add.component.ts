import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ShelfService } from '../shelf.service';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Release } from '../models/release';
import { Shelf, NewShelf } from '../models/shelf';


@Component({
  selector: 'app-shelf-add',
  templateUrl: './shelf-add.component.html',
  styleUrls: ['./shelf-add.component.scss']
})
export class ShelfAddComponent implements OnInit {
  private release: Release;
  private userShelves: Shelf[];
  private currShelf: Shelf;

  constructor(
    @Inject(MAT_DIALOG_DATA) release,
    private shelfService: ShelfService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
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
        if (this.authService.isAuthenticated) {
          this.snackbar.open('Error getting your shelves; please try again later.', '', {
            duration: 2000
          });
        }
      }
    );
  }

  updateShelfPreview(form: NgForm) {
    this.currShelf = form.value.shelfPicker;
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
        this.snackbar.open('Added a shelf!', '', {
          duration: 2000
        });
      }, (error) => {
        this.snackbar.open('Error adding shelf; please try again later.', '', {
          duration: 2000
        });
      });
  }

  getCurrShelf() {
    return this.currShelf;
  }

  addToShelf(form: NgForm) {
    const shelf = form.value.shelfPicker;
    shelf.releases.push(this.release);
    shelf.dateLastEdit = new Date().toJSON();
    this.shelfService.updateShelf(shelf)
      .subscribe((resp) => {
        this.snackbar.open('Added ' + this.release.title, '', {
          duration: 2000
        });
      }, (error) => {
        shelf.releases.pop();
        this.snackbar.open('Error adding release; please try again later.', '', {
          duration: 2000
        });
      });
  }

  close() {
    this.dialogRef.close();
  }

}
