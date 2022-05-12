import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../View Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsAPIService {
  prodnumlist:number[]=[];
  newproduct:Iproduct={} as Iproduct;
  private httpoption;
  constructor(private httpclient:HttpClient) {
   
    this.httpoption={
      headers:new HttpHeaders(
        {
          'Content-Type':'application/json'
        }
      )
    }
   }
  getAllproduct():Observable<Iproduct[]>
  {
    
    
    return this.httpclient.get<Iproduct[]>(environment.APIBaseURL+'Products/GetAll');
  }

  getProductsByCatID(catID:number):Observable<Iproduct[]>
  {
    
    return this.httpclient.get<Iproduct[]>(environment.APIBaseURL+'Products/GetbycatId/'+catID);
   
  }
 getProductByID(prodID:number): Observable<Iproduct>{

    return this.httpclient.get<Iproduct>(environment.APIBaseURL+'Products/GetbyId/'+prodID);
  }

 
  AddProduct(newproduct:Iproduct) :Observable<Iproduct>
  {
    return this.httpclient.post<Iproduct>(environment.APIBaseURL+'Products/Insert',JSON.stringify(newproduct),this.httpoption);
  }
  EditProduct(newproduct:Iproduct,prodID:number):Observable<Iproduct>
  {
    return this.httpclient.patch<Iproduct>(environment.APIBaseURL+'Products/Update/'+prodID,newproduct);
  }
  DeleteProduct(prodID:number):Observable<Iproduct>
  {
    return this.httpclient.delete<Iproduct>(environment.APIBaseURL+'Products/Delete/'+prodID)
  }

}
