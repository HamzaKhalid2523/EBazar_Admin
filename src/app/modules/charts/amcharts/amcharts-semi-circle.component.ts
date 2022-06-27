import { Component, AfterViewInit, Input, OnChanges, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { HelperService } from "src/app/core/services/helper/helper.service";

am5.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-semi-circle",
  template: ` <div id="amChartSemiCircle" class="amchart" style="width: 100%; height: 100%"></div> `,
})
export class AMChartSemiCircleComponent implements OnInit, OnChanges {

  subscriptions: Subscription[] = [];
  @Input() chartData = [];
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
    this.createChart();
  }

  createChart() {
    this.createData();

    let themeLabelColor = '#000000';

    var root = am5.Root.new("amChartSemiCircle");

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
    // start and end angle must be set both for chart and series
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
      startAngle: 180,
      endAngle: 360,
      layout: root.verticalLayout,
      innerRadius: am5.percent(50)
    }));

    // Create series
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
    // start and end angle must be set both for chart and series
    var series = chart.series.push(am5percent.PieSeries.new(root, {
      startAngle: 180,
      endAngle: 360,
      valueField: "count",
      categoryField: "key",
      alignLabels: false
    }));

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180
    });

    series.slices.template.setAll({
      cornerRadius: 5
    });

    series.ticks.template.setAll({
      forceHidden: true
    });

    // Set data
    // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
    series.data.setAll(this.data);

    series.appear(1000, 100);
  }

  createData() {
    this.data = [];
    this.chartData.forEach(element => {
      this.data.push({
        "key": element?.key.substring(0, 15),
        "count": element?.doc_count,
      });
    });

    console.log(this.data);
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
