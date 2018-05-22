import { Component, OnInit, Input } from '@angular/core';
import { Release } from '../../models/release';
import { Shelf } from '../../models/shelf';
import { LibraryService } from '../../library.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shelf-preview',
  templateUrl: './shelf-preview.component.html',
  styleUrls: ['./shelf-preview.component.scss']
})
export class ShelfPreviewComponent implements OnInit {
  @Input() shelf: Shelf;
  private imgUrls = new Map();

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }

  getArt(release: Release) {
    if (release.coverArtArchive.artwork) {
      return `${environment.coverArtUrl}/release/${release.id}/front-500.jpg`;
    } else {
      return `${environment.coverArtUrl}/release-group/${release.KEXPReleaseGroupMBID}/front-500.jpg`;
    }
  }

  getBackupArt(mbid: string) {
    this.libraryService.getReleaseById(mbid)
      .subscribe((release) => {
        this.imgUrls.set(release.id, `//coverartarchive.org/release-group/${release.KEXPReleaseGroupMBID}/front-500.jpg`);
      });
  }
}
