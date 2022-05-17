import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartApiService } from 'src/app/Services/cart-api.service';
import { ProductsAPIService } from 'src/app/Services/products-api.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
productcount:number=0;
isuserlogged:boolean= false;
  constructor(private proservice:ProductsAPIService,private userservice:UserService,private router:Router,private cartservice:CartApiService) { 
    if(this.userservice.IsUserLogged==true)
    {this.cartservice.cartcount.next(JSON.parse (localStorage.getItem("countppro")|| "{}"));
      this.cartservice.cartcount.subscribe(val=>{this.productcount=val;});
    }
    
  }

  ngOnInit(): void {
   
    if(this.userservice.IsUserLogged==true)
    {
      this.cartservice.cartcount.next(JSON.parse (localStorage.getItem("countppro")|| "{}"));
      this.cartservice.cartcount.subscribe(val=>{this.productcount=val;});
    }
      
    this.userservice.useerlogged.subscribe(val=>{this.isuserlogged=val;})
    console.log(this.userservice.useerlogged.value);
    
    
  }
  OpenCart()
  {
    this.router.navigate(["/Products/Order"]);
  }
  Logout()
  {
    if(confirm("Are you sure that You need to Logout "))
    {
    localStorage.removeItem("token");
    localStorage.removeItem("countppro");
    this.cartservice.cartcount.next(0);
    this.productcount=0;
    this.cartservice.DeleteAllcart().subscribe(catlist=>{this.cartservice.totalprice=0;});
    this.userservice.useerlogged.next(false);

    
      
    }
  }

}
