import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit, OnChanges {

  @Input() records = [];
  @Input() recordsCount = 0;
  @Input() recordsCountTag = '';
  @Input() recordsLoading = false;
  @Input() paginationCount = 0;
  @Input() pageSize = 50;
  @Input() pageIndex = 1;
  @Input() paginationSearched = 0;
  @Input() displayMultiSelect = true;
  @Input() eventsSelected = [];

  @Output() pageIndexChange = new EventEmitter<any>();
  @Output() pageSizeChange = new EventEmitter<any>();
  @Output() sideDrawerVisible = new EventEmitter<any>();
  @Output() addDynamicFilter = new EventEmitter<any>();
  @Output() dataExported = new EventEmitter<any>();
  @ViewChildren('detailView') detailView : QueryList<ElementRef>;

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

  drawerVisibleEvent(value, index) {
    this.records = this.records.filter((item, i) => {
      if(index === i) item['activeState'] = true;
      else item['activeState'] = false;

      return item;
    });
    this.sideDrawerVisible.emit({value, index});

    setTimeout(() => {
      if(this.detailView) this.detailView.forEach((loc, i) => {
        if(index === i) {
          loc.nativeElement.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }
      });
    }, 800);
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
