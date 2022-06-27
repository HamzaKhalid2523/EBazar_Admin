import { Component, AfterViewInit, Input, OnChanges, OnInit, Output, EventEmitter, HostListener } from "@angular/core";
import { Subscription } from "rxjs";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { HelperService } from "src/app/core/services/helper/helper.service";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-radial-pie",
  template: ` <div *ngIf="chartId" [id]="chartId" class="amchart" style="width: 100%; height: 100%; min-height: 400px;"></div> `,
})
export class AMChartRadialPieComponent implements OnInit, OnChanges, AfterViewInit {

  subscriptions: Subscription[] = [];
  @Input() chartData = [];
  @Input() chartId;
  @Output() chartDataEmit = new EventEmitter<any>();
  data = [];
  largestValue = 0;
  chart;

  constructor(
    private helperService: HelperService
    ) {}
  ngOnInit() {
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

    var chart = am4core.create(this.chartId, am4charts.RadarChart);
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    chart.data = this.data;

    var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererRadial>());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.fontSize = 12;
    categoryAxis.renderer.labels.template.fontFamily = 'Montserrat';
    categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
      return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    var valueAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = this.largestValue;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.fontSize = 11;
    valueAxis.renderer.labels.template.fontFamily = 'Montserrat';

    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    // series1.columns.template.cornerRadiusTopLeft = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });

    chart.cursor = new am4charts.RadarCursor();
  }

  createData() {
    if(this.chartData) {
      let largestValue = 0;
      this.data = [];
      // this.chartData = this.chartData.reverse();
      this.chartData.forEach(element => {
        largestValue = largestValue > element?.doc_count ? largestValue: element.doc_count;
      });

      this.chartData.forEach(element => {
        this.data.push({
          "category": element?.key,
          "value": element?.doc_count,
          "full": largestValue
        });
      });

      this.largestValue = largestValue;
      this.data = this.data.reverse();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }

    am4core.disposeAllCharts()
    console.log('radIAL pie')

  }
}
