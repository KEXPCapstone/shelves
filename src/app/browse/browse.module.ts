import { NgModule, OnDestroy, ElementRef, Renderer2, ViewChild, AfterViewInit} from '@angular/core';
import { RouterModule, ActivatedRoute, Router, Params } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LibraryService } from '../library.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { Label } from '../models/label';

const MAX_BROWSE_ITEMS = 200;

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./browse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistListComponent implements OnInit, OnDestroy {
  artists: Artist[]; // the artists currently displayed
  group: string;
  private _destroyed = new Subject();


  constructor(
    private libraryService: LibraryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  combineLatest(_route.params, _route.parent.params).pipe(
    takeUntil(this._destroyed)
    ).subscribe(p => {
      this.newArtists();
    });
  }

  ngOnInit() {
    this.newArtists();
  }

  newArtists() {
    const groupId = this._route.snapshot.paramMap.get('groupId');
    this.group = groupId;
    this.libraryService.getArtists(groupId, groupId, MAX_BROWSE_ITEMS).subscribe(
      artists => this.artists = artists
    );
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}

@Component({
  selector: 'app-artist-component',
  templateUrl: './artist.component.html',
  styleUrls: ['./browse-subgroup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistComponent implements OnInit {
  artist: Artist;

  constructor(private libraryService: LibraryService,
              private _route: ActivatedRoute) {}

  ngOnInit() {
    const artistId = this._route.snapshot.paramMap.get('artistId');
    this.libraryService.getArtistById(artistId).subscribe(
      artist => this.artist = artist
    );
  }
}

@Component({
  selector: 'app-label-component',
  templateUrl: './label.component.html',
  styleUrls: ['./browse-subgroup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabelComponent implements OnInit {
  label: Label;

  constructor(private libraryService: LibraryService,
              private _route: ActivatedRoute) {}

  ngOnInit() {
    const labelId = this._route.snapshot.paramMap.get('labelId');
    this.libraryService.getLabelById(labelId).subscribe(
      label => this.label = label
    );
  }
}

@Component({
  selector: 'app-label-list',
  templateUrl: './label-list.component.html',
  styleUrls: ['./browse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LabelListComponent implements OnInit, OnDestroy {
  labels: Label[]; // the labels currently displayed
  group: string;
  private _destroyed = new Subject();


  constructor(
    private libraryService: LibraryService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
  combineLatest(_route.params, _route.parent.params).pipe(
    takeUntil(this._destroyed)
    ).subscribe(p => {
      this.newLabels();
    });
  }

  ngOnInit() {
    this.newLabels();
  }

  newLabels() {
    const groupId = this._route.snapshot.paramMap.get('groupId');
    this.group = groupId;
    this.libraryService.getLabels(groupId, groupId, MAX_BROWSE_ITEMS).subscribe(
      labels => this.labels = labels
    );
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}

@Component({
  selector: 'app-genre-release-list',
  templateUrl: './genre-release-list.component.html',
  styleUrls: ['./browse.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GenreReleaseListComponent implements OnInit, OnDestroy {
  constructor(
    private libraryService: LibraryService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

}








@NgModule({
    declarations: [
        ArtistListComponent,
        LabelListComponent,
        ArtistComponent,
        LabelComponent,
        GenreReleaseListComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
    ]
})
export class BrowseModule {}
