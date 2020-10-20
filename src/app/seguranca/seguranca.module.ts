import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JwtModule } from "@auth0/angular-jwt";

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';


import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './auth.guard';
import { LogoutService } from './logout.service';

import { environment } from 'src/environments/environment.prod';  //<--- assim que estava
//import { environment } from './../../environments/environment.prod';


export function tokenGetter() {
  return localStorage.getItem('token')
}

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.tokenWhitelistedDomains,
        blacklistedRoutes: environment.tokenBlacklistedRoutes
      }
    })
  ],
  providers: [
    AuthGuard,
    LogoutService
 ]
})

export class SegurancaModule { }
