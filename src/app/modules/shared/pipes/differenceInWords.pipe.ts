import { differenceInSeconds,intervalToDuration,formatDuration  } from "date-fns";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "differenceInWords",
  pure: false,
})
export class DifferenceInWords implements PipeTransform {
  transform(value:any, arg1?:any, arg2?:any): string {
    if(value[arg1] && value[arg2]) {
      arg1 = new Date(value[arg1]);
      arg2 = new Date(value[arg2]);
      let diffInSecs= differenceInSeconds(arg1, arg2);
      return diffInSecs ? formatDuration(intervalToDuration({start: 0, end: diffInSecs * 1000})): '0 seconds';
    }
  }
}
