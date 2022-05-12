import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[{path:"Login",component:LoginComponent},

{path:"Register",component:RegisterComponent}]

@NgModule({
  declarations: [
    LoginComponent,
   
    RegisterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
   RouterModule.forChild(routes),
    
  ]
})
export class AuthenModule { }
