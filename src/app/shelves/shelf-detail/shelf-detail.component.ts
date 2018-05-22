import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelfService } from '../../shelf.service';
import { Shelf } from '../../models/shelf';
import { environment } from '../../../environments/environment';
import { Release } from '../../models/release';

@Component({
  selector: 'app-shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.scss']
})
export class ShelfDetailComponent implements OnInit {
  shelf: Shelf;

  constructor(
    private route: ActivatedRoute,
    private shelfService: ShelfService
  ) { }

  ngOnInit() {
    this.getShelf();
  }

  getShelf() {
    const id = this.route.snapshot.paramMap.get('shelfId');
    this.shelfService.getShelf(id)
      .subscribe(shelf => this.shelf = shelf);
  }

  getArt(release: Release) {
    if (release.coverArtArchive.artwork) {
      return `${environment.coverArtUrl}/release/${release.id}/front-500.jpg`;
    } else {
      return `${environment.coverArtUrl}/release-group/${release.KEXPReleaseGroupMBID}/front-500.jpg`;
    }
  }
}
