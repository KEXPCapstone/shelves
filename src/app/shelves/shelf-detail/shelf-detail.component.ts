import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelfService } from '../../shelf.service';
import { Shelf } from '../../models/shelf';
import { environment } from '../../../environments/environment';
import { Release } from '../../models/release';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-shelf-detail',
  templateUrl: './shelf-detail.component.html',
  styleUrls: ['./shelf-detail.component.scss']
})
export class ShelfDetailComponent implements OnInit {
  shelf: Shelf;

  constructor(
    private route: ActivatedRoute,
    private shelfService: ShelfService,
    public authService: AuthService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getShelf();
  }

  setFeaturedShelf() {
    // this should probably end up as a copy instead of a pointer
    const updatedShelf = this.shelf;
    updatedShelf.featured = true;
    this.shelfService.updateShelf(updatedShelf)
      .subscribe((resp) => {
        this.snackbar.open(`"${this.shelf.name}" is now a featured shelf"`, '', {
          duration: 3500,
          panelClass: ['custom-snackbar']
        });
      }, (error) => {
        this.snackbar.open('Error updating shelf; please try again later.', '', {
          duration: 3500,
          panelClass: ['warn-snackbar']
        });
      });
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
