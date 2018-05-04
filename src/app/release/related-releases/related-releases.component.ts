import { Input, Component, OnInit } from '@angular/core';
import { Release } from '../../release';
import { LibraryService } from '../../library.service';


@Component({
  selector: 'app-related-releases',
  templateUrl: './related-releases.component.html',
  styleUrls: ['./related-releases.component.scss']
})
export class RelatedReleasesComponent implements OnInit {
  @Input() release: Release;
  value: string;
  relateds: Release[];
  options = [
    'packaging',
    'country',
    'KEXPReleaseArtistCredit'
  ];

  constructor(private library: LibraryService) { }

  ngOnInit() {
    this.getRelatedReleases('KEXPReleaseArtistCredit', this.release.KEXPReleaseArtistCredit);
  }

  onSelectChange(selected: string): void {
    this.getRelatedReleases(selected, this.release[selected]);
  }

  // fetch releases related to the current release based on
  // a field:value pairing
  getRelatedReleases(field: string, value: string): void {
    this.library.getRelatedReleases(field, value)
      .subscribe(relateds => this.relateds = relateds.filter(
        related => related.KEXPReleaseGroupMBID !== this.release.KEXPReleaseGroupMBID
      ));
  }
}
