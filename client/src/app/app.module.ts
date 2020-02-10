import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgOtpInputModule } from  'ng-otp-input';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyComponent } from './components/verify/verify.component';
import { InterestComponent } from './components/interest/interest.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ValidationService } from './services/validation.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth.guard';

//Routes for navigation
const routes:Routes = [
  {path:'',                 redirectTo:'signin',           pathMatch:'full'},
  {path:'signin',           component:SignInComponent},
  {path:'signup',           component:SignUpComponent},
  {path:'verify',           component:VerifyComponent,               canActivate:[AuthGuard]},
  {path:'interest',         component:InterestComponent,            },
  {path:'dashboard',        component:DashboardComponent,            canActivate:[AuthGuard]},
  {path:'**',               redirectTo:'signin'}
]

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    VerifyComponent,
    InterestComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, CommonModule, FormsModule, RouterModule.forRoot(routes), HttpClientModule, NgOtpInputModule
  ],
  providers: [ValidationService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
