import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material';

@NgModule({
    declarations: [
    ],
    exports: [
        CommonModule,
        MaterialModule,
        MatInputModule
        // other shared components/directives etc
    ]
})
export class SharedModule {}
