import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from 'src/app/Custom Validators/PasswordmatchValidator';
import { forbiddenNameValidator } from 'src/app/Custom Validators/UserNameValidators';
import { UserService } from 'src/app/Services/user.service';
import { Iuser } from 'src/app/View Models/iuser';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  RegFormgrp:FormGroup
  newuser:Iuser={} as Iuser;
  
  constructor(private fb: FormBuilder,private userapiservice:UserService,private router:Router) {
    this.RegFormgrp = fb.group({
      
      name: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
      email: ['',[Validators.required,Validators.email]],
      mobileNo: fb.array([fb.control('',[Validators.required,Validators.pattern('[01]{1}[0-9]{10}')])]),
      address: fb.group({
        street: ['',[Validators.required]],
        city:['',[Validators.required]],
        postalCode: ['',[Validators.required]],
      }),
      password: ['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      confirmPassword: ['',[Validators.required,Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')]],
      reachedBy: [''],
      reachedByOther: [''],
    }, { validators: passwordMatchValidator });

   }
  
  ngOnInit(): void {
  }
  get addresses()
  {
    return this.RegFormgrp.controls['addresses'] ;
  }
  
  get city():FormControl
  {
    
    
    return this.RegFormgrp.get('addresses.city') as FormControl;
  }
  get  postalCode():FormControl
  {
    return this.RegFormgrp.get('addresses.postalCode') as FormControl;
  }
  get  street():FormControl
  {
    return  this.RegFormgrp.get('addresses.street') as FormControl;
  }
 

  get name() {
    return this.RegFormgrp.controls['name'];
  }

  get email() {
    return this.RegFormgrp.controls['email'];
  }
  get mobileNoArr(): FormArray {
    return this.RegFormgrp.controls['mobileNo'] as FormArray;
  }
  get mobileNo() {
    return this.RegFormgrp.controls['mobileNo'] ;
  }

  get reachedBy() {
    return this.RegFormgrp.controls['reachedBy'];
  }
  get reachedByOther() {
    return this.RegFormgrp.controls['reachedByOther'];
  }

  get password() {
    return this.RegFormgrp.controls['password'];
  }

  get confirmPassword() {
    return this.RegFormgrp.controls['confirmPassword'];
  }

  addMobile() {
    var availableadd=1;
    for(let i of  this.mobileNoArr.controls)
    {if (i.value=="") 

       availableadd=0;
    }
   if(availableadd==1)
   {this.mobileNoArr.push(this.fb.control('',[Validators.required,Validators.pattern('[01]{1}[0-9]{10}')]));}

    availableadd=1;
  }
  removeMobile(mobile:AbstractControl,num:number)
  {
    for(let i of  this.mobileNoArr.controls)
    {
      if (i==mobile)
      {
        this.mobileNoArr.removeAt(num);
      }
    }
  }

  updateReachedOtherValidaiton() {
    if (this.reachedBy.value == "Other")
      
      {this.RegFormgrp.controls['reachedByOther'].setValidators([Validators.required]);}
    else
      {this.RegFormgrp.controls['reachedByOther'].clearValidators();}

    this.RegFormgrp.controls['reachedByOther'].updateValueAndValidity();
  }

  register() {
    
    
    this.userapiservice.Adduser(this.RegFormgrp.value).subscribe(p=>{this.router.navigate(['/Home']),alert("Welcome "+this.name.value+" ...Thank You For Register in Our Website ")});

    
    
  }

}
