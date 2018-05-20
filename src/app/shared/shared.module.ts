import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material';
import { ShelfPreviewComponent } from '../shelves/shelf-preview/shelf-preview.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ShelfPreviewComponent // declared here since needs to be used at two lower levels (AppModule and ShelvesModule)
    ],
    imports: [
        RouterModule, // required here because of ShelfPreviewComponent
        BrowserModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        MatInputModule,
        ShelfPreviewComponent
        // other shared components/directives etc
    ]
})
export class SharedModule {}
