import { Component, Inject, OnInit } from '@angular/core';
import{MatDialogRef, MAT_DIALOG_DATA, MatDialog}from '@angular/material/dialog'
import { Iproduct } from 'src/app/View Models/iproduct';
@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  template: 'passed in {{ data.name }}'
})
export class PopupComponent implements OnInit {
  productimg;
  productname;
  productprice;
  productquantity;
  constructor(private  dialogRef:MatDialogRef<PopupComponent>,@Inject(MAT_DIALOG_DATA) public data:{img:string,name:string,price:number,quantity:number} ) {
    
    this.productimg=data.img;
    this.productname=data.name;
    this.productprice=data.price;
    this.productquantity=data.quantity;
  
   }

  ngOnInit(): void {
  }
  closeMe(){
    this.dialogRef.close();
  }

}
