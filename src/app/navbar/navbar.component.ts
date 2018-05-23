import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../search.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon(
      'search',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/baseline-search-24px.svg')
    );
  }

  ngOnInit() {
  }

  search(form: NgForm) {
    this.router.navigate(['/library/search'], { queryParams: { q: form.value.search } });
    form.reset();
  }

  logout() {
    this.authService.logout()
      .subscribe(_ => {
      }, (error) => {
        console.log(error);
      }
    );
  }
}
