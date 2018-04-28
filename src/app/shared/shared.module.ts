import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

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
