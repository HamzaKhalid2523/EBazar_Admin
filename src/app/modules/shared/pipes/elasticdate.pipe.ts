import { Pipe, PipeTransform } from "@angular/core";
import parse from "date-fns/parse";
import format from "date-fns/format";
@Pipe({ name: "elasticDate", pure: false })
export class ElasticDatePipe implements PipeTransform {
  constructor() {}
  transform(dateInput: string) {
    if (dateInput) {
      const date = new Date(
        parse(dateInput, "yyyy-MM-dd HHmmss.SSS", new Date())
      );

      return format(date, "dd MMM, yyyy hh:mm:ss a");
    }
  }
}
