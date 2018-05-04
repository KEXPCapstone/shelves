import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LibraryService } from '../../library.service';
import { Release } from '../../release';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ReleaseNotesComponent } from '../release-notes/release-notes.component';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.scss']
})
export class ReleaseDetailComponent implements OnInit {
  @Input() release: Release;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRelease();
  }

  getRelease(): void {
    const id = this.route.snapshot.paramMap.get('releaseId');
    this.libraryService.getReleaseById(id)
      .subscribe(release => this.release = release);
  }

  // fetches album art for a release
  // first priority: release-specific image
  // second priority: release-group
  // fallback: placeholder image
  getArtForRelease(): string {
    if (this.release.coverArtArchive.front) {
      return `//coverartarchive.org/release/${this.release.id}/front-500.jpg`;
    } else {
      return `//coverartarchive.org/release-group/${this.release.KEXPReleaseGroupMBID}/front-500.jpg`;
    }

 // coverartarchive.org/release-group/{{release.KEXPReleaseGroupMBID}}/front-500.jpg
  }

  // useful to implement 'back' button
  goBack(): void {
    this.location.back();
  }

  openNotesDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true; 
    dialogConfig.data = this.release;
    dialogConfig.width = '60rem';
    this.dialog.open(ReleaseNotesComponent, dialogConfig)
  }
}
