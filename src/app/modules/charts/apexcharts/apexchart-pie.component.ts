import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "apex-chart-pie",
  template: `
    <apx-chart
        *ngIf="series.length"
        id="apexChartPie"
        [fill]="chartOptions.fill"
        [series]="chartOptions.series"
        [labels]="chartOptions.labels"
        [chart]="chartOptions.chart"
        [colors]="chartOptions.colors"
        [legend]="chartOptions.legend"
        [tooltip]="chartOptions.tooltip"
        [stroke]="chartOptions.stroke"
        [dataLabels]="chartOptions.dataLabels"
    ></apx-chart>
  `,
})
export class ApexChartPieComponent implements OnInit, OnChanges, OnDestroy {

  themeSubscription: any;
  chartOptions;
  @Input() horizontalOrintation = true;

  @Input() chartData = [];
  series = [];
  labels = [];

  constructor(
    private helperService: HelperService
  ) {}
  ngOnInit() {
    this.helperService.getSidemenuStatus().subscribe(() => {
      this.createChart();
    });
    this.helperService.getPieStatus().subscribe(() => {
      this.createChart();
    });
  }
  ngOnChanges() {
    this.createChart();
  }
  createChart() {
    this.createChartData();

    if(this.series.length) {

      const colors = ["#67b7dc", "#6794dc", "#6771dc", "#8067dc", "#a367dc", "#c767dc", "#dc67ce", "#dc67ab", "#dc6788", "#dc6967"];
      this.chartOptions = {
        series: this.series,
        labels: this.labels,
        chart: {
          height: 400,
          type: 'donut',
        },
        tooltip: {
          x: {
            show: false
          },
          y: {
            formatter: (value) => {
              return this.helperService.nFormatterPipe(value, 2);
            },
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: colors,
        stroke: {
          width: 0
        },
        fill: {
          // type: "gradient"
        },
        legend: {
          show: true,
          markers: {
            width: 30,
            height: 8
          }
        },
      };
  }

  }
  ngOnDestroy() {}

  createChartData() {
    this.series = [];
    this.labels = [];

    this.chartData.forEach(element => {
        this.series.push(element.doc_count);
        this.labels.push(element.key);
    });
  }

  onSelect(event) {
  }
}
