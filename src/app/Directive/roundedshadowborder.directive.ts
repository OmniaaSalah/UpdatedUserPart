import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appRoundedshadowborder]'
})
export class RoundedshadowborderDirective {

  constructor(private elemref:ElementRef) { 
    this.elemref.nativeElement.style.border='2px solid red';
    this.elemref.nativeElement.style.borderRadius='12px';
    this.elemref.nativeElement.style.boxShadow = "5px 5px .8em .8em black";
  }
  @HostListener('mouseover') onmouseover()
  {
 
    this.elemref.nativeElement.style.boxShadow = "10px 10px 1.3em 1.3em black";
  }
  @HostListener('mouseout') onmouseout()
  {
    this.elemref.nativeElement.style.boxShadow = "5px 5px .8em .8em black";
  }

}
