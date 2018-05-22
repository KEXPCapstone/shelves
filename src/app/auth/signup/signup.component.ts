import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  signup(form: NgForm) {
    this.authService.newUser(
      form.value.email,
      form.value.password,
      form.value.passwordConf,
      form.value.firstName,
      form.value.lastName)
      .subscribe((resp) => {
      }, (error) => {
        if (error.status === 400) {
          this.snackbar.open(error.error.slice(24), 'OK');
        } else {
          this.snackbar.open('Something went wrong, please try again.', 'OK');
        }
      }
    );
  }
}
