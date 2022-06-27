import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "apex-chart-radial-pie",
  template: `
    <apx-chart
        *ngIf="chartOptions"
        id="apexChartRadial"
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [plotOptions]="chartOptions.plotOptions"
        [labels]="chartOptions.labels"
        [legend]="chartOptions.legend"
        [colors]="chartOptions.colors"
        [responsive]="chartOptions.responsive"
    ></apx-chart>
  `,
})
export class ApexChartRadialPieComponent implements OnInit, OnChanges, OnDestroy {

  @Input() chartData;
  @Input() totalCount;

  series = [];
  labels = [];
  chartOptions;

  constructor(
    private helperService: HelperService
    ) {}
    ngOnInit() {
      // this.helperService.getSidemenuStatus().subscribe(() => {
      //   this.createChart();
      // });
      // this.helperService.getRadarStatus().subscribe(() => {
      //   this.createChart();
      // });
    }

  ngOnChanges() {
    if(this.chartData) {
      this.createChart();
    }
  }

  createChart() {
    this.createChartData();

    let colorsChart = ["#e9e9e9", "#f8f8f8", "#ffffff"];

    const colors = ["#00E396", "#bdb4b4", '#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'];

    this.chartOptions = {
      series: this.series,
      chart: {
        height: 390,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: colors,
      labels: this.labels,
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 50,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName, opts) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              show: false
            }
          }
        }
      ]
    };
  }

  createChartData() {
    this.series = [];
    this.labels = [];

    this.chartData.forEach(element => {
      this.series.push(element.doc_count);
      this.labels.push(element.key);
    });
  }

  ngOnDestroy() {}
}
