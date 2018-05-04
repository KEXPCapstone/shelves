import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Release } from '../release';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {
  artists: any[];
  artistsPerPage = 200;
  startLetter = 'A';
  throttle = 50;
  scrollDistance = 5;
  scrollUpDistance = 2;

  constructor(
    private libraryService: LibraryService
  ) { }

  ngOnInit() {
    this.libraryService.getArtists(this.startLetter, this.artistsPerPage).subscribe(
      artists => this.artists = artists
    );
  }

  onScrollDown() {
    console.log('scrolled down');
    this.fetchNewArtists();
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
