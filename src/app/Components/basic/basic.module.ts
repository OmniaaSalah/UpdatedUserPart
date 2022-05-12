import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes:Routes=[{path:"AboutUs",component:AboutUsComponent},
{path:"ContactUs",component:ContactUsComponent},
{path:'',redirectTo:'/Home',pathMatch:'full'}]



@NgModule({
  declarations: [ContactUsComponent,
    AboutUsComponent
   ],
  imports: [
    CommonModule,
    
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class BasicModule { }
