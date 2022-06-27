import { Component, AfterViewInit, Input, OnChanges, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { HelperService } from "src/app/core/services/helper/helper.service";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-horizontal-bar",
  template: ` <div id="amChartHorizontalBar" class="amchart" style="width: 100%; height: 100%"></div> `,
})
export class AMChartHorizontalBarComponent implements OnInit, OnChanges {

  subscriptions: Subscription[] = [];
  @Input() chartData = [];
  @Output() chartDataEmit = new EventEmitter<any>();
  data = [];
  chart;

  constructor(
    private helperService: HelperService
    ) {}
  ngOnInit() {
    this.createChart();
  }
  ngOnChanges() {
    this.createChart();
  }

  createChart() {
    this.createData();

    // let themeLabelColor = '#000000';

    var chart = am4core.create("amChartHorizontalBar", am4charts.XYChart);

    // Add data
    chart.data = [{
      "country": "USA",
      "visits": 3025
    }, {
      "country": "China",
      "visits": 1882
    }, {
      "country": "Japan",
      "visits": 1809
    }, {
      "country": "Germany",
      "visits": 1322
    }, {
      "country": "UK",
      "visits": 1122
    }, {
      "country": "France",
      "visits": 1114
    }, {
      "country": "India",
      "visits": 984
    }, {
      "country": "Spain",
      "visits": 711
    }, {
      "country": "Netherlands",
      "visits": 665
    }, {
      "country": "Russia",
      "visits": 580
    }, {
      "country": "South Korea",
      "visits": 443
    }, {
      "country": "Canada",
      "visits": 441
    }];

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 50;

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.sequencedInterpolation = true;
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.tooltipText = "[{categoryX}: bold]{valueY}[/]";
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
        "key": element?.key,
        "count": element?.doc_count,
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
    am4core.disposeAllCharts()
    console.log('horizontal bar')
  }
}
