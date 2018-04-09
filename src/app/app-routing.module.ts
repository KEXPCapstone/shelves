import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LibraryComponent } from './library/library.component';
import { CategoryComponent } from './category/category.component';
import { ReleaseDetailComponent } from './release-detail/release-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/library', pathMatch: 'full'}, // default route
  {path: 'library', component: LibraryComponent}, // top-level library browse view
  {path: 'library/:category', component: CategoryComponent},  // component for KEXP 'category' sections
  {path: 'library/releases/:releaseId', component: ReleaseDetailComponent} // release detail route (category is implied)
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
