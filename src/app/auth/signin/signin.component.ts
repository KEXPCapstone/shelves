import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public invalidLoginAttempt = false;
  public serverError = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  login(form: NgForm) {
    console.log(form);
    console.log(form.value.email);
    console.log(form.value.password);
    // this.authService.login()
    this.authService.login(form.value.email, form.value.password)
      .subscribe((resp) => {
        console.log(localStorage.getItem('auth-token'));
      }, (error) => {
        // This is temporary, you will need to update the UI accordingly.
        console.log(error);
        if (error.status === 401) {
          this.invalidLoginAttempt = true;
        } else {
          this.serverError = true;
        }
      }
    );
  }
}
