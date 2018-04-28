import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowseListComponent } from './browse-list/browse-list.component';
import { BrowseGroupComponent } from './browse-group/browse-group.component';
import { BrowseComponent } from './browse.component';
import { BrowseRoutingModule } from './browse-routing.module';


@NgModule({
    declarations: [
        BrowseListComponent, // the overall list, toggles grouping and sorting
        BrowseGroupComponent, BrowseComponent // a supgroup in the browse list (ie. artist group 'A')
    ],
    imports: [
        CommonModule,
        BrowseRoutingModule
    ]
})
export class BrowseModule {}
