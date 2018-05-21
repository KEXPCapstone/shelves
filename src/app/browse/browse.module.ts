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
import { VirtualScrollModule, ChangeEvent } from 'angular2-virtual-scroll';
import { environment } from '../../environments/environment';

const MAX_BROWSE_ITEMS = 200;

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
      this.firstBrowseItems();
    });
  }

  ngOnInit() {
    this.firstBrowseItems();
  }

  fetchMore(event: ChangeEvent) {
    if (event.end !== this.browseItems.length) { return; }
    let start;
    if (this.section === 'genres') {
      start = this.browseItems[this.browseItems.length - 1].title;
    } else {
      start = this.browseItems[this.browseItems.length - 1].name;
    }
    this.fetchNextChunk(start);
  }

  fetchNextChunk(start: string) {
    console.log('Fetching next chunk');
    switch (this.section) {
      case 'artists': {
        this.libraryService.getArtists(this.group, start, MAX_BROWSE_ITEMS).subscribe(
          artists => this.browseItems = this.browseItems.concat(artists)
        );
        break;
      }
      case 'labels': {
        this.libraryService.getLabels(this.group, start, MAX_BROWSE_ITEMS).subscribe(
          labels => this.browseItems = this.browseItems.concat(labels)
        );
        break;
      }
      case 'genres': {
        if (this.group === 'rock-pop') {
          this.group = 'Rock/Pop';
        } else if (this.group === 'hip-hop') {
          this.group = 'Hip Hop';
        }
        this.libraryService.getRelatedReleases('KEXPPrimaryGenre', this.group, start, MAX_BROWSE_ITEMS).subscribe(
          releases => this.browseItems = this.browseItems.concat(releases)
        );
        break;
      }
    }
  }

  firstBrowseItems() {
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

    getArt(release: Release) {
      if (release.coverArtArchive.artwork) {
        return `${environment.coverArtUrl}/release/${release.id}/front-500.jpg`;
      } else if (release.asin !== '') {
        return `http://images-eu.amazon.com/images/P/${release.asin}`;
      } else {
        return `${environment.coverArtUrl}/release-group/${release.KEXPReleaseGroupMBID}/front-500.jpg`;
      }
    }

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
export class ArtistItemComponent implements OnInit {
  @Input() artist: Artist;
  @Input() group: string;
  artReleases = []; // ids of releases by this artist which have cover art
  artSrc: string;

  ngOnInit() {
    this.artist.releaseGroups.forEach(rg => {
      rg.releases.forEach(r => {
        if (r.coverArtArchive.front) {
          this.artReleases.push(r.id);
        }
      });
    });
    this.setArtSrc();
  }

  setArtSrc() {
    if (this.artReleases.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.artReleases.length);
      this.artSrc = `${environment.coverArtUrl}/release/${this.artReleases[randomIndex]}/front-500.jpg`;
    } else {
      this.artSrc = `${environment.coverArtUrl}/release-group/${this.artist.releaseGroups[0].releaseGroupId}/front-500.jpg`;
    }
  }

  onImageError() {
    console.log('angular caught the error event');
    this.artSrc = `${environment.amazonURL}/${this.artist.releaseGroups[0].releases[0].asin}`;
  }
}

@Component({
  selector: 'app-release-item',
  templateUrl: './release-item.component.html',
  styleUrls: ['./release-item.component.scss']
})
export class ReleaseItemComponent implements OnInit {
  @Input() release: Release;
  @Input() group: string;
  artURL: string;

  ngOnInit() {
    if (this.release.coverArtArchive.artwork) {
      this.artURL = `${environment.coverArtUrl}/release/${this.release.id}/front-500.jpg`;
    } else if (this.release.asin !== '') {
      this.artURL = `http://images-eu.amazon.com/images/P/${this.release.asin}`;
    } else {
      this.artURL = `${environment.coverArtUrl}/release-group/${this.release.KEXPReleaseGroupMBID}/front-500.jpg`;
    }
  }

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
