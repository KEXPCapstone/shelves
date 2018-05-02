import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShelfService } from './shelf.service';
import { LibraryService } from './library.service';
import { AppRoutingModule } from './app-routing.module';
import { LibraryComponent } from './library/library.component';
import { CategoryComponent } from './category/category.component';
import { HeaderComponent } from './header/header.component';
import { BrowseModule } from './browse/browse.module';
import { SharedModule } from './shared/shared.module';
import { ReleaseModule } from './release/release.module';
import { ShelvesModule } from './shelves/shelves.module';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    CategoryComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule, // NOTE: this is angular's core browser module, not library browse
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowseModule,
    ReleaseModule,
    ShelvesModule,
    FormsModule
  ],
  providers: [ShelfService, LibraryService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
