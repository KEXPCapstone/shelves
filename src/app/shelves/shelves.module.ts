import { NgModule, Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Shelf } from '../models/shelf';
import { ShelfService } from '../shelf.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BROWSE_NAV_ITEMS } from '../browse-sidenav/browse-nav-items';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { MatDialog, MatDialogConfig, MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-shelves-list',
  templateUrl: './shelves-list.component.html',
  styleUrls: ['./shelves-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ShelvesListComponent implements OnInit, OnDestroy {
  shelves: Shelf[] = [];
  group: string;
  isAuthenticated = true; // set to true until proven otherwise
  private _destroyed = new Subject();

  constructor(
    private shelfService: ShelfService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
    private _router: Router
  ) {
  combineLatest(_route.params, _route.parent.params).pipe(
    takeUntil(this._destroyed)
  ).subscribe(p => {
    this.getShelves();
  });
  }

  ngOnInit() {
    this.getShelves();
  }

  getShelves() {
    const groupId = this._route.snapshot.paramMap.get('groupId');
    this.shelves = [];
    this.group = groupId;
    switch (groupId) {
      case 'mine': {
        this.getMyShelves();
         break;
      }
      case 'all': {
        this.getAllShelves();
         break;
      }
      case 'featured': {
        this.getFeaturedShelves();
         break;
      }
   }
  }

  getMyShelves() {
    this.shelfService.getMyShelves()
      .subscribe((shelves) => {
        this.shelves = shelves;
      }, (error) => {
        this.isAuthenticated = false;
        console.log(error);
      }
    );
  }

  getAllShelves() {
    this.shelfService.getShelves()
      .subscribe((shelves) => {
        this.shelves = shelves;
      }, (error) => {
        console.log(error);
      }
    );
  }

  getFeaturedShelves() {
    this.shelfService.getFeaturedShelves()
      .subscribe((shelves) => {
        this.shelves = shelves;
      }, (error) => {
        console.log(error);
      }
    );
  }

  createShelf() {
    this.openCreateShelfDialog();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

  openCreateShelfDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '60rem';
    this._dialog.open(CreateShelfComponent, dialogConfig);
  }
}

@Component({
  selector: 'app-create-shelf',
  templateUrl: './create-shelf.component.html',
  styleUrls: ['./create-shelf.component.scss']
})
export class CreateShelfComponent implements OnInit {
  constructor(
    private shelfService: ShelfService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateShelfComponent>
  ) {}

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}

@NgModule({
  declarations: [
    ShelvesListComponent,
    ShelfDetailComponent,
    CreateShelfComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    BrowserModule
  ],
  entryComponents: [
    CreateShelfComponent
  ],
})
export class ShelvesModule { }
