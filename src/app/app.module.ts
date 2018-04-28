import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ShelvesComponent } from './shelves/shelves.component';
import { ShelfService } from './shelf.service';
import { LibraryService } from './library.service';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { ShelfEditorComponent } from './shelf-editor/shelf-editor.component';
import { AppRoutingModule } from './app-routing.module';
import { LibraryComponent } from './library/library.component';
import { CategoryComponent } from './category/category.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShelvesComponent,
    ShelfDetailComponent,
    ShelfEditorComponent,
    LibraryComponent,
    CategoryComponent,
    SearchResultsComponent,
    SearchBoxComponent,
    ReleaseDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [ShelfService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
