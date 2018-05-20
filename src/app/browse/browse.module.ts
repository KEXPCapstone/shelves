import { NgModule, OnDestroy, ElementRef, Renderer2, ViewChild, AfterViewInit, Input} from '@angular/core';
import { RouterModule, ActivatedRoute, Router, Params } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LibraryService } from '../library.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Artist } from '../models/artist';
import { Label } from '../models/label';
import { Release } from '../models/release';
import { VirtualScrollModule } from 'angular2-virtual-scroll';

const MAX_BROWSE_ITEMS = 200000;

@Component({
  selector: 'app-browse-list',
  templateUrl: './browse-list.component.html',
  styleUrls: ['./browse-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrowseListComponent implements OnInit, OnDestroy {
  browseItems: any[]; // the full set items currently displayed
  section: string;
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
      this.newBrowseItems();
    });
  }

  ngOnInit() {
    this.newBrowseItems();
  }

  newBrowseItems() {
    // fetch the parent route (ie section (artists, labels...))
    this.section = this._route.snapshot.parent.url[0].path;
    // the subgroup id
    this.group = this._route.snapshot.paramMap.get('groupId');
    switch (this.section) {
      case 'artists': {
        this.libraryService.getArtists(this.group, this.group, MAX_BROWSE_ITEMS).subscribe(
          artists => this.browseItems = artists
        );
        break;
      }
      case 'labels': {
        this.libraryService.getLabels(this.group, this.group, MAX_BROWSE_ITEMS).subscribe(
          labels => this.browseItems = labels
        );
        break;
      }
      case 'genres': {
        if (this.group === 'rock-pop') {
          this.group = 'Rock/Pop';
        } else if (this.group === 'hip-hop') {
          this.group = 'Hip Hop';
        }
        this.libraryService.getRelatedReleases('KEXPPrimaryGenre', this.group, 'a', MAX_BROWSE_ITEMS).subscribe(
          releases => this.browseItems = releases
        );
        break;
      }
    }
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
  selector: 'app-list-item', // do not change to app-list-item
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  @Input() item: any;
  @Input() section: string;
  @Input() group: string;
}

@Component({
  selector: 'app-artist-item',
  templateUrl: './artist-item.component.html',
  styleUrls: ['./artist-item.component.scss']
})
export class ArtistItemComponent {
  @Input() artist: Artist;
  @Input() group: string;
}

@Component({
  selector: 'app-release-item',
  templateUrl: './release-item.component.html',
  styleUrls: ['./release-item.component.scss']
})
export class ReleaseItemComponent {
  @Input() release: Release;
  @Input() group: string;
}

@Component({
  selector: 'app-label-item',
  templateUrl: './label-item.component.html',
  styleUrls: ['./label-item.component.scss']
})
export class LabelItemComponent {
  @Input() label: Label;
  @Input() group: string;
}

@NgModule({
    declarations: [
        BrowseListComponent,
        ArtistComponent,
        LabelComponent,
        ListItemComponent,
        ArtistItemComponent,
        ReleaseItemComponent,
        LabelItemComponent
    ],
    imports: [
        SharedModule,
        VirtualScrollModule,
        RouterModule
    ]
})
export class BrowseModule {}
