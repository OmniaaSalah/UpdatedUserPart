import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icatogry } from '../View Models/icatogry';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CatogryAPIService {

  constructor(private httpclient:HttpClient) { }

  getAllproduct():Observable<Icatogry[]>
  {
    
    return this.httpclient.get<Icatogry[]>(environment.APIBaseURL+'Categories');
  }

  
}
