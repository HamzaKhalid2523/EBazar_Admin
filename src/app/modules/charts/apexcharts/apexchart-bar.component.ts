import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "apex-chart-bar",
  template: `
    <apx-chart
      *ngIf="series.length"
      id="apexChartBar"
      [series]="chartOptions.series"
      [tooltip]="chartOptions.tooltip"
      [chart]="chartOptions.chart"
      [xaxis]="chartOptions.xaxis"
      [yaxis]="chartOptions.yaxis"
      [title]="chartOptions.title"
      [colors]="chartOptions.colors"
      [legend]="chartOptions.legend"
      [plotOptions]="chartOptions.plotOptions"
      [dataLabels]="chartOptions.dataLabels"
    ></apx-chart>
  `,
})
export class ApexChartBarComponent implements OnInit, OnChanges, OnDestroy {
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

      let color = "#fff";
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
            name: "Events",
            data: this.series,
          },
        ],
        tooltip: {
          x: {
            show: true
          },
          y: {
            formatter: (value) => {
              return this.helperService.nFormatterPipe(value, 2);
            },
          }
        },
        chart: {
          height: 330,
          type: "bar",
          events: {
            click: function (chart, w, e) {
            },
          },
        },
        colors: colors,
        plotOptions: {
          bar: {
            barHeight: "70%",
            columnWidth: "40%",
            distributed: true,
            horizontal: this.horizontalOrintation,
          },
        },
        dataLabels: {
          formatter: (value) => {
            return this.helperService.nFormatterPipe(value, 2);
          },
          enabled: true,
          style: {
            fontSize: "12px",
            colors: [color],
          },
        },
        legend: {
          show: false,
          // position: 'bottom',
          // markers: {
          //   width: 30,
          //   height: 8
          // }
        },
        xaxis: {
          categories: this.labels,
          tickAmount: 3,
          labels: {
            formatter: (value) => {
              return this.helperService.nFormatterPipe(value, 2);
            },
            style: {
              colors: colors,
              fontSize: "13px",
              // fontWeight: 500,
            },
          },
          axisBorder: {
            color: "rgba(" + color + ",0.2)",
          },
        },
        yaxis: {
          labels: {
            // formatter: function (value) {
            //   // return value + "$";
            // },

            style: {
              color: color,
              // fontSize: "14px",
              // fontWeight: 500,
            },
          },
        },
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
