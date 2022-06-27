import { Component, AfterViewInit, Input, OnChanges, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { HelperService } from "src/app/core/services/helper/helper.service";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-vbar",
  template: ` <div *ngIf="chartId" [id]="chartId" class="amchart" style="width: 100%; height: 100%; min-height: 400px;"></div> `,
})
export class AMChartVBarComponent implements OnInit, OnChanges, AfterViewInit {

  subscriptions: Subscription[] = [];
  @Input() chartData = [];
  @Input() chartId;
  @Output() chartDataEmit = new EventEmitter<any>();
  data = [];
  chart;

  constructor(
    private helperService: HelperService
    ) {}
  ngOnInit() {
    // this.createChart();
  }
  ngOnChanges() {
    // this.createChart();
  }
  ngAfterViewInit(): void {
    if(this.chartId) {
      this.createChart();
    }
  }

  createChart() {
    this.createData();
    var chart = am4core.create(this.chartId, am4charts.XYChart);
    chart.data = this.data;

    // Create axes
    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "key";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.disabled = true;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.renderer.labels.template.fontFamily = 'Montserrat';

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;
    valueAxis.renderer.labels.template.fontSize = 11;
    valueAxis.renderer.labels.template.fontFamily = 'Montserrat';

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueX = "count";
    series.dataFields.categoryY = "key";
    series.tooltipText = "[{categoryY}: bold]{valueX}[/]";
    series.columns.template.strokeWidth = 0;

    series.tooltip.pointerOrientation = "vertical";

    series.columns.template.column.cornerRadiusTopLeft = 10;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.fillOpacity = 0.8;

    // on hover, make corner radiuses bigger
    var hoverState = series.columns.template.column.states.create("hover");
    hoverState.properties.cornerRadiusTopLeft = 0;
    hoverState.properties.cornerRadiusTopRight = 0;
    hoverState.properties.fillOpacity = 1;

    series.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    // Cursor
    chart.cursor = new am4charts.XYCursor();
    this.chart = chart;
  }

  createData() {
    this.data = [];
    this.chartData.forEach(element => {
      this.data.push({
        "key": element?.key.substring(0, 15),
        "count": element?.doc_count,
      });
    });

    this.data = this.data.reverse();
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
