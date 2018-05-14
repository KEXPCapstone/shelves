import { Routes } from '@angular/router';
import { ReleaseDetailComponent } from './release/release-detail/release-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowseComponent } from './browse/browse.module';
import { BrowseSidenavComponent } from './browse-sidenav/browse-sidenav.module';
import { ShelvesListComponent } from './shelves/shelves-list/shelves-list.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const SHELVES_ROUTES: Routes = [
    {path: '', redirectTo: '/browse', pathMatch: 'full'}, // default route redirect
    {path: 'library', redirectTo: '/browse', pathMatch: 'full'}, // home page
    {
        path: 'browse',
        component: BrowseSidenavComponent,
        children: [
            {path: '', redirectTo: 'artists', pathMatch: 'full'}, // default to artists
            {
                path: ':categoryId', // artists, genres, decades, etc
                children: [
                    {
                        path: '', redirectTo: 'a', pathMatch: 'full'
                    },
                    {
                        path: ':groupId',
                        component: BrowseComponent
                    }
                ]
            }
        ],
    },
    {path: 'shelves', component: ShelvesListComponent}, // shelves feature module
    {path: 'library/releases/:releaseId', component: ReleaseDetailComponent}, // release detail route
    {path: 'library/search/:query', component: SearchResultsComponent},
    {path: 'login', component: SigninComponent}, // sign in page
    {path: 'signup', component: SignupComponent},
    {path: '**', redirectTo: ''}
];
