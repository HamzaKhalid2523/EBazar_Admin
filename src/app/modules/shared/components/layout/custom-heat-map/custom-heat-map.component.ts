import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-custom-heat-map',
  templateUrl: './custom-heat-map.component.html',
  styleUrls: ['./custom-heat-map.component.scss']
})
export class CustomHeatMapComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit(): void {
  }

}
