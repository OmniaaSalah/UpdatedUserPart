import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';


import { PopupComponent } from '../popup/popup.component';
import { FormsModule } from '@angular/forms';


import { OrdercreatorComponent } from './ordercreator/ordercreator.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

const routes:Routes=[
{path:"Order",component:OrdercreatorComponent},
{path:":pID",component:ProductDetailsComponent},

{path:'',component:ProductsComponent}]

@NgModule({
  declarations: [
    ProductsComponent,
   ProductDetailsComponent,
   
    PopupComponent,
   OrdercreatorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
   
    
  
    
    
  ]
})
export class ProductModule { }
