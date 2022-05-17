import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iuser } from '../View Models/iuser';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loginuser } from '../View Models/loginuser';
import { ApiObj } from '../View Models/api-obj';
import { Iproduct } from '../View Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpoption;
  newuser:Iuser={} as Iuser;
  objapi:ApiObj={} as ApiObj;
  useerlogged:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(this.IsUserLogged);

  constructor(private httpclient:HttpClient) {  this.httpoption={
    headers:new HttpHeaders(
      {
        'Content-Type':'application/json'
      }
    )
  }
 }
 
   Adduser(newuser:Iuser) :Observable<Iuser>
  {
    return  this.httpclient.post<Iuser>(environment.APIBaseURL+'Account/Register',JSON.stringify(newuser),this.httpoption);
  }
  Login(user:Loginuser) :Observable<ApiObj>
  {

   
      return this.httpclient.post<ApiObj>(environment.APIBaseURL+'Account/Login',JSON.stringify(user),this.httpoption);
  }

  get IsUserLogged():boolean
  {
  
     
       if (localStorage.getItem("token"))
       {return true;}
       else
       {return false;}
  }
  
}
