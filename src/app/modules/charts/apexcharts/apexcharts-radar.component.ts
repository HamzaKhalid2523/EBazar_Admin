import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "apex-chart-radar",
  template: `
    <apx-chart
        *ngIf="chartOptions"
        id="apexChartRadar"
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [xaxis]="chartOptions.xaxis"
        [yaxis]="chartOptions.yaxis"
        [colors]="chartOptions.colors"
        [markers]="chartOptions.markers"
        [tooltip]="chartOptions.tooltip"
        [plotOptions]="chartOptions.plotOptions"
        [dataLabels]="chartOptions.dataLabels"
    ></apx-chart>
  `,
})
export class ApexChartRadarComponent implements OnInit, OnChanges, OnDestroy {

  @Input() chartData;
  @Input() totalCount;
  @Input() title;

  series = [];
  labels = [];
  chartOptions;

  constructor(
    private helperService: HelperService
    ) {}
    ngOnInit() {
      this.helperService.getSidemenuStatus().subscribe(() => {
        this.createChart();
      });
      this.helperService.getRadarStatus().subscribe(() => {
        this.createChart();
      });
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
      series: [
        {
          name: `Events (${this.title})`,
          data: this.series
        }
      ],
      chart: {
        height: 330,
        type: "radar"
      },
      dataLabels: {
        formatter: (value) => {
          return this.helperService.nFormatterPipe(value, 2);
        },
        enabled: true,
      },
      plotOptions: {
        radar: {
          size: 140,
          polygons: {
            strokeColor: colorsChart[0],
            fill: {
              colors: [colorsChart[1], colorsChart[2]]
            }
          }
        }
      },
      colors: colors,
      markers: {
        size: 4,
        colors: ["#fff"],
        strokeColors: colors,
        strokeWidth: 2
      },
      tooltip: {
        y: {
          formatter: (value) => {
            return this.helperService.nFormatterPipe(value, 2);
          },
        }
      },
      xaxis: {
        categories: this.labels,
        labels: {
          style: {
            colors: '#000'
          }
        }
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          formatter: function(val, i) {
            if (i % 2 === 0) {
              return val;
            } else {
              return "";
            }
          }
        }
      }
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
