import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(private router:Router, private validation:ValidationService, private userService:UserService ) { }

  input = '';

  @ViewChild('ngOtpInput', {static:false}) ngOtpInputRef:any;

  onOtpChange(otp) {
    this.input = otp;
  }

  setVal(val) {
    this.ngOtpInputRef.setValue(val);
  }

  ngOnInit() {
  }

  navigateDashboard(){
    this.router.navigate(['dashboard']);
  }  

  verify(){
    if(this.validation.validateOtp(this.input))
    {
      this.userService.verifyOtp().subscribe(data => 
      {
        if(data["otp"] == this.input)
        {
          alert("Verified successfully");
          localStorage.removeItem('sentotp');
          this.navigateDashboard();
        }
        else
        {
          alert("Incorrect OTP");
        }
      })
    }
  }

}
