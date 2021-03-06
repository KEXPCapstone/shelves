import { Routes } from '@angular/router';
import { ReleaseDetailComponent } from './release/release-detail/release-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import {
    ArtistComponent, LabelComponent, BrowseListComponent } from './browse/browse.module';
import { BrowseSidenavComponent } from './browse-sidenav/browse-sidenav.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ShelvesListComponent } from './shelves/shelves.module';
import { ShelfDetailComponent } from './shelves/shelf-detail/shelf-detail.component';

export const SHELVES_ROUTES: Routes = [
    {path: '', redirectTo: '/library/shelves/all', pathMatch: 'full'}, // default route redirect
    {
        path: 'library',
        component: BrowseSidenavComponent,
        children: [
            {path: '', redirectTo: 'artists', pathMatch: 'full'}, // default to artists
            {path: 'releases/:releaseId', component: ReleaseDetailComponent}, // release detail route
            {
                path: 'artists',
                children: [
                    {
                        path: '', redirectTo: 'a', pathMatch: 'full'
                    },
                    {
                        path: ':groupId',
                        component: BrowseListComponent,
                    },
                    {
                        path: ':groupId/:artistId',
                        component: ArtistComponent
                    }
                ]
            },
            {
                path: 'labels',
                children: [
                    {
                        path: '', redirectTo: 'a', pathMatch: 'full'
                    },
                    {
                        path: ':groupId',
                        component: BrowseListComponent,
                    },
                    {
                        path: ':groupId/:labelId',
                        component: LabelComponent
                    }
                ]
            },
            {
                path: 'genres',
                children: [
                    {
                        path: '', redirectTo: 'rock-pop', pathMatch: 'full'
                    },
                    {
                        path: ':groupId',
                        component: BrowseListComponent
                    }
                ]
            },
            {
                path: 'shelves',
                children: [
                    {
                        path: '', redirectTo: 'all', pathMatch: 'full'
                    },
                    {
                        path: ':groupId',
                        component: ShelvesListComponent
                    },
                    // {
                    //     path: ':groupId/:shelfId',
                    //     component: Shelf
                    // }
                ]
            },
            { path: 'search', component: SearchResultsComponent},
            { path: 'shelf/:shelfId', component: ShelfDetailComponent }
        ],
    },
    {path: 'login', component: SigninComponent}, // sign in page
    {path: 'signup', component: SignupComponent},
    {path: '**', redirectTo: 'library/artists/a'} // invalid route catchall (probably should go to 'homepage')
];
