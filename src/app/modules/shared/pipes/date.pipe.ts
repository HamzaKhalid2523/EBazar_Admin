import { Pipe, PipeTransform } from "@angular/core";
import parse from "date-fns/parse";
import format from "date-fns/format";
@Pipe({ name: "datePipe" })
export class DatePipe implements PipeTransform {
  constructor() {}
  transform(dateInput: string) {
    if(dateInput) {
      let date = new Date(dateInput);
  
      return format(date, "dd MMM, yyyy hh:mm:ss a");  
    }
  }
}
