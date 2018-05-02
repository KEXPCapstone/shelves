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
        if (!resp.ok) {
          console.log("Invalid!!!!")
        }
        
        console.log(resp)
        // console.log(resp.headers.get('Authorization'))
        // localStorage.setItem("authToken", resp.headers.get('Authorization'))
        this.authService.setToken(resp.headers.get('Authorization'))
        console.log(localStorage.getItem("authToken"))
      }, (error) => {
        // console.log("INVALID")
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
