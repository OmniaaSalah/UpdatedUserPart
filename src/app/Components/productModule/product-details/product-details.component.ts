import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsAPIService } from 'src/app/Services/products-api.service';

import { Iproduct } from 'src/app/View Models/iproduct';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
   prodidlist:number[]=[];
   currentprdid:number=0;
   newproduct:Iproduct={} as Iproduct;
  
  currentprd:Iproduct|undefined=undefined;
  constructor(private activatedroute:ActivatedRoute,private prdapiservice:ProductsAPIService,private location:Location,private router:Router) { 

  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(param=>{
    this.currentprdid=Number(param.get('pID'));
    this.prdapiservice.getProductByID(this.currentprdid).subscribe(prolist=>{this.currentprd=prolist});
    this.newproduct=this.currentprd as Iproduct;
   
    });
    
  if(this.prdapiservice.prodnumlist.length!=0)
    {
      this.prodidlist=this.prdapiservice.prodnumlist;
    }
    else
    {
      this.router.navigate(['Home']);
    }
  }
  goback()
  {
    this.location.back();
  }
  goprevious()
  {
    let currindex=this.prodidlist.findIndex((val)=>val==this.currentprdid);
    if(currindex!=0)
    {
      this.currentprdid=this.prodidlist[currindex-1];
      this.router.navigate(['/Products',this.currentprdid]);
    }

  }
  goNext()
  {
    let currindex=this.prodidlist.findIndex((val)=>val==this.currentprdid);
    if(currindex<this.prodidlist.length-1)
    {
      this.currentprdid=this.prodidlist[currindex+1];
      this.router.navigate(['/Products',this.currentprdid]);
    }
  }
  isfirstitem()
  {
    return this.currentprdid==this.prodidlist[0];
  }
  islastitem()
  {
    return this.currentprdid==this.prodidlist[this.prodidlist.length-1];
  }
  Edit(item:Iproduct|undefined)
   {
   this.prdapiservice.newproduct=item as Iproduct;
    this.prdapiservice.EditProduct(this.prdapiservice.newproduct,this.currentprdid).subscribe(pro=>{this.router.navigate(['/Products/EditProduct',this.currentprdid])});
   /*ليه دي مش شغاله وبطلع صفحه AddProduct*/
     /*this.router.navigate(['EditProduct',this.currentprdid]);*/
   }
   Delete(item:Iproduct|undefined)
   {
     var proid=item?.id as number;
    if(confirm("Are you sure to delete "+item?.name)) {
      this.prdapiservice.DeleteProduct(proid).subscribe(pro=>{this.router.navigate(['Products'])});
    }
     
   }

}
