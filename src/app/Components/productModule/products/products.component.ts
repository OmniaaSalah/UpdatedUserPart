
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsAPIService } from 'src/app/Services/products-api.service';

import { Icart } from 'src/app/View Models/icart';


import{MatDialog}from '@angular/material/dialog'
import { Iproduct } from 'src/app/View Models/iproduct';
import { Store } from 'src/app/View Models/store';
import { PopupComponent } from '../../popup/popup.component';
import { Icatogry } from 'src/app/View Models/icatogry';
import { CatogryAPIService } from 'src/app/Services/catogry-api.service';
import { UserService } from 'src/app/Services/user.service';
import { CartApiService } from 'src/app/Services/cart-api.service';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
  
})
export class ProductsComponent implements OnInit,OnDestroy {
 
 private subscriptionlist:Subscription[]=[];
  
  countinputvalue:number=0;
  productcount:Number=0;
  
  st:Store=new Store();
  
  todaydate:number;
  personalID:string;
  creditcard:string;
  newarr:Iproduct[];
  cart:Icart={} as Icart;
  Catogrylist:Icatogry[]=[];
  SelectedCatogryID:number=1;
  istableshown:Boolean=true;
  constructor(private proapiservice:ProductsAPIService,private userservice:UserService,private router:Router,private ProductDialog:MatDialog,private catogryapiservice:CatogryAPIService,private cartservice:CartApiService) { 
    
  
    
    this.newarr=this.proapiservice.newarray;
    this.personalID="29810012500301",
    this.creditcard="0000000000000000",
    this.todaydate=Date.now()
    
    
  }

  ngOnInit(): void {
    this.proapiservice.getAllproduct().subscribe(prolist=>{this.proapiservice.newarray=prolist;this.newarr=this.proapiservice.newarray;});
    this.catogryapiservice.getAllproduct().subscribe(catlist=>{this.Catogrylist=catlist});
    
  
    this.cartservice.getCart().subscribe(catlist=>{this.cartservice.cartarray=catlist;});
    
  }
  ToogleTable(){
    this.istableshown= !this.istableshown;

  }

 
  
  select()
  {
    
   
    let sub2= (this.proapiservice.getProductsByCatID(this.SelectedCatogryID).subscribe(prolist=>{this.proapiservice.newarray=prolist;this.newarr=this.proapiservice.newarray;
    
      if(this.newarr.length==0)
      {
        this.proapiservice.getAllproduct().subscribe(prolist=>{this.proapiservice.newarray=prolist;this.newarr=this.proapiservice.newarray;});
      }
    }));
    this.subscriptionlist.push(sub2);
  }
  ADDtocartfunc(count:number,item:Iproduct)
  {
    if(this.userservice.IsUserLogged) 
    {   
      var  calculatedproductcount=0;
      
     
      if((count!=0)&&(item.quantity!=0))
      { 
        if((count>item.quantity))
        {
          calculatedproductcount=item.quantity;
               
        }
        else{
          calculatedproductcount=count;
         }
      }
      else{
        alert("please choose your quantity");
        return;
      }
  
     
     
      this.catogryapiservice.sendcart={} as Icart;
      this.catogryapiservice.sendcart={productName:item.name,
        productID:item.id,
        unitprice:item.price, productcount: calculatedproductcount,totalquantityofthisproduct:item.quantity}
       
        this.updatedata(this.catogryapiservice.sendcart)
      
    }
    else
    {
      alert("please Login First !")
    }
    
 
    
  }
  updatedata(cat:Icart)
  {
    var incresequantityonly=0;
    
    this.cartservice.cartarray.forEach(element => {
    
      if(element.productName==cat.productName)
      {  
         incresequantityonly=1;
        if(element.productcount+cat.productcount<cat.totalquantityofthisproduct)
         {element.productcount+=cat.productcount;
          var lastcount=JSON.parse (localStorage.getItem("countppro")|| "{}")
          this.cartservice.cartcount.next(lastcount+cat.productcount);
          localStorage.setItem("countppro",JSON.stringify(this.cartservice.cartcount.value));
          this.cartservice.Editcart(element,element.productName).subscribe({});
         
         
         }
        

         
      }  
    });

    if(incresequantityonly==0)
    { 
      var lastcount=JSON.parse (localStorage.getItem("countppro")|| "{}")
      this.cartservice.cartcount.next(lastcount+cat.productcount);
      localStorage.setItem("countppro",JSON.stringify(this.cartservice.cartcount.value));
      this.cartservice.AddCart(cat).subscribe(cart=>{});

    }
  


   
    
  }
  PoPUPtheproduct(item :Iproduct)
  {
   
      this.ProductDialog.open(PopupComponent,{data:{img:item.img,name:item.name,price:item.price,quantity:item.quantity}});
     
  }

  openproductdetails(prdid:number)
  {
   
    this.router.navigate(['/Products',prdid]);
  }
  ngOnDestroy():void{
    for(let sub of this.subscriptionlist)
    {
      sub.unsubscribe();
    }
     var n=0;
     this.proapiservice.newarray.forEach(element => {
       this.proapiservice.prodnumlist[n++]=element.id;
     });
   }
   

}

