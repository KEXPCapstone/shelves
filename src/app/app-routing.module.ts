import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibraryComponent } from './library/library.component';
import { CategoryComponent } from './category/category.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/library', pathMatch: 'full'}, // default route redirect
  {path: 'library', component: LibraryComponent}, // home page
  {path: 'shelves', component: LibraryComponent}, // shelves feature module
  {path: 'library/releases/:releaseId', component: ReleaseDetailComponent} // release detail route
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
