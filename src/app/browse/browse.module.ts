import { NgModule} from '@angular/core';

import { BrowseListComponent } from './browse-list/browse-list.component';
import { BrowseGroupComponent } from './browse-group/browse-group.component';
import { BrowseComponent } from './browse.component';
import { BrowseRoutingModule } from './browse-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [
        BrowseComponent, // the root of browse feature
        BrowseListComponent, // the overall list, toggles grouping and sorting
        BrowseGroupComponent
    ],
    imports: [
        SharedModule,
        BrowseRoutingModule,
    ]
})
export class BrowseModule {}
