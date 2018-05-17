import { NgModule, OnDestroy, ElementRef, Renderer2, ViewChild, AfterViewInit} from '@angular/core';
import { RouterModule, ActivatedRoute, Router, Params } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LibraryService } from '../library.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Artist } from '../models/artist';

const MAX_BROWSE_ITEMS = 200;

@Component({
  selector: 'app-browse-subgroup',
  templateUrl: './browse-subgroup.component.html',
  styleUrls: ['./browse-subgroup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrowseSubgroupComponent implements OnInit {
  category: string;
  group: string;
  groupInfo: any;
  constructor(private libraryService: LibraryService,
              private _route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this._route.snapshot.paramMap.get('categoryId');
    this.group = this._route.snapshot.paramMap.get('groupId');
    this.getGroupReleases();
  }

  // retrieve releases which belong to this group
  // which may be an artist/label/genre etc.
  getGroupReleases() {
    const subgroupId = this._route.snapshot.paramMap.get('subGroupId');
    this.libraryService.getArtistById(subgroupId).subscribe(
      artist => this.groupInfo = artist
    );
  }
}

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
    private _router: Router,
    private _elementRef: ElementRef,
    private _renderer2: Renderer2
  ) {
  // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
  // parent route for the section (material/cdk).
  combineLatest(_route.params, _route.parent.params).pipe(
    map((p: [Params, Params]) => ({group: p[0]['groupId'], category: p[1]['categoryId']})),
    takeUntil(this._destroyed)
    ).subscribe(p => {
      this.updateArtists();
    });
  }

  ngOnInit() {
    this.updateArtists();
  }

  updateArtists() {
    const groupId = this._route.snapshot.paramMap.get('groupId');
    this.group = groupId;
    this.libraryService.getArtists(groupId, MAX_BROWSE_ITEMS).subscribe(
      artists => this.artists = artists
    );
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class BrowseComponent implements OnInit, OnDestroy {
    artists: any[];
    category: string;
    group: string;
    maxItems = 200; // maximum number of items to pull from the API
    private _destroyed = new Subject();

    constructor(
      private libraryService: LibraryService,
      private _route: ActivatedRoute,
      private _router: Router
    ) {
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    combineLatest(_route.params, _route.parent.params).pipe(
      map((p: [Params, Params]) => ({group: p[0]['groupId'], category: p[1]['categoryId']})),
      takeUntil(this._destroyed)
      ).subscribe(p => {
        this.getBrowseItems(p.category, p.group);
      });
    }

    ngOnInit() {
      // parse the route and get browse items based on that route
      const category = this._route.snapshot.paramMap.get('categoryId');
      const group = this._route.snapshot.paramMap.get('groupId');
      this.libraryService.getArtists(group, this.maxItems).subscribe(
         artists => this.artists = artists
      );
    }

    getBrowseItems(category: string, group: string) {
      switch (category) {
        case 'artists': {
          this.libraryService.getArtists(group, this.maxItems).subscribe(
            artists => this.artists = artists
          );
          break;
        }
        case 'labels': {
          break;
        }
        case 'decades': {
          break;
        }
      }
      this.category = category;
      this.group = group;
    }

    ngOnDestroy(): void {
      this._destroyed.next();
    }
}

@NgModule({
    declarations: [
        BrowseComponent, // the root of browse feature
        ArtistListComponent,
        BrowseSubgroupComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
    ]
})
export class BrowseModule {}
