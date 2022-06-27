import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ListingService } from 'src/app/core/services/helper/listings.service';
import format from "date-fns/format";
import subMinutes from "date-fns/subMinutes";
import subDays from "date-fns/subDays";
import differenceInMinutes from 'date-fns/differenceInMinutes'

@Component({
  selector: 'app-daterange-calendar',
  templateUrl: './daterange-calendar.component.html',
  styleUrls: ['./daterange-calendar.component.scss']
})
export class DaterangeCalendarComponent implements OnInit {

  @Input() urlDateRange: any;

  selectedCustomRangeText = "";
  popoverCustomRangeVisible = false;
  dateRangePicker: any;
  dateRange: any;
  rangeQueries: any;
  dateApplied = true;

  @Output() dateRangeEmitter = new EventEmitter<any>();

  constructor(
    private listingService: ListingService
  ) { }

  ngOnInit(): void {
    this.rangeQueries = this.listingService.daterangeQueries;
    if (this.urlDateRange) this.setAppliedDate(this.urlDateRange);
    else {
      this.timeQueryChanged({ label: "Last 90 Days", value: "last_90_days" }, true);
    }
    this.dateApplied = false;
  }

  changeDateRange() {
    this.selectedCustomRangeText = '';
    this.setRangeStartEnd(null, null);
  }

  timeQueryChanged(item: any, dateApplied?: any) {
    this.dateApplied = dateApplied;
    this.selectedCustomRangeText = item.label;
    this.CustomRangeChanged(item.value);
  }

  CustomRangeChanged(event: any) {
    const now = new Date();
    let date_response;
    switch (event) {
      case "last_15_minutes":
        date_response = this.calculateDateRangebyMinutes(15, now);
        this.setRangeStartEnd(date_response.date_start, date_response.date_end);

        break;
      case "last_30_minutes":
        date_response = this.calculateDateRangebyMinutes(30, now);
        this.setRangeStartEnd(date_response.date_start, date_response.date_end);

        break;
      case "last_1_hour":
        date_response = this.calculateDateRangebyMinutes(1 * 60, now);
        this.setRangeStartEnd(date_response.date_start, date_response.date_end);

        break;
      case "last_3_hours":
        date_response = this.calculateDateRangebyMinutes(3 * 60, now);
        this.setRangeStartEnd(date_response.date_start, date_response.date_end);

        break;
      case "last_6_hours":
        date_response = this.calculateDateRangebyMinutes(6 * 60, now);
        this.setRangeStartEnd(date_response.date_start, date_response.date_end);

        break;
      case "last_12_hours":
        const twelve_hours = this.calculateDateRangebyMinutes(12 * 60, now);
        this.setRangeStartEnd(twelve_hours.date_start, twelve_hours.date_end);

        break;
      case "last_24_hours":
        date_response = this.calculateDateRangebyMinutes(24 * 60, now);
        this.setRangeStartEnd(date_response.date_start, date_response.date_end);

        break;
      case "today":
        // const now = new Date();
        this.setRangeStartEnd(now, now);

        break;
      case "last_3_days":
        const three_days = this.calculateDateRangebyDays(3);
        this.setRangeStartEnd(three_days.date_start, three_days.date_end);

        break;
      case "last_7_days":
        const seven_days = this.calculateDateRangebyDays(7);
        this.setRangeStartEnd(seven_days.date_start, seven_days.date_end);

        break;
      case "last_10_days":
        const ten_days = this.calculateDateRangebyDays(10);
        this.setRangeStartEnd(ten_days.date_start, ten_days.date_end);

        break;
      case "this_month":
        const todayDate = new Date();
        const firstDay = new Date(
          todayDate.getFullYear(),
          todayDate.getMonth(),
          1
        );
        this.setRangeStartEnd(firstDay, todayDate);

        break;
      case "last_30_days":
        const thirty_days = this.calculateDateRangebyDays(30);
        this.setRangeStartEnd(thirty_days.date_start, thirty_days.date_end);

        break;
      case "last_90_days":
        const ninety_days = this.calculateDateRangebyDays(90);
        this.setRangeStartEnd(ninety_days.date_start, ninety_days.date_end);

        break;
      default:
        break;
    }
  }

  calculateDateRangebyMinutes(
    minutes: number,
    date_end = new Date(Date.now())
  ) {
    const date_start = subMinutes(date_end, minutes-1);

    return {
      date_start,
      date_end,
    };
  }
  calculateDateRangebyDays(days: number, date_end = new Date(Date.now())) {
    const date_start = subDays(date_end, days-1);

    return {
      date_start,
      date_end,
    };
  }

  add_minutes(dt: any, minutes: any) {
    return new Date(dt.getTime() + minutes*60000);
  }
  add_days(dt: any, days: any) {
    return new Date(dt.setDate(dt.getDate() + days));
  }

  setAppliedDate(dateArray: any) {
    if (dateArray[0] && dateArray[1]) {
      let diff = differenceInMinutes(dateArray[1], dateArray[0]);
      if(diff <= 1439) diff = differenceInMinutes(this.add_minutes(dateArray[1], 1), dateArray[0]);
      else diff = differenceInMinutes(this.add_days(dateArray[1], 1), dateArray[0]);

      if(diff === 15)  this.timeQueryChanged({ label: "Last 15 Mins", value: "last_15_minutes" }, true);
      if(diff === 30)  this.timeQueryChanged({ label: "Last 30 Mins", value: "last_30_minutes" }, true);
      if(diff === 60)  this.timeQueryChanged({ label: "Last 1 Hour", value: "last_1_hour" }, true);
      if(diff === 180)  this.timeQueryChanged({ label: "Last 3 Hours", value: "last_3_hours" }, true);
      if(diff === 360)  this.timeQueryChanged({ label: "Last 6 Hours", value: "last_6_hours" }, true);
      if(diff === 720)  this.timeQueryChanged({ label: "Last 12 Hours", value: "last_12_hours" }, true);
      if(diff === 1440)  this.timeQueryChanged({ label: "Last 24 Hours", value: "last_24_hours" }, true);
      if(diff === 4320)  this.timeQueryChanged({ label: "Last 3 Days", value: "last_3_days" }, true);
      if(diff === 10080)  this.timeQueryChanged({ label: "Last 7 Days", value: "last_7_days" }, true);
      if(diff === 14400)  this.timeQueryChanged({ label: "Last 10 Days", value: "last_10_days" }, true);
      if(diff === 43200)  this.timeQueryChanged({ label: "Last 30 Days", value: "last_30_days" }, true);
      if(diff === 129600)  this.timeQueryChanged({ label: "Last 90 Days", value: "last_90_days" }, true);
    }
  }

  onOk(eventsArray: any) {
    this.dateApplied = false;

    if (eventsArray[0] && eventsArray[1]) {
      const start = eventsArray[0];
      const end = eventsArray[1];

      const placeHolderText =
        format(start, "dd/MM/yyyy") + " - " + format(end, "dd/MM/yyyy");
      this.selectedCustomRangeText = placeHolderText;

      this.setRangeStartEnd(start, end, false);
    }
  }
  eliminateSeconds(time: string) {
    time = JSON.stringify(time);
    const regex = new RegExp(":\\d+(?!.*(:\\d+))", "gi");
    time = time.replace(regex, ":00");
    return JSON.parse(time);
  }
  setRangeStartEnd(start: any, end: any, till_now = true) {
    start = this.eliminateSeconds(start);
    end = this.eliminateSeconds(end);
    this.dateRange = { start, end };
    this.dateRangeEmitter.emit({
      start,
      end,
      till_now,
      dateApplied: this.dateApplied,
    });

    this.popoverCustomRangeVisible = false;
  }
}
