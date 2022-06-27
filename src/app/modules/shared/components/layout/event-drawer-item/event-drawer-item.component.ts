import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResizeEvent } from "angular-resizable-element";

@Component({
  selector: 'app-event-drawer-item',
  templateUrl: './event-drawer-item.component.html',
  styleUrls: ['./event-drawer-item.component.scss']
})
export class EventDrawerItemComponent implements OnInit {

  @Input() item;
  @Input() event_type;
  @Output() closeDrawer = new EventEmitter<any>();
  @Output() drawerWidthEmitter = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  validateResizer(event: ResizeEvent): boolean {
    if (event.rectangle.width > 1050) {
      return false;
    }
    return true;
  }

  onResizeDrawer(event: ResizeEvent): void {
    this.drawerWidthEmitter.emit(event.rectangle.width);
  }

}
