import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ReleaseSearchResult } from '../models/release';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  results: ReleaseSearchResult[];
  maxResults = 200;
  noResults: boolean;
  query: string;

  trackMatches: ReleaseSearchResult[];
  titleMatches: ReleaseSearchResult[];
  artistMatches: ReleaseSearchResult[];

  private _destroyed = new Subject();


  constructor(
    private searchService: SearchService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._router.events.pipe(
      takeUntil(this._destroyed)
    ).subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.getResults();
      }
    });
  }

  ngOnInit() { }

  getResults() {
    this.query = this._route.snapshot.queryParamMap.get('q');
    this.searchService.getSearchResults(this.query, this.maxResults)
    .subscribe((results) => {
      const releaseGroupIDs = new Map();
      this.results = [];
      this.trackMatches = [];
      this.titleMatches = [];
      this.artistMatches = [];
      results.forEach((result) => {
        if (!releaseGroupIDs.has(result.release.KEXPReleaseGroupMBID)) {
          this.results.push(result);
          releaseGroupIDs.set(result.release.KEXPReleaseGroupMBID, true);
          switch (result.indexInfo.fieldMatchedOn) {
            case 'Track Title': {
              this.trackMatches.push(result);
              break;
            }
            case 'Title': {
              this.titleMatches.push(result);
              break;
            }
            case 'KEXPReleaseArtistCredit': {
              this.artistMatches.push(result);
              break;
            }
          }
        }
      });
      this.noResults = (this.results.length === 0);
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
