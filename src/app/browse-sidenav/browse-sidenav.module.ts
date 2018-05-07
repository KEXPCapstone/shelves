import { NgModule, Component, ViewEncapsulation, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {CdkAccordionModule} from '@angular/cdk/accordion';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
    selector: 'app-browse-sidenav',
    templateUrl: './browse-sidenav.html',
    styleUrls: ['./browse-sidenav.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BrowseSidenavComponent implements OnInit {
    private mediaMatcher: MediaQueryList = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px`);

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                zone: NgZone) {
        this.mediaMatcher.addListener(mql => zone.run(() => this.mediaMatcher = mql));
    }

    @ViewChild(MatSidenav) sidenav: MatSidenav;

    ngOnInit() {
        this._router.events.subscribe((() => {
            if (this.isScreenSmall()) {
                this.sidenav.close();
            }
        }));
    }

    isScreenSmall(): boolean {
        return this.mediaMatcher.matches;
    }
}

@Component({
    selector: 'app-browse-nav',
    templateUrl: './browse-nav.component.html'
})
export class BrowseNavComponent implements OnInit {
    browseCategories = [
        'Artists',
        'Decades',
        'Genres',
    ];
    ngOnInit() {
    }
}

@NgModule({
    imports: [
        MatSidenavModule,
        RouterModule,
        SharedModule,
        CdkAccordionModule
    ],
    exports: [BrowseSidenavComponent],
    declarations: [BrowseSidenavComponent, BrowseNavComponent]
})
export class BrowseSidenavModule {}
