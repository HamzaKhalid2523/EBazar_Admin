import { formatDistanceToNow } from "date-fns";
import { Pipe, PipeTransform } from "@angular/core";
import parse from "date-fns/parse";

@Pipe({
  name: "duration",
  pure: false,
})
export class DurationPipe implements PipeTransform {
  transform(dateInput: string): string {
    if (dateInput) {
      const newdate = new Date(
        parse(dateInput, "yyyy-MM-dd HHmmss.SSS", new Date())
      );
      const res = formatDistanceToNow(new Date(newdate));
      return res + " ago";
    } else {
      return "";
    }
  }
}
