import { formatDistanceToNow, formatDistance } from "date-fns";
import { Pipe, PipeTransform } from "@angular/core";
import { zonedTimeToUtc } from 'date-fns-tz'

@Pipe({
  name: "bigdataDuration",
  pure: false,
})
export class BigDataDurationPipe implements PipeTransform {
  transform(value:any, arg1?:any, arg2?:any): string {
    if(value[arg1] && value[arg2]) {
      arg1 = new Date(value[arg1]);
      arg2 = new Date(value[arg2]);
      return formatDistance(arg1, arg2);
    } else {
      if(arg1 && arg2 && value["date_time"]) {
        const newDate = new Date(value["date_time"]);
        return formatDistanceToNow(newDate) + " ago";        
      } else if (value) {
        const newDate = new Date(value);
        return formatDistanceToNow(newDate) + " ago";
      } else {
        return "";
      }
    }
  }
}
