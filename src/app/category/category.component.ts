import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LibraryService } from '../library.service';

import { Release } from '../release';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryName: string;
  releases: Release[];

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('category');
    // load releases in this category
    this.getReleasesInCategory();
  }

  // fetch the releases in this category from the library service
  getReleasesInCategory(): void {
    this.libraryService.getRelatedReleases('KEXPPrimaryGenre', this.categoryName)
      .subscribe(releases => this.releases = releases);
  }

}
