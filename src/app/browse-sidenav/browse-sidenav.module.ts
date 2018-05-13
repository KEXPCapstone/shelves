import { NgModule, Component, ViewEncapsulation, OnInit, NgZone, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav, MatIconModule } from '@angular/material';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import {trigger, animate, state, style, transition} from '@angular/animations';
import { CdkAccordionModule } from '@angular/cdk/accordion';

import { SharedModule } from '../shared/shared.module';

import { BROWSE_NAV_ITEMS } from './browse-nav-items';

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
    templateUrl: './browse-nav.component.html',
    animations: [
        trigger('bodyExpansion', [
          state('collapsed', style({height: '0px', display: 'none'})),
          state('expanded', style({height: '*', display: 'block'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
        ]),
    ]
})
export class BrowseNavComponent implements OnInit {
    browseCategories = BROWSE_NAV_ITEMS;

    ngOnInit() {
    }
}

@NgModule({
    imports: [
        MatSidenavModule,
        RouterModule,
        SharedModule,
        MatIconModule,
        CdkAccordionModule
    ],
    exports: [BrowseSidenavComponent],
    declarations: [BrowseSidenavComponent, BrowseNavComponent]
})
export class BrowseSidenavModule {}
