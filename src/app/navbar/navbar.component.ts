import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../search.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  search(form: NgForm) {
    console.log(form.value.search);
    this.router.navigate(['/library/search/' + form.value.search]);
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
