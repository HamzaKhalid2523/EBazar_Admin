import { Component, AfterViewInit, Input, OnChanges, OnInit, Output, EventEmitter } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Subscription } from "rxjs";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-custom-pie",
  template: ` <div id="amChartRadialPie" class="amchart" style="width: 100%; height: 100%"></div> `,
})
export class AMChartCustomPieComponent implements OnInit, OnChanges {

  subscriptions: Subscription[] = [];
  @Input() chartData = [];
  @Output() chartDataEmit = new EventEmitter<any>();
  data = [];
  maxValue;
  chart;

  constructor(
    ) {}
  ngOnInit() {
      this.createChart();
  }
  ngOnChanges() {
      if(this.data.length) {
          this.createChart();
      }
  }

  createChart() {
    this.createData();


    let themeLabelColor = '#000000'

    var chart = am4core.create("amChartRadialPie", am4charts.RadarChart);
    this.chart = chart;

    // Add data
    const data = this.data;
    chart.data = data;

    // Make chart not full circle
    chart.startAngle = -90;
    chart.endAngle = 180;
    chart.innerRadius = am4core.percent(20);

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis<am4charts.AxisRendererRadial>());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.grid.template.strokeOpacity = 0;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.fontWeight = "500";
    categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target): any {
        return (target.dataItem.index >= 0) ?  data[target.dataItem.index]?.color : fill;
    });
    categoryAxis.renderer.minGridDistance = 10;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    valueAxis.renderer.grid.template.strokeOpacity = 0;
    valueAxis.min = 0;
    valueAxis.max = this.maxValue;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.labels.template.adapter.add("fill", function(fill, target): any {
        return (target.dataItem.index >= 0) ?  themeLabelColor : fill;
    });

    // Create series
    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueX = "full";
    series1.dataFields.categoryY = "category";
    series1.clustered = false;
    series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
    series1.columns.template.fillOpacity = 0.08;
    series1.columns.template["cornerRadiusTopLeft"] = 20;
    series1.columns.template.strokeWidth = 0;
    series1.columns.template.radarColumn.cornerRadius = 20;

    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueX = "value";
    series2.dataFields.categoryY = "category";
    series2.clustered = false;
    series2.columns.template.strokeWidth = 0;
    series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
    series2.columns.template.radarColumn.cornerRadius = 20;

    series2.columns.template.adapter.add("fill", function(fill, target): any {
        return (target.dataItem.index >= 0) ? data[target.dataItem.index]?.color : fill;
    });
    // Add cursor
    // chart.cursor = new am4charts.RadarCursor();

    series2.columns.template.events.on("hit", (ev: any) => {
      this.chart.series.each((series: any) => {
        if (series instanceof am4charts.ColumnSeries) {
          series.columns.each((column: any) => {
            if (column.dataItem.categoryY == ev.target.dataItem?.categoryY) {
              this.chartDataEmit.emit(column.dataItem?._dataContext);
            }
          })
        }
      })
    });
  }

  createData() {
    this.maxValue = 0;
    this.data = [];

    this.chartData.forEach(element => {
        if(element?.count > this.maxValue || element?.Count > this.maxValue) this.maxValue = element?.count || element?.Count;
    });

    this.chartData.forEach(element => {
      let color = '#ff8b4d';
      if(element?.Label === 'Critical') color = '#f76d25';
      if(element?.Label === 'Attention') color = '#faea3c';
      if(element?.Label === 'Clear') color = '#23cf74';

      this.data.push({
        "category": element?.label,
        "value": element?.count || element?.Count,
        "full": this.maxValue,
        "color": color
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
