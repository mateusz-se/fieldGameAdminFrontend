import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LoginComponent } from './login.component';
import { RegisterComponent } from '../register/register.component';
import { AlertComponent } from '../_directives/index';
import { AuthGuard } from '../_guards/auth.guard';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { LoginRoutingModule } from './login-routing.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginRoutingModule,
    MaterialModule
  ],
  providers: [
   AuthGuard,
   AlertService,
   AuthenticationService,
   UserService
  ],
  bootstrap: [LoginComponent]
})
export class LoginModule { }
