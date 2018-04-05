import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // pass the query along to the search service
  doSearch(query: string) {
    console.log('search query: ' + query);
  }

}
