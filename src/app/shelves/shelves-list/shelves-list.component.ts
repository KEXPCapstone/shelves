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

  constructor(private shelfService: ShelfService) { }

  ngOnInit() {
  }

  getMyShelves() {
    this.shelfService.getMyShelves()
      .subscribe((shelves) => {
        this.myShelves = shelves;
      }, (error) => {
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
}
