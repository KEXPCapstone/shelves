import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log(form)
    console.log(form.value.email)
    console.log(form.value.password)
    // this.authService.login()
    this.authService.login(form.value.email, form.value.password)
      .subscribe((resp) => {        
        if (resp.ok) { // double checking
          // redirect user to the library
        }
        console.log(localStorage.getItem("authToken"))
      }, (error) => {
        // This is temporary, you will need to update the UI accordingly.
        console.log(error)
        if (error.status == 401) {
          window.alert("Invalid Credentials")
        } else {
          window.alert("Server error")
        }
      }
    );  
  }
}
