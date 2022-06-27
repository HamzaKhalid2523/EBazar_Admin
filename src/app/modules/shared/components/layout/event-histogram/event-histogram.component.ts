import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { format } from 'date-fns';
import { ReportsService } from 'src/app/core/services/api/bigdata/reports.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';

@Component({
  selector: 'app-event-histogram',
  templateUrl: './event-histogram.component.html',
  styleUrls: ['./event-histogram.component.scss']
})
export class EventHistogramComponent implements OnInit {

  @Input() dateRangeLabel;
  @Input() dateRange;
  @Input() till_now;

  @Output() eventsDataEmitter = new EventEmitter<any>();
  @Output() eventsLoadingEmitter = new EventEmitter<any>();

  eventsData = [];
  @Input() eventsLoading = false;

  constructor(
    private helperService: HelperService,
    private reportsService: ReportsService
  ) { }

  ngOnInit(): void {
    this.helperService.getEventHistogramStatus().subscribe(() => this.getEventsTimeline());
  }

  getEventsTimeline() {
    this.eventsLoading = true;
    this.eventsLoadingEmitter.emit(this.eventsLoading);

    this.reportsService.getEventHistogram(this.getFiltersQuery(10)).subscribe(
      (response) => {
        this.eventsData = response.data.hits;
        this.setTimelineResponse();
        this.eventsData.reverse();
        this.eventsLoading = false;

        this.eventsDataEmitter.emit(this.eventsData);
        this.eventsLoadingEmitter.emit(this.eventsLoading);
      },
      (error) => {
        console.log(error);
        this.eventsLoading = false;
      }
    )
  }

  getFiltersQuery(dataSize) {
    return {
      skip: 0, limit: dataSize, filters: [{
        key: 'date_time', value: [ this.dateRange.start, !this.till_now ? this.dateRange.end : new Date()], operator: "between"
      }]
    }
  }

  setTimelineResponse() {
    const dateRange = this.getDateRange(this.dateRange.start,!this.till_now ? this.dateRange.end : new Date());

    this.eventsData.forEach((e, index) => {
      e.doc_count = e?.total || e?.visitors;
      e.key = e?.key || e.t;

      if(this.dateRangeLabel === "last_1_hour" || this.dateRangeLabel === "last_24_hours") {
        e.key = format(new Date(e.key), "HH:mm:ss");
      } else e.key = format(new Date(e.key), "yyyy-MM-dd");
    });

    if(this.dateRangeLabel !== "last_1_hour" && this.dateRangeLabel !== "last_24_hours") {
      dateRange.forEach((date, index) => {
        let exists = false;
        this.eventsData.forEach((e) => {
          if(date === e.key) {
            exists = true
            return;
          }
        });
        if(!exists) {
          this.eventsData.splice(index, 0, {
            key: date,
            doc_count: 0,
            total: 0
          });
        }
      });
    }
  }

  getDateRange(startDate, endDate, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(format(new Date(new Date(currentDate)), "yyyy-MM-dd"));
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }

    return dateArray.reverse();
  }
}
