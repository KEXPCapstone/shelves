import { Input, Component, OnInit, OnDestroy } from '@angular/core';
import { Release } from '../../release';
import { LibraryService } from '../../library.service';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-related-releases',
  templateUrl: './related-releases.component.html',
  styleUrls: ['./related-releases.component.scss']
})
export class RelatedReleasesComponent implements OnInit, OnDestroy {
  @Input() release: Release;
  value: string;
  relateds: Release[];
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
    this.library.getRelatedReleases(field, value)
      .subscribe(relateds => this.relateds = relateds.filter(
        related => related.KEXPReleaseGroupMBID !== this.release.KEXPReleaseGroupMBID
      ));
  }

  ngOnDestroy(): void {
    this._destroyed.next();
  }
}
