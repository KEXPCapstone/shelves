import { OnInit, Component, Input } from '@angular/core';
import { SearchResultsComponent } from './search-results.component';

@Component({
    selector: 'app-result-group-list',
    templateUrl: './result-group-list.html',
    styleUrls: ['./result-group-list.scss']
})
export class ResultGroupListComponent implements OnInit {
    @Input() results: SearchResultsComponent;
    @Input() header: string;

    constructor() {}
    ngOnInit() {}
}
