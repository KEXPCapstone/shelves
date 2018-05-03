import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }


  signup(form: NgForm) {
    this.authService.newUser(form.value.email, form.value.password, form.value.passwordConf, form.value.userName, form.value.firstName, form.value.lastName)
      .subscribe((resp) => {
        console.log("created new user")
        console.log(resp.body)
      }, (error) => {
        console.log(error);  
      }
    );
  }
}
