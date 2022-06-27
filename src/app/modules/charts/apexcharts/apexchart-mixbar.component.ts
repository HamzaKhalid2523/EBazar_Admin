import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "apex-chart-mixbar",
  template: `
    <apx-chart
      *ngIf="series.length"
      id="apexChartMixBar"
      [series]="chartOptions.series"
      [chart]="chartOptions.chart"
      [dataLabels]="chartOptions.dataLabels"
      [colors]="chartOptions.colors"
      [plotOptions]="chartOptions.plotOptions"
      [xaxis]="chartOptions.xaxis"
      [yaxis]="chartOptions.yaxis"
      [tooltip]="chartOptions.tooltip"
      [stroke]="chartOptions.stroke"
      [grid]="chartOptions.grid"
    ></apx-chart>
  `,
})
export class ApexChartMixBarComponent implements OnInit, OnChanges, OnDestroy {
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
    this.helperService.getBarGroupStatus().subscribe(() => {
      this.createChart();
    });
  }
  ngOnChanges() {
    this.createChart();
  }
  createChart() {
    this.createChartData();

    if (this.series.length) {

      let color = "#dddddd";

      // const colors = ['#0883e0', '#08ca8a'];
      const colors = [
        "#5AA454",
        "#E44D25",
        "#CFC0BB",
        "#7aa3e5",
        "#a8385d",
        "#aae3f5",
      ];
      this.chartOptions = {
        series: this.series,
        chart: {
          type: "bar",
          height: 400,
        },
        colors: colors,
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
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          formatter: (value) => {
            return this.helperService.nFormatterPipe(value, 2);
          },
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["#fff"],
        },
        grid: {
          show: true,
          borderColor: color,
        },
        xaxis: {
          categories: this.labels,
          labels: {
            formatter: (value) => {
              return this.helperService.nFormatterPipe(value, 2);
            },
            style: {
              colors: colors,
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

    // this.chartData.forEach(element => {
    //     this.series.push(element.doc_count);
    //     this.labels.push(element.key);
    // });

    for (let i = 0; i < this.chartData.length; i++) {
      const mainData = this.chartData[i];
      const seriesData = [];

      for (let j = 0; j < mainData?.data.length; j++) {
        const innerData = mainData?.data[j];
        seriesData.push(innerData?.doc_count);

        if (i === 0) {
          const labelsData = [innerData?.key];
          this.labels.push(labelsData);
        } else if (i > 0) {
          this.labels[j].push(innerData?.key);
        }
      }

      this.series.push({ name: mainData?.title, data: seriesData });
    }
  }
}
