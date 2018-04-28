import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ShelfService } from './shelf.service';
import { LibraryService } from './library.service';
import { AppRoutingModule } from './app-routing.module';
import { LibraryComponent } from './library/library.component';
import { CategoryComponent } from './category/category.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
import { HeaderComponent } from './header/header.component';
import { BrowseModule } from './browse/browse.module';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    CategoryComponent,
    ReleaseDetailComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, // NOTE: this is angular's core browser module, not the shelves feature
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowseModule
  ],
  providers: [ShelfService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
