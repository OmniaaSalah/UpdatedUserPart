import { Component,  OnInit, ViewChild } from '@angular/core';
import { Icatogry } from 'src/app/View Models/icatogry';

import { Icart } from 'src/app/View Models/icart';
import { CatogryAPIService } from 'src/app/Services/catogry-api.service';
import { ProductsAPIService } from 'src/app/Services/products-api.service';
import { ProductsComponent } from '../products/products.component';



@Component({
  selector: 'app-ordercreator',
  templateUrl: './ordercreator.component.html',
  styleUrls: ['./ordercreator.component.scss']
})
export class OrdercreatorComponent implements OnInit {
  @ViewChild(ProductsComponent)productsobj !:ProductsComponent;
  receivepop:number=0;
  SelectedCatogryID:number=1;
  Catogrylist:Icatogry[]=[];
  receivedcart:Icart={}as Icart;
  totalprice:number=0;
  cartarray:Icart[]=[];
  constructor(private catogryapiservice:CatogryAPIService) {
   
   }

  ngOnInit(): void {
  
    this.catogryapiservice.getAllproduct().subscribe(catlist=>{this.Catogrylist=catlist});
  }

  changequantity(){
    if(confirm("Are you sure to Make This Order"))
    {this.productsobj.newarray.forEach(elementchild => {
      this.cartarray.forEach(elementparent => {
        if(elementchild.id==elementparent.ProductID)
        {
          console.log(elementchild.id);
          elementchild.quantity=elementchild.quantity-elementparent.productcount;
        }
      });
    });
    this.totalprice=0;
   this.cartarray=[] as Icart[];
   }
  }
  Removecart(val:number,cartarray:Icart[])
  { 
    var newcartarray:Icart[]=[];
    cartarray.forEach(element => {
      if(element.ProductID!=val)
      {
        newcartarray.push(element);
      }else{
        this.totalprice-=element.productcount*element.Unitprice;
       
      }
      
    });
  
    if(newcartarray)
   { 
     this.cartarray=newcartarray;
   }

  }
  UpdateADDtocartfunc(cat:Icart)
  {
    
    var incresequantityonly=0;
    this.cartarray.forEach(element => {
     
      if(element.ProductID==cat.ProductID )
      {   incresequantityonly=1;
        if(element.productcount+cat.productcount<cat.totalquantityofthisproduct)
         {element.productcount+=cat.productcount;
         
         }
         else{
          this.totalprice-=element.productcount*element.Unitprice;
         }

         
      }
    });
    ``
    if(incresequantityonly==0)
    {this.cartarray.push(cat);}

    this.cartarray.forEach(element => {
      if(element.ProductID==cat.ProductID)
      {
  
        this.totalprice+=element.productcount*element.Unitprice;
      }
    });
  
 }

}