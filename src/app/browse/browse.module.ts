import { NgModule} from '@angular/core';

import { BrowseComponent } from './browse.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


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
