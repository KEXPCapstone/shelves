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

  constructor(private shelfService: ShelfService) { }

  ngOnInit() {
    this.getShelves();
  }

  getShelves(): void {
    this.shelfService.getShelves()
      .subscribe(shelves => this.shelves = shelves);
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
    this.shelves = this.shelves.filter(h => h !== shelf);
    this.shelfService.deleteShelf(shelf).subscribe();
  }

}