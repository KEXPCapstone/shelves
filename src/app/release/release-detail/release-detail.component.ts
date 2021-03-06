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
import { environment } from '../../../environments/environment.prod';
import { Shelf } from '../../models/shelf';
import { ShelfService } from '../../shelf.service';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.scss']
})
export class ReleaseDetailComponent implements OnInit, OnDestroy {
  @Input() release: Release;
  releaseShelves: Shelf[];
  private _destroyed = new Subject();
  artURL: string;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private shelfService: ShelfService,
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
        this.dialog.closeAll();
        this.getRelease();
      }
    });

  }

  ngOnInit(): void {
    this.getRelease();
  }

  getReleaseShelves() {
    const id = this.release.id;
    this.shelfService.getShelvesForRelease(id).subscribe(
      shelves => this.releaseShelves = shelves
    );
  }

  getArt() {
    if (this.release.coverArtArchive.artwork) {
      return `${environment.coverArtUrl}/release/${this.release.id}/front-500.jpg`;
    } else {
      return `${environment.coverArtUrl}/release-group/${this.release.KEXPReleaseGroupMBID}/front-500.jpg`;
    }
  }

  getRelease(): void {
    const id = this.route.snapshot.paramMap.get('releaseId');
    this.libraryService.getReleaseById(id)
      .subscribe(release => {
        this.release = release;
        this.getReleaseShelves();
      });
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
    this.dialog.open(ShelfAddComponent, dialogConfig).afterClosed().subscribe(
      result => { this.getReleaseShelves(); }
    );
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
    this._destroyed.next();
  }

}
