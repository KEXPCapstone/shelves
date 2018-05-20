import { Routes } from '@angular/router';
import { ReleaseDetailComponent } from './release/release-detail/release-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ArtistListComponent,
    LabelListComponent, ArtistComponent, LabelComponent } from './browse/browse.module';
import { BrowseSidenavComponent } from './browse-sidenav/browse-sidenav.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ShelvesListComponent } from './shelves/shelves.module';
import { ShelfDetailComponent } from './shelves/shelf-detail/shelf-detail.component';

export const SHELVES_ROUTES: Routes = [
    {path: '', redirectTo: '/browse/artists/a', pathMatch: 'full'}, // default route redirect
    {path: 'library', redirectTo: '/browse', pathMatch: 'full'}, // home page
    {
        path: 'browse',
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
                        component: ArtistListComponent,
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
                        component: LabelListComponent,
                    },
                    {
                        path: ':groupId/:labelId',
                        component: LabelComponent
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
            {path: 'shelf/:shelfId', component: ShelfDetailComponent}
        ],
    },
    // {path: 'shelves', component: ShelvesListComponent}, // shelves feature module
    {path: 'library/search/:query', component: SearchResultsComponent},
    {path: 'login', component: SigninComponent}, // sign in page
    {path: 'signup', component: SignupComponent},
    {path: '**', redirectTo: ''}
];
