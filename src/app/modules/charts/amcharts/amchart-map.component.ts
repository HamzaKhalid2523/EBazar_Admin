import {
  Component,
  AfterViewInit,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { Subscription } from "rxjs";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { HelperService } from "src/app/core/services/helper/helper.service";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-map",
  template: `
    <div
      *ngIf="chartId"
      [id]="chartId"
      class="amchart"
      style="width: 100%; height: 100%; min-height: 400px;"
    ></div>
  `,
})
export class AMChartMapComponent implements OnInit, OnChanges, AfterViewInit {
  subscriptions: Subscription[] = [];
  @Input() chartData = [];
  @Input() chartId;
  @Output() chartDataEmit = new EventEmitter<any>();
  data = [];
  chart;

  constructor(private helperService: HelperService) {}
  ngOnInit() {}
  ngOnChanges() {}
  ngAfterViewInit(): void {
    if (this.chartId) {
      this.createChart();

      setTimeout(() => {
        var aTags = document.getElementsByTagName('title');
        var searchText = 'Chart created using amCharts library';
        var found;
  
        for (var i = 0; i < aTags.length; i++) {
          if (aTags[i].innerHTML == searchText) {
            found = aTags[i];
            break;
          }
        }
        var r2 = found.closest("g");
        r2.remove()
      }, 2000);

    }
  }

  createChart() {
    this.createData();

    // var chart = am4core.create(this.chartId, am4maps.MapChart);
    var chart = am4core.create(this.chartId, am4maps.MapChart);
    chart.geodata = am4geodata_worldLow;

    // Set projection
    chart.projection = new am4maps.projections.Miller();

    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

    // Make map load polygon (like country names) data from GeoJSON
    polygonSeries.useGeodata = true;
    // polygonSeries.tooltipText = "hello";

    // Configure series
    var polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name} {value}";
    polygonTemplate.fill = am4core.color("#e7ebe6");

    // Create hover state and set alternative fill color
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#aaa");

    // Remove Antarctica
    polygonSeries.exclude = ["AQ"];

    // Add some data
    polygonSeries.data = [...this.data];

    // Bind "fill" property to "fill" key in data
    polygonTemplate.propertyFields.fill = "fill";
    this.chart = chart;
  }

  createData() {
    const colors = ['#85c5e3','#85a9e3','#858de3','#9985e3','b589e3','#d285e3','#e385d8','#e385bc','#e385a0','#e38785'];
    this.data = [];

    this.chartData.forEach((element, index) => {
      this.data.push({
        id: element?.client_country_code || element?.server_country_code,
        name: element.server_country,
        "value": element?.count,
        "fill": am4core.color(colors[index])
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
