import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-events-list-item',
  templateUrl: './events-list-item.component.html',
  styleUrls: ['./events-list-item.component.scss']
})
export class EventsListItemComponent implements OnInit, OnChanges {

  @Input() item;
  @Input() event_type;

  @Output() sideDrawerVisible = new EventEmitter<any>();
  @Output() recordSelected = new EventEmitter<any>();

  emailReceiversTo = [];
  emailReceiversCC = [];
  emailReceiversBCC = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if(this.event_type === 'email') {
      this.item?.["receivers.name"].forEach((receiver, index) => {
        if(this.item?.["receivers.type"][index]) {
          if (this.item?.["receivers.type"][index] === "TO") {
            this.emailReceiversTo.push(receiver);
          } else if (this.item?.["receivers.type"][index] === "CC") {
            this.emailReceiversCC.push(receiver);
          } else if (this.item?.["receivers.type"][index] === "BCC") {
            this.emailReceiversBCC.push(receiver);
          } else {
            this.emailReceiversTo.push(receiver);
          }
        }
      });
    }
  }

  openEventDrawer(e, flow_data) {
    this.sideDrawerVisible.emit(flow_data);
    e.stopPropagation();
  }

  setSelectedState() {
    if(!this.item?.is_viewed) this.recordSelected.emit();
  }

}
