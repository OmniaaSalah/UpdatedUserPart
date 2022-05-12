import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personaldata'
})
export class PersonaldataPipe implements PipeTransform {

  transform(value: string,Dateval:string):string {
    var val=value.toString();
    
    var Year = val.substring(1, 3);
   var Month = val.substring(3, 5);
   var Day = val.substring(5, 7);
  if(Dateval.includes('y')||Dateval.includes('Y'))
  {
    console.log(Year);
    return Year;
  }else if(Dateval.includes('m')||Dateval.includes('M'))
  {
    console.log(Month)
    return Month;
  }else if(Dateval.includes('d')||Dateval.includes('D'))
  {
    console.log(Day);
    return Day;
  }
   
  return "";
    
  }

}
