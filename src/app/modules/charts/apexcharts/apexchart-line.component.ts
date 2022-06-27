import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "apex-chart-line",
  template: `
    <apx-chart
      *ngIf="series.length"
      id="apexChartLine"
      [series]="chartOptions.series"
      [chart]="chartOptions.chart"
      [xaxis]="chartOptions.xaxis"
      [stroke]="chartOptions.stroke"
      [tooltip]="chartOptions.tooltip"
      [dataLabels]="chartOptions.dataLabels"
      [markers]="chartOptions.markers"
    ></apx-chart>
  `,
})
export class ApexChartLineComponent implements OnInit, OnChanges, OnDestroy {
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
    this.helperService.getBarStatus().subscribe(() => {
      this.createChart();
    });
  }
  ngOnChanges() {
    this.createChart();
  }
  createChart() {
    this.createChartData();
    if (this.series.length) {

      let color = "#333333";
      const colors = [
        "#5AA454",
        "#E44D25",
        "#CFC0BB",
        "#7aa3e5",
        "#a8385d",
        "#aae3f5",
      ];
      this.chartOptions = {
        series: [
          {
            name: "series1",
            data: this.series
          },
        ],
        chart: {
          height: 270,
          type: "area"
        },
        markers: {
          size: 5,
          hover: {
            size: 9
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "smooth"
        },
        xaxis: {
          type: "datetime",
          categories: this.labels
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm"
          }
        }
      };
    }
  }
  ngOnDestroy() {}



  createChartData() {
    this.series = [];
    this.labels = [];

    this.chartData.forEach((element) => {
      this.series.push(element.doc_count);
      this.labels.push(element.key);
    });
  }

  onSelect(event) {
  }
}
