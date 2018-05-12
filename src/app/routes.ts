import { Routes } from '@angular/router';
import { ReleaseDetailComponent } from './release/release-detail/release-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowseComponent } from './browse/browse.component';
import { BrowseSidenavComponent } from './browse-sidenav/browse-sidenav.module';
import { ShelvesListComponent } from './shelves/shelves-list/shelves-list.component';

export const SHELVES_ROUTES: Routes = [
    {path: '', redirectTo: '/library', pathMatch: 'full'}, // default route redirect
    {path: 'library', redirectTo: '/browse', pathMatch: 'full'}, // home page
    {
        path: 'browse',
        component: BrowseSidenavComponent,
        children: [
            {path: '', redirectTo: 'artists', pathMatch: 'full'},
            {
                path: ':id',
                component: BrowseComponent
            }
        ],
    },
    {path: 'shelves', component: ShelvesListComponent}, // shelves feature module
    {path: 'library/releases/:releaseId', component: ReleaseDetailComponent}, // release detail route
    {path: 'login', component: SigninComponent}, // sign in page
    {path: 'signup', component: SignupComponent},
    {path: '**', redirectTo: ''}
];
