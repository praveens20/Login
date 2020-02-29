import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private router:Router, private userService:UserService ) { }

  fullName:string = '';
  location:string = '';

  ngOnInit() {
    this.userService.getUserData().subscribe(data => 
      {
        console.log(data["isVerified"]);
        if(data["isVerified"] == false)
        {
          this.navigateVerify();
        }
        else
        {
          this.fullName = data["fullName"];
          this.location = data["location"];
        }
      })
  }

  signout(){
    localStorage.clear();
    this.router.navigate(['signin']);
  }

  navigateVerify(){
    this.router.navigate(['verify']);
  } 

}
