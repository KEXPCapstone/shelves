import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ShelvesListComponent } from './shelves-list/shelves-list.component';
import { ShelfDetailComponent } from './shelf-detail/shelf-detail.component';
import { ShelfItemComponent } from './shelf-item/shelf-item.component';
import { ShelfPreviewComponent } from './shelf-preview/shelf-preview.component';

@NgModule({
  declarations: [
    ShelvesListComponent, // list of all shelves
    ShelfPreviewComponent, // an item in the list of shelves
    ShelfDetailComponent, // a collection view of a shelf
    ShelfItemComponent // a single item in a shelf (a release)
  ],
  imports: [
    SharedModule
  ]
})
export class ShelvesModule { }
