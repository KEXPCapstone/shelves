import { NgModule, Component, OnInit, OnDestroy } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { Shelf } from '../models/shelf';
import { ShelfService } from '../shelf.service';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-shelves-list',
  templateUrl: './shelves-list.component.html',
  styleUrls: ['./shelves-list.component.scss']
})
export class ShelvesListComponent implements OnInit, OnDestroy {
  shelves: Shelf[] = [];
  group: string;
  isAuthenticated = true; // set to true until proven otherwise
  private _destroyed = new Subject();

  constructor(
    private shelfService: ShelfService,
    private _route: ActivatedRoute,
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

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}

@NgModule({
  declarations: [
    ShelvesListComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    BrowserModule
  ]
})
export class ShelvesModule { }
