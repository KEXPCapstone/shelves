import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { ReleaseSearchResult } from '../release';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  results: ReleaseSearchResult[];
  maxResults = 200;
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
        console.log(routerEvent);
        this.getResults();
      }
    });
  }

  ngOnInit() { }

  getResults() {
    const query = this._route.snapshot.paramMap.get('query');
    // .subscribe(results => this.results = results);
    this.searchService.getSearchResults(query, this.maxResults)
      .subscribe((results) => {
        console.log(results);
        this.results = results;
      });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
