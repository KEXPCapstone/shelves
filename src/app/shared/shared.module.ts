import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';

@NgModule({
    declarations: [
    ],
    exports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
        // other shared components/directives etc
    ]
})
export class SharedModule {}
