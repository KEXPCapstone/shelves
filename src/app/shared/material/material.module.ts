import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule,
  MatGridListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatDividerModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
