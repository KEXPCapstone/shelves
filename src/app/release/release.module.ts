import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ReleaseNotesComponent } from './release-notes/release-notes.component';
import { RelatedReleasesComponent } from './related-releases/related-releases.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
import { MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        ReleaseDetailComponent,
        ReleaseNotesComponent,
        RelatedReleasesComponent
    ],
    imports: [
        SharedModule,
        MatDialogModule,
        FormsModule,
        RouterModule
    ]
})
export class ReleaseModule {}
