import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-radius-list',
  templateUrl: './radius-list.component.html',
  styleUrls: ['./radius-list.component.scss']
})
export class RadiusListComponent implements OnInit, OnChanges {

  @Input() records = [];
  @Input() recordsCount = 0;
  @Input() recordsCountTag = '';
  @Input() recordsLoading = false;
  @Input() paginationCount = 0;
  @Input() pageSize = 50;
  @Input() pageIndex = 1;
  @Input() paginationSearched = 0;
  @Input() eventsSelected = [];

  @Output() pageIndexChange = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<any>();
  @Output() addDynamicFilter = new EventEmitter<any>();
  @Output() dataExported = new EventEmitter<any>();

  allEventsChecked = false;
  eventsIndeterminate = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.eventsSelected?.previousValue !==  changes.eventsSelected?.currentValue) {
      if(this.eventsSelected.length === 0) {
        this.unCheckedAllExports();
      }
    }
  }

  pageIndexChangeEvent(value) {
    this.pageIndexChange.emit(value);
  }

  pageSizeChangeEvent(value) {
    this.pageSizeChange.emit(value);
  }

  addDynamicFilterEvent(value, field, label) {
    this.addDynamicFilter.emit({value, field, label});
  }

  updateSingleChecked(value: string[], item: any): void {
    if(value) {
      this.eventsSelected = [...new Set([...this.eventsSelected, item?.uuid])];
    } else {
      const temp = this.eventsSelected.filter(a => a !== item?.uuid);
      this.eventsSelected = [...new Set([...temp])];
    }

    this.paginationSearched = this.paginationSearched + 1;

    if (this.records.every((a) => item?.uuid !== a?.uuid)) {
      this.allEventsChecked = false;
      this.eventsIndeterminate = false;
    } else if (this.records.every((a) => item?.uuid === a?.uuid)) {
      this.allEventsChecked = true;
      this.eventsIndeterminate = false;
    } else {
      this.allEventsChecked = false;
      this.eventsIndeterminate = true;
    }

    this.dataExported.emit({
      eventsSelected: this.eventsSelected,
      paginationSearched: this.paginationSearched
    });
  }

  updateAllChecked(): void {
    this.eventsIndeterminate = false;
    if (this.allEventsChecked) {
      this.records.map((item) => {
        item["eventExported"] = true;
        if(this.eventsSelected.indexOf(item["uuid"]) === -1) this.eventsSelected.push(item["uuid"]);
      });
    } else {
      this.records.map((item) => {
        item["eventExported"] = false;
        this.eventsSelected.splice(this.eventsSelected.indexOf(item["uuid"]), 1);
      });
    }

    this.dataExported.emit({
      eventsSelected: this.eventsSelected,
      paginationSearched: this.paginationSearched
    });
  }

  unCheckedAllExports() {
    this.allEventsChecked = false;
    this.eventsIndeterminate = false;

    this.records.map((item) => {
      item["eventExported"] = false;
      this.eventsSelected.splice(this.eventsSelected.indexOf(item["uuid"]), 1);
    });
  }
}
