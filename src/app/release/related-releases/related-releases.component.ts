import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { LibraryService } from '../../library.service';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Release } from '../../models/release';


@Component({
  selector: 'app-related-releases',
  templateUrl: './related-releases.component.html',
  styleUrls: ['./related-releases.component.scss']
})
export class RelatedReleasesComponent implements OnInit, OnDestroy {
  @Input() release: Release;
  value: string;
  relateds: Release[] = [];
  options = [
    'packaging',
    'country',
    'KEXPReleaseArtistCredit'
  ];
  private _destroyed = new Subject();


  constructor(
    private library: LibraryService,
    private _router: Router
  ) {
    this._router.events.pipe(
      takeUntil(this._destroyed)
    ).subscribe((routerEvent) => {
      if (routerEvent instanceof NavigationEnd) {
        this.getRelatedReleases('KEXPReleaseArtistCredit', this.release.KEXPReleaseArtistCredit);
      }
    });
  }

  ngOnInit() {
    this.getRelatedReleases('KEXPReleaseArtistCredit', this.release.KEXPReleaseArtistCredit);
  }

  onSelectChange(selected: string): void {
    this.getRelatedReleases(selected, this.release[selected]);
  }

  // fetch releases related to the current release based on
  // a field:value pairing
  getRelatedReleases(field: string, value: string): void {
    this.relateds = [];
    // this.library.getRelatedReleases(field, value)
    //   .subscribe((results) => {
    //     const seen = new Map();
    //     results.forEach((result) => {
    //       if (result.KEXPReleaseGroupMBID !== this.release.KEXPReleaseGroupMBID && !seen.has(result.KEXPReleaseGroupMBID)) {
    //         this.relateds.push(result);
    //         seen.set(result.KEXPReleaseGroupMBID, true);
    //       }
    //     });
    //   });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
