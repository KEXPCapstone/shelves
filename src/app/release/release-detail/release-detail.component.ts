import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { LibraryService } from '../../library.service';
import { Release } from '../../release';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.css']
})
export class ReleaseDetailComponent implements OnInit {
  @Input() release: Release;

  constructor(
    private route: ActivatedRoute,
    private libraryService: LibraryService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getRelease();
  }

  getRelease(): void {
    const id = this.route.snapshot.paramMap.get('releaseId');
    this.libraryService.getReleaseById(id)
      .subscribe(release => this.release = release);
  }

  getArtForRelease(): void {

  }

  // useful to implement 'back' button
  goBack(): void {
    this.location.back();
  }
}
