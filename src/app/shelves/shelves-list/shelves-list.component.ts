import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../../shelf.service';
import { Shelf } from '../../shelf';

@Component({
  selector: 'app-shelves-list',
  templateUrl: './shelves-list.component.html',
  styleUrls: ['./shelves-list.component.scss']
})
export class ShelvesListComponent implements OnInit {
  private myShelves: Shelf[] = [];
  private allShelves: Shelf[] = [];
  private featuredShelves: Shelf[] = [];
  private isAuthenticated = true; // set to true until proven otherwise

  constructor(private shelfService: ShelfService) { }

  ngOnInit() {
    this.getMyShelves();
    this.getAllShelves();
    this.getFeaturedShelves();
  }

  getMyShelves() {
    this.shelfService.getMyShelves()
      .subscribe((shelves) => {
        this.myShelves = shelves;
      }, (error) => {
        this.isAuthenticated = false;
        console.log(error);
      }
    );
  }

  getAllShelves() {
    this.shelfService.getShelves()
      .subscribe((shelves) => {
        this.allShelves = shelves;
      }, (error) => {
        console.log(error);
      }
    );
  }

  getFeaturedShelves() {
    this.shelfService.getFeaturedShelves()
      .subscribe((shelves) => {
        this.featuredShelves = shelves;
      }, (error) => {
        console.log(error);
      }
    );
  }
}
