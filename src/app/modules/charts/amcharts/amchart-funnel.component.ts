import { Component, AfterViewInit, Input, OnChanges, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { HelperService } from "src/app/core/services/helper/helper.service";

am5.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-funnel",
  template: ` <div *ngIf="chartId" [id]="chartId" class="amchart" style="width: 100%; height: 100%; min-height: 400px;"></div> `,
})
export class AMChartFunnelComponent implements OnInit, OnChanges, AfterViewInit {

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
    // if(this.chartId) {
    //   this.createChart();
    // }
  }
  ngAfterViewInit(): void {
    if(this.chartId) {
      this.createChart();
    }
  }

  createChart() {
    this.createData();

    var root = am5.Root.new(this.chartId);

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);


    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/
    var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
      layout: root.verticalLayout
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
    var series = chart.series.push(am5percent.FunnelSeries.new(root, {
      alignLabels: false,
      orientation: "vertical",
      valueField: "count",
      categoryField: "key"
    }));

    series.labels.template.setAll({
      fontSize: 11,
      fontFamily: 'MontSerrat',
      text: "{key}: {count}"
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
    series.data.setAll(this.data);


    // Play initial series animation
    // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
    series.appear();


    // Create legend
    // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
    // var legend = chart.children.push(am5.Legend.new(root, {
    //   centerX: am5.p50,
    //   x: am5.p50,
    //   marginTop: 15,
    //   marginBottom: 15
    // }));

    // legend.data.setAll(series.dataItems);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);

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
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    
  }
}
