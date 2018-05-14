import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { ReleaseSearchResult } from '../release';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  results: ReleaseSearchResult[];
  maxResults = 200;

  constructor(
    private searchService: SearchService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    const query = this._route.snapshot.paramMap.get('query');
    // .subscribe(results => this.results = results);
    this.searchService.getSearchResults(query, this.maxResults)
      .subscribe((results) => {
        console.log(results);
        this.results = results;
      });
  }
}
