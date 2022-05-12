import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditcarddata'
})
export class CreditcarddataPipe implements PipeTransform {

  transform(value: string): string {
    var p1=value.substring(0,4);
    var p2=value.substring(4,8);
    var p3=value.substring(8,12);
    var p4=value.substring(12,16);
    var converted=p1+"-"+p2+"-"+p3+"-"+p4;
    return converted;
  }

}
