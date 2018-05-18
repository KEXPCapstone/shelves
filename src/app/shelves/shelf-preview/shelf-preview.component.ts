import { Component, OnInit, Input } from '@angular/core';
import { Release } from '../../models/release';
import { Shelf } from '../../models/shelf';
import { LibraryService } from '../../library.service';

@Component({
  selector: 'app-shelf-preview',
  templateUrl: './shelf-preview.component.html',
  styleUrls: ['./shelf-preview.component.scss']
})
export class ShelfPreviewComponent implements OnInit {
  @Input() shelf: Shelf;
  @Input() clickable: boolean;
  private imgUrls = new Map();

  constructor(private libraryService: LibraryService) { }

  ngOnInit() {
  }

  getArt(mbid: string) {
    return `//coverartarchive.org/release/${mbid}/front-500.jpg`;
  }

  getBackupArt(mbid: string) {
    console.log(mbid);
    this.libraryService.getReleaseById(mbid)
      .subscribe((release) => {
        this.imgUrls.set(release.id, `//coverartarchive.org/release-group/${release.KEXPReleaseGroupMBID}/front-500.jpg`);
      });
  }
}
