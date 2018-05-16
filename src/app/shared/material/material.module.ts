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
  MatDividerModule,
  MatDialogModule,
  MatChipsModule,
  MatSnackBarModule
} from '@angular/material';
import { ReleaseNotesComponent } from '../../release/release-notes/release-notes.component';
import { ShelfAddComponent } from '../../shelf-add/shelf-add.component';

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
    MatDividerModule,
    MatChipsModule,
    MatSnackBarModule
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
    MatDividerModule,
    MatSnackBarModule,
    MatChipsModule
  ],
  entryComponents: [ReleaseNotesComponent, ShelfAddComponent] // Tells Angular to provide a factory for the notes modal component
})
export class MaterialModule { }
