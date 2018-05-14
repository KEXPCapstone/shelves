import { NgModule, OnDestroy} from '@angular/core';
import { RouterModule, ActivatedRoute, Router, Params } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LibraryService } from '../library.service';
import { Release } from '../release';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-browse',
    templateUrl: './browse.component.html',
    styleUrls: ['./browse.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class BrowseComponent implements OnInit, OnDestroy {
    artists: any[];
    maxItems = 200; // maximum number of items to pull from the API
    private _destroyed = new Subject();

    constructor(
      private libraryService: LibraryService,
      private _route: ActivatedRoute,
      private _router: Router
    ) {
    // Listen to changes on the current route for the doc id (e.g. button/checkbox) and the
    // parent route for the section (material/cdk).
    combineLatest(_route.params, _route.parent.params).pipe(
      map((p: [Params, Params]) => ({group: p[0]['groupId'], category: p[1]['categoryId']})),
      takeUntil(this._destroyed)
      ).subscribe(p => {
        this.getBrowseItems(p.category, p.group);
      });
    }

    ngOnInit() {
      // parse the route and get browse items based on that route
      const category = this._route.snapshot.paramMap.get('categoryId');
      const group = this._route.snapshot.paramMap.get('groupId');
      this.libraryService.getArtists(group, this.maxItems).subscribe(
         artists => this.artists = artists
      );
    }

    getBrowseItems(category: string, group: string) {
      switch (category) {
        case 'artists': {
          this.libraryService.getArtists(group, this.maxItems).subscribe(
            artists => this.artists = artists
          );
          break;
        }
        case 'labels': {
          break;
        }
        case 'decades': {
          break;
        }
      }
    }

    ngOnDestroy(): void {
      this._destroyed.next();
    }
}

@NgModule({
    declarations: [
        BrowseComponent // the root of browse feature
    ],
    imports: [
        SharedModule,
        RouterModule,
    ]
})
export class BrowseModule {}
