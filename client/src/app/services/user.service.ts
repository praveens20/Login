import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http:HttpClient, private router:Router ) { }

  addUser(user){
    return this.http.post("http://localhost:3000/user", user).pipe(
      map((response:any) => response))
  }

  authenticateUser(user){
    return this.http.post("http://localhost:3000/authenticate" , user).pipe(
      map((response:any) => response))
  }

  getUserData(){
    return this.http.get("http://localhost:3000/profile",
    { params: new HttpParams().append('token', localStorage.getItem('token'))})
  }

  sendOtp(user){
    return this.http.post("http://localhost:3000/otp" , user).pipe(
      map((response:any) => response))
  }

  verifyOtp(){
    return this.http.get("http://localhost:3000/otp",
    { params: new HttpParams().append('otp', localStorage.getItem('sentotp'))})
  }

  isLoggedIn(){
    if(localStorage.getItem('token'))
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  isVerified(){
    if(localStorage.getItem('sentotp'))
    {
      return false;
    }
    else
    {
      return true;
    }
  }

  ifToken(){
    if(this.isLoggedIn() && this.isVerified())
    {
      this.router.navigate(['dashboard']);
      return;
    }
    else if(this.isLoggedIn())
    {
      this.router.navigate(['verify']);
      return;
    }   
  } 
  
}
