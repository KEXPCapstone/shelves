import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowseComponent } from './browse.component';


const browseRoutes: Routes = [
    {path: 'browse', component: BrowseComponent}
];
@NgModule({
    imports: [
        RouterModule.forChild(browseRoutes)
    ],
    exports: [RouterModule]
})
export class BrowseRoutingModule {}
