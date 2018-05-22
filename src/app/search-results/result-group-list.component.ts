import { OnInit, Component, Input } from '@angular/core';
import { SearchResultsComponent } from './search-results.component';
import { Release } from '../models/release';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-result-group-list',
    templateUrl: './result-group-list.html',
    styleUrls: ['./result-group-list.scss']
})
export class ResultGroupListComponent implements OnInit {
    @Input() results: SearchResultsComponent;
    @Input() header: string;
    @Input() type: string;

    constructor() {}
    ngOnInit() {}

    getArt(release: Release) {
        if (release.coverArtArchive.artwork) {
          return `${environment.coverArtUrl}/release/${release.id}/front-500.jpg`;
        } else {
          return `${environment.coverArtUrl}/release-group/${release.KEXPReleaseGroupMBID}/front-500.jpg`;
        }
      }
}
