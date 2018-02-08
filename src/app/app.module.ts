import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import material components to be used
// TODO: material components can be imported in a separate module, to be imported in app module
import { MatSidenavModule, MatToolbarModule, MatListModule, MatCardModule} from '@angular/material';



import { AppComponent } from './app.component';
import { ShelvesComponent } from './shelves/shelves.component';
import { ShelfService } from './shelf.service';


@NgModule({
  declarations: [
    AppComponent,
    ShelvesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  providers: [ShelfService],
  bootstrap: [AppComponent]
})
export class AppModule { }
