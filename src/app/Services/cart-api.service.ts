import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icart } from '../View Models/icart';
@Injectable({
  providedIn: 'root'
})
export class CartApiService {
  cartarray:Icart[]=[];
  totalprice:number=0;
  private httpoption;
  public cartcount= new BehaviorSubject<number>(0);
  constructor(private httpclient:HttpClient) { 
    this.httpoption={
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    }
  }

  getCart():Observable<Icart[]>
  {
    
    
    return this.httpclient.get<Icart[]>(environment.APIBaseURL+'Cart/GetAll');
  }

 
 getCartByID(prodID:number): Observable<Icart>{

    return this.httpclient.get<Icart>(environment.APIBaseURL+'Cart/GetbyId/{id}'+prodID);
  }

 
  AddCart(newcart:Icart) :Observable<Icart>
  {
    console.log("jello");
    return this.httpclient.post<Icart>(environment.APIBaseURL+'Cart/Insert',JSON.stringify(newcart),this.httpoption);
  }
  Editcart(newcart:Icart,prodname:string):Observable<Icart>
  {
    return this.httpclient.put<Icart>(environment.APIBaseURL+'Cart/Update/'+prodname,newcart);
  }
 
  Deleteproductincart(prodID:number):Observable<Icart>
  {
    return this.httpclient.delete<Icart>(environment.APIBaseURL+'Cart/Delete/'+prodID)
  }

  DeleteAllcart():Observable<Icart[]>
  {
    return this.httpclient.delete<Icart[]>(environment.APIBaseURL+'Cart/DeleteAll');
  }

  
}
