import { NgModule, Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import {CdkAccordionModule} from '@angular/cdk/accordion';


@Component({
    selector: 'app-browse-sidenav',
    templateUrl: './browse-sidenav.html',
    styleUrls: ['./browse-sidenav.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BrowseSidenavComponent implements OnInit {

    ngOnInit() {
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
