import { Component, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'shelves';
  constructor(router: Router) {

    router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((data: NavigationEnd) => {
        // We want to reset the scroll position on navigation
          resetAllScrollPositions();
      });
  }
}

function resetAllScrollPositions() {
  if (typeof document === 'object' && document) {
    const virtualScroll = document.querySelector('virtual-scroll');
    const searchScroll = document.querySelector('app-search-results');
    if (virtualScroll) {
      virtualScroll.scrollTop = 0;
    }
    if (searchScroll) {
      searchScroll.scrollTop = 0;
    }
  }
}
