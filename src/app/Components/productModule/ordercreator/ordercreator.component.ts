import { Component,  OnInit, ViewChild } from '@angular/core';


import { Icart } from 'src/app/View Models/icart';
import { CatogryAPIService } from 'src/app/Services/catogry-api.service';
import { ProductsAPIService } from 'src/app/Services/products-api.service';
import { UserService } from 'src/app/Services/user.service';
import { CartApiService } from 'src/app/Services/cart-api.service';




@Component({
  selector: 'app-ordercreator',
  templateUrl: './ordercreator.component.html',
  styleUrls: ['./ordercreator.component.scss']
})
export class OrdercreatorComponent implements OnInit {
  
  receivepop:number=0;
 
  totalprice:number=0;
  cartarray:Icart[]=[];
  constructor(private catogryapiservice:CatogryAPIService,private proservice:ProductsAPIService,private userservice:UserService,private cartservice:CartApiService) {
  
    
   }

  ngOnInit(): void {
   
    if(this.userservice.IsUserLogged)
    { this.cartservice.getCart().subscribe(catlist=>{this.cartservice.cartarray=catlist;this.cartarray=this.cartservice.cartarray;this.cartservice.totalprice=0;this.cartservice.cartarray.forEach(element => {
      this.cartservice.totalprice+=element.productcount*element.unitprice;
      
    });
    this.totalprice=this.cartservice.totalprice;
  });
    }

    
    
  }

  changequantity(){
    if(confirm("Are you sure to Make This Order"))
    {this.proservice.newarray.forEach(elementchild => {
      this.cartservice.cartarray.forEach(elementparent => {
        if(elementchild.name==elementparent.productName)
        {
        
          elementchild.quantity=elementchild.quantity-elementparent.productcount;
          this.proservice.EditProduct(elementchild,elementchild.id).subscribe(prolist=>{ this.proservice.getAllproduct().subscribe(prolist=>{this.proservice.newarray=prolist;});});
          
         
        }
      });
      
      
    });

    this.cartservice.totalprice=0;
    this.totalprice=this.cartservice.totalprice;
    this.cartservice.DeleteAllcart().subscribe(catlist=>{this.cartarray=catlist});
   }
  }
  Removecart(val:number)
  { 
   
    this.cartservice.cartarray.forEach(element => {
      if(element.productID!=val)
      {
        
      }else{
        console.log(element.productID);
        this.cartservice.Deleteproductincart(element.productID).subscribe(cartlist=>{});
        this.cartservice.getCart().subscribe(catlist=>{
          location.reload();
          this.cartservice.totalprice-=element.productcount*element.unitprice;
          this.totalprice=this.cartservice.totalprice;});
       
       
      }
      
    });
  
    
    this.cartservice.getCart().subscribe(catlist=>{this.cartarray=catlist});
   

  }



}