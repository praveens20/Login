import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor( private router:Router, private validation:ValidationService, private userService:UserService ) { }

  email:string = '';
  password:string = '';

  ngOnInit() {
    this.userService.ifToken();
  }

  signin(){
    const user = {
      email: this.email,
      password: this.password
    }
    if(this.validation.validateUserSignin(user) && this.validation.validateEmail(this.email))
    {
      this.userService.authenticateUser(user).subscribe((data) => 
        {
          if(data.msg=="Password matched")
          {
            localStorage.setItem('token',data.token);
            this.navigateVerify();
          }
          else
          {
            alert(JSON.stringify(data.msg));
          }
        })
    }
  }

  navigateSignup(){
    this.router.navigate(['signup']);
  }  

  navigateVerify(){
    this.router.navigate(['verify']);
  } 

}
