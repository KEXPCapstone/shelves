import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public searchService: SearchService
  ) { }

  ngOnInit() {
  }

  releaseSearch() {
    this.searchService.getSearchResults('test', 200)
      .subscribe( (results) => {
        console.log('got results!');
        console.log(results);
      }, (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.authService.logout()
      .subscribe(_ => {
        console.log('signed out');
      }, (error) => {
        console.log(error);
      }
    );
  }

}
