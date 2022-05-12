
import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsAPIService } from 'src/app/Services/products-api.service';

import { Icart } from 'src/app/View Models/icart';


import{MatDialog}from '@angular/material/dialog'
import { Iproduct } from 'src/app/View Models/iproduct';
import { Store } from 'src/app/View Models/store';
import { PopupComponent } from '../../popup/popup.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
  
})
export class ProductsComponent implements OnInit,OnChanges,OnDestroy {
 
 private subscriptionlist:Subscription[]=[];
  @Output() onclickonAddcart:EventEmitter<Icart>;
  @ViewChild('countvalue') Countinput!:ElementRef;
  countinputvalue:number=0;
  productcount:Number=0;
  newarray:Iproduct[];
  st:Store=new Store();
  //prdlist:Iproduct[];
  @Input() receivedcatogryid:number=1;
  todaydate:number;
  personalID:string;
  creditcard:string;
  ClientName:string="Omnia";
  cartarray:Icart[]=[];
  cart:Icart={} as Icart;
 
  
  istableshown:Boolean=true;
  constructor(private proapiservice:ProductsAPIService,private router:Router,private ProductDialog:MatDialog) { 
    
    this.onclickonAddcart=new EventEmitter<Icart>();
    
    this.newarray=[],
    this.personalID="29810012500301",
    this.creditcard="0000000000000000",
    this.todaydate=Date.now()
    
    
  }

  ngOnInit(): void {
  
   let sub1=( this.proapiservice.getAllproduct().subscribe(prolist=>{this.newarray=prolist}));
   this.subscriptionlist.push(sub1);
    
  }
  ToogleTable(){
    this.istableshown= !this.istableshown;

  }

 
  ngOnChanges(changes: SimpleChanges): void {
   
   
    let sub2= (this.proapiservice.getProductsByCatID(this.receivedcatogryid).subscribe(prolist=>{this.newarray=prolist;
      if(this.newarray.length==0)
      {this.proapiservice.getAllproduct().subscribe(prolist=>{this.newarray=prolist})}
    }));
    this.subscriptionlist.push(sub2);
    
   
  
  }
  
  ADDtocartfunc(count:number,item:Iproduct)
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
      return;
    }
    this.cart={} as Icart;
    this.cart={ProductName:item.name,
      ProductID:item.id,
      Unitprice:item.price, productcount: calculatedproductcount,totalquantityofthisproduct:item.quantity}
    
    this.onclickonAddcart.emit(this.cart);
    
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
     this.newarray.forEach(element => {
       this.proapiservice.prodnumlist[n++]=element.id;
     });
   }
   

}

