import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material/material.module';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

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

@NgModule({
  declarations: [
    AppComponent,
    ShelvesComponent,
    ShelfDetailComponent,
    ShelfEditorComponent,
    LibraryComponent,
    CategoryComponent,
    SearchResultsComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}),
    AppRoutingModule,
    MaterialModule
  ],
  providers: [ShelfService, LibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
