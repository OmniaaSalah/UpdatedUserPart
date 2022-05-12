import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { EmptyLayoutComponent } from './empty-layout/empty-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NotFoundLayoutComponent } from './not-found-layout/not-found-layout.component';
import { MatDialogModule } from '@angular/material/dialog';


const routes: Routes = [
  {path:'',component:MainLayoutComponent,children:[
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'Basic',loadChildren:()=>import('src/app/Components/basic/basic.module').then(m=>m.BasicModule)},
  {path:'Products',loadChildren:()=>import('src/app/Components/productModule/product.module').then(m=>m.ProductModule)}
 


]},
    {path:'',component:NotFoundLayoutComponent,children:[
    {path:'Authen',loadChildren:()=>import('src/app/Components/authen/authen.module').then(m=>m.AuthenModule)},
    {path:'Home',component:HomeComponent},
    {path:'**',component:NotFoundComponent}]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), BrowserModule, MatDialogModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
