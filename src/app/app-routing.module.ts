import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibraryComponent } from './library/library.component';
import { CategoryComponent } from './category/category.component';
import { ReleaseDetailComponent } from './release/release-detail/release-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: '/library', pathMatch: 'full'}, // default route redirect
  {path: 'library', component: LibraryComponent}, // home page
  {path: 'shelves', component: LibraryComponent}, // shelves feature module
  {path: 'library/releases/:releaseId', component: ReleaseDetailComponent}, // release detail route
  {path: 'login', component: SigninComponent}, // sign in page
  {path: 'signup', component: SignupComponent}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
