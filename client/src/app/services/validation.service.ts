import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {
      return true;
    }
      alert("You have entered an invalid email address!");
      return false;
  }


  validateUserSignup(user){
    if(user.email == '')
    {
      alert("Please enter email id");
      return false;
    }
    else if(user.password == '')
    {
      alert("Please enter password");
      return false;
    }
    else if(user.fullName == '')
    {
      alert("Please enter Full Name");
      return false;
    }
    else if(user.location == '')
    {
      alert("Please enter location");
      return false;
    }
    else if(user.agree == false)
    {
      alert("Please select the check box");
      return false;
    }
    else
    {
      return true;
    }
  }


  validateUserSignin(user){
    if(user.email == '')
    {
      alert("Please enter email id");
      return false;
    }
    else if(user.password == '')
    {
      alert("Please enter password");
      return false;
    }
    else
    {
      return true;
    }
  }


  validatePassword(password:string){
    if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password))
    {
      return true;
    }
    else
    {
      alert("Password must be at least 6 characters long and must contain at least one special character and one number");
      return false;
    }
  }


  validateOtp(otp:string){
    if(otp.length < 5)
    {
      alert("Please enter complete OTP");
      return false;
    }
    else
    {
      return true;
    }
  }

}
