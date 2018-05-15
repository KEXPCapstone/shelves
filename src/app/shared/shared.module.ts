import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material';
import { FallbackDirective } from './fallback.directive';

@NgModule({
    declarations: [
        FallbackDirective
    ],
    exports: [
        CommonModule,
        MaterialModule,
        MatInputModule,
        FallbackDirective
        // other shared components/directives etc
    ]
})
export class SharedModule {}
