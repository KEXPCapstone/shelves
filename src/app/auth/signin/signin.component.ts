import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    this.authService.login(form.value.email, form.value.password)
      .subscribe((resp) => {
      }, (error) => {
        if (error.status === 401) {
          this.snackbar.open('Email or password is incorrect', 'OK');
        } else {
          this.snackbar.open('Something went wrong. Please try again.', 'OK');
        }
      }
    );
  }
}
