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
    return this.http.post("http://localhost:3000/saveUser", user).pipe(map((response:any) => response))
  }

  authenticateUser(user){
    return this.http.post("http://localhost:3000/authenticate" , user).pipe(map((response:any) => response))
  }

  getUserData(){
    return this.http.get("http://localhost:3000/getProfile",
    { params: new HttpParams().append('token', localStorage.getItem('token'))})
  }

  sendOtp(user){
    return this.http.post("http://localhost:3000/sendotp" , user).pipe(map((response:any) => response))
  }

  verifyOtp(){
    return this.http.get("http://localhost:3000/fetchotp",
    { params: new HttpParams().append('token', localStorage.getItem('token'))})
  }

  verifyUser(data){
    return this.http.patch("http://localhost:3000/verified",data).pipe(map((response:any) => response))
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

  ifToken(){
   if(this.isLoggedIn())
    {
      this.router.navigate(['verify']);
      return;
    }   
  } 

 
  
}
