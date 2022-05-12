import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iuser } from '../View Models/iuser';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpoption;
  newuser:Iuser={} as Iuser;

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

  
  
}
