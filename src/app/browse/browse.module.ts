import { NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LibraryService } from '../library.service';
import { Release } from '../release';

@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class BrowseComponent implements OnInit {
    artists: any[];
    artistsPerPage = 200;
    startLetter = 'A';

    constructor(
      private libraryService: LibraryService
    ) { }

    ngOnInit() {
      this.libraryService.getArtists(this.startLetter, this.artistsPerPage).subscribe(
        artists => this.artists = artists
      );
    }

    fetchNewArtists() {
      const lastArtistName = this.artists[this.artists.length - 1].name;
      this.libraryService.getArtists(lastArtistName, this.artistsPerPage).subscribe(
        artists => this.artists = this.artists.concat(artists)
      );
    }

    onScrollUp() {
      console.log('scrolled up');
    }
}

@NgModule({
    declarations: [
        BrowseComponent // the root of browse feature
    ],
    imports: [
        SharedModule,
        RouterModule,
    ]
})
export class BrowseModule {}
