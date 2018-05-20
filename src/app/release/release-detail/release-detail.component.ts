import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { LibraryService } from '../../library.service';
import { MatDialog, MatDialogConfig, MatIconRegistry } from '@angular/material';
import { ReleaseNotesComponent } from '../release-notes/release-notes.component';
import { ShelfAddComponent } from '../../shelf-add/shelf-add.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Release } from '../../models/release';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReleaseDetailComponent implements OnInit, OnDestroy {
  @Input() release: Release;
  private _destroyed = new Subject();

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private location: Location,
    private dialog: MatDialog,
    private _router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer

  ) {
    iconRegistry.addSvgIcon(
      'notes',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/baseline-question_answer-24px.svg')
    );

    iconRegistry.addSvgIcon(
      'add-to-shelf',
      sanitizer.bypassSecurityTrustResourceUrl('../../../assets/baseline-add_circle_outline-24px.svg')
    );

    this._router.events.pipe(
      takeUntil(this._destroyed)
    ).subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.getRelease();
      }
    });

  }

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
  }

  // useful to implement 'back' button
  goBack(): void {
    this.location.back();
  }

  openNotesDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.release;
    dialogConfig.width = '60rem';
    this.dialog.open(ReleaseNotesComponent, dialogConfig);
  }

  openShelfAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.data = this.release;
    dialogConfig.width = '60rem';
    this.dialog.open(ShelfAddComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }

}
