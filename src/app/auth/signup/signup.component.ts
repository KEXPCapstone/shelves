import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public invalidNewUser = false;
  public serverError = false;
  private errorMessage = '';


  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  signup(form: NgForm) {
    this.authService.newUser(
      form.value.email,
      form.value.password,
      form.value.passwordConf,
      form.value.firstName,
      form.value.lastName)
      .subscribe((resp) => {
        console.log('created new user');
      }, (error) => {
        if (error.status === 400) {
          this.invalidNewUser = true;
          this.errorMessage = error.error;
        } else {
          this.serverError = true;
          this.errorMessage = 'Something went wrong, please try again.';
        }
      }
    );
  }
}
