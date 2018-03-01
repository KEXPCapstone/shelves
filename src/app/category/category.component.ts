import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LibraryService } from '../library.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryName: string;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private location: Location
  ) { }

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('category');
  }

}
