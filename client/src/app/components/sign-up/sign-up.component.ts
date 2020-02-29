import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( private router:Router, private validation:ValidationService, private userService:UserService ) { }

  email:string = '';
  password:string = '';
  fullName:string = '';
  location:string = '';
  agree:boolean = false;

  ngOnInit() {
    this.userService.ifToken();
  }

  navigateVerify(){
    this.router.navigate(['verify']);
  }  
  
  navigateSignin(){
    this.router.navigate(['signin']);
  } 

  signup(){
    const newUser = {
      email: this.email.trim(),
      password: this.password,
      fullName: this.fullName.toLowerCase().trim(),
      location: this.location.toLowerCase().trim(),
      agree:this.agree
    }
    if(this.validation.validateUserSignup(newUser) && this.validation.validateEmail(this.email) && this.validation.validatePassword(this.password))
    {
      this.userService.addUser(newUser).subscribe((user) => 
        {
          alert(JSON.stringify(user.msg));
          if(user.msg!="Email already exist")
          {
            localStorage.setItem('token', user.token);
            this.userService.sendOtp(newUser).subscribe(res=> console.log(res));
            this.navigateVerify();     
          }
        });
    }
  }

}
