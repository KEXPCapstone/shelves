import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// import material components to be used
// TODO: material components can be imported in a separate module, to be imported in app module
import {
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatCardModule,
  MatButtonModule,
  MatTabsModule

} from '@angular/material';



import { AppComponent } from './app.component';
import { ShelvesComponent } from './shelves/shelves.component';
import { ShelfService } from './shelf.service';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { ShelfEditorComponent } from './shelf-editor/shelf-editor.component';


@NgModule({
  declarations: [
    AppComponent,
    ShelvesComponent,
    ShelfDetailComponent,
    ShelfEditorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}),
  ],
  providers: [ShelfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
