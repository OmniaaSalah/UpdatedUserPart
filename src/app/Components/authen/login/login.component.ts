import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartApiService } from 'src/app/Services/cart-api.service';
import { ProductsAPIService } from 'src/app/Services/products-api.service';
import { UserService } from 'src/app/Services/user.service';
import { Icart } from 'src/app/View Models/icart';
import { Loginuser } from 'src/app/View Models/loginuser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
User:Loginuser={} as Loginuser;
 Username:string='';
 password:string='';
 token:string='';
 isuserlogged:boolean= false;

  constructor(private location:Location,private userapiservice:UserService,private router:Router,private proservice:ProductsAPIService,private cartservice:CartApiService) { }

  ngOnInit(): void {
  }
  Back()
  {
    this.location.back();
  }

  Login()
  {
    console.log(this.Username+this.password);
    this.User.UserName=this.Username;
    this.User.password=this.password;
    
    this.userapiservice.Login(this.User).subscribe(obj=>{this.userapiservice.objapi=obj;
      localStorage.setItem("token",this.userapiservice.objapi.token);
      localStorage.setItem("countppro",JSON.stringify(this.cartservice.cartcount.value));
    
       this.router.navigate(['/Products']);
       
    alert("Welcome "+this.Username);
    this.userapiservice.useerlogged.next(true);
    this.cartservice.cartarray=[] as Icart[];
    
  },
    (error)=>{alert("Pleaze write valid Username And Password")});
   
      
  }

}
