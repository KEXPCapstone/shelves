import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent implements OnInit {
  private isAuthenticated;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.checkAuth();
  }

  logout() {
    this.authService.logout()
      .subscribe(_ => {
        console.log('signed out');
        this.isAuthenticated = false;
      }, (error) => {
        console.log(error);
      }
    );
  }

  checkAuth() {
    this.authService.getCurrUser()
      .subscribe((resp) => {
        console.log(resp);
        this.isAuthenticated = true;
      }, (error) => {
        this.isAuthenticated = false;
      }
    );
  }

}
