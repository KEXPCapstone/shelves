import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { SearchService } from '../search.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  search(form: NgForm) {
    console.log(form.value.search);
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
