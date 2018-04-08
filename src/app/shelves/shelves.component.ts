import { Component, OnInit } from '@angular/core';

import { Shelf } from '../shelf';
import { ShelfService } from '../shelf.service';

@Component({
  selector: 'app-shelves',
  templateUrl: './shelves.component.html',
  styleUrls: ['./shelves.component.css']
})
export class ShelvesComponent implements OnInit {
  shelves: Shelf[];
  myShelves: Shelf[]; // https://angular.io/guide/pipes#appendix-no-filterpipe-or-orderbypipe
  openShelf: Shelf;

  constructor(private shelfService: ShelfService) { }

  ngOnInit() {
    this.getShelves();
    this.getMyShelves();
  }

  getShelves(): void {
    this.shelfService.getShelves()
      .subscribe(shelves => this.shelves = shelves);
  }

  getMyShelves(): void {
    this.shelfService.getShelves()
      .subscribe(shelves => this.myShelves = shelves.filter(s => s.ownerId === 1)); // TODO: hardcoded; ownerID will be from auth'd user
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.shelfService.addShelf({ name } as Shelf)
      .subscribe(shelf => {
        this.shelves.push(shelf);
      });
  }

  delete(shelf: Shelf): void {
    // remove the shelf from the model
    this.shelves = this.shelves.filter(s => s !== shelf);
    // make the call to the backend
    this.shelfService.deleteShelf(shelf).subscribe();
  }

  // handler to open shelf into editor from collection
  onShelfOpen(shelf: Shelf): void {
    console.log('open: ' + shelf.id);
    this.openShelf = shelf;
  }

}
