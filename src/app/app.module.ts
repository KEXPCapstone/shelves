import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ShelfService } from './shelf.service';
import { LibraryService } from './library.service';
import { NavBarComponent } from './navbar/navbar.component';
import { BrowseModule } from './browse/browse.module';
import { SharedModule } from './shared/shared.module';
import { ReleaseModule } from './release/release.module';
import { ShelvesModule } from './shelves/shelves.module';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth.interceptor';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ReleaseNotesComponent } from './release/release-notes/release-notes.component';
import { NoteService } from './note.service';
import { SHELVES_ROUTES } from './routes';
import { RouterModule } from '@angular/router';
import { BrowseSidenavModule } from './browse-sidenav/browse-sidenav.module';
import { ShelfAddComponent } from './shelf-add/shelf-add.component';
import { SearchService } from './search.service';

@NgModule({
  imports: [
    BrowserModule, // NOTE: this is angular's core browser module, not library browse
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(SHELVES_ROUTES),
    SharedModule,
    BrowseSidenavModule,
    BrowseModule,
    ReleaseModule,
    ShelvesModule,
    FormsModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    NavBarComponent,
    ShelfAddComponent
  ],
  providers: [
    ShelfService,
    LibraryService,
    AuthService,
    NoteService,
    SearchService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
