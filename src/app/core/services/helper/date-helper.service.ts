import { Injectable } from "@angular/core";
import subMinutes from "date-fns/subMinutes";
import subDays from "date-fns/subDays";
@Injectable({
  providedIn: "root",
})
export class DateHelperService {
  constructor() {}

  calculateDateRangebyDays(days: number, date_end = new Date(Date.now())) {
    const date_start = subDays(date_end, days);

    return {
      date_start,
      date_end,
    };
  }
  calculateDateRangebyMinutes(
    minutes: number,
    date_end = new Date(Date.now())
  ) {
    const date_start = subMinutes(date_end, minutes);

    return {
      date_start,
      date_end,
    };
  }
}
