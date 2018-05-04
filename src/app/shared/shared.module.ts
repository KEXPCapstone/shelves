import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material';

@NgModule({
    declarations: [
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule,
        MatInputModule
        // other shared components/directives etc
    ]
})
export class SharedModule {}
