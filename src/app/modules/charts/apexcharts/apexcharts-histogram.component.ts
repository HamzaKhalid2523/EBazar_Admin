import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "apex-chart-histogram",
  template: `
    <apx-chart
      *ngIf="series.length"
      id="apexChartHistogram"
      [series]="chartOptions.series"
      [chart]="chartOptions.chart"
      [colors]="chartOptions.colors"
      [xaxis]="chartOptions.xaxis"
      [yaxis]="chartOptions.yaxis"
      [dataLabels]="chartOptions.dataLabels"
      [markers]="chartOptions.markers"
      [stroke]="chartOptions.stroke"
      [grid]="chartOptions.grid"
      [tooltip]="chartOptions.tooltip"
    ></apx-chart>
  `,
})
export class ApexChartHistogramComponent implements OnInit, OnChanges, OnDestroy {
  themeSubscription: any;
  chartOptions;
  @Input() horizontalOorintation = true;

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
    this.helperService.getTimelineStatus().subscribe(() => {
      this.createChart();
    });
  }
  ngOnChanges() {
    this.createChart();
  }

  createChart() {
    this.createChartData();

    if (this.series.length) {
      let color = "#`111111`";

      const colors = [
        "#3F83F8",
        "#bdb4b4",
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
            name: "All Events",
            data: this.series
          }
        ],
        chart: {
          type: "area",
          width: "100%",
          height: 350,
          zoom: {
            enabled: false,
          },
        },
        colors: colors,
        xaxis: {
          tickAmount: 10,
          categories: this.labels,
          labels: {
            style: {
              colors: color,
              fontSize: "13px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        yaxis: {
          tickAmount: 3,
          labels: {
            formatter: (value) => {
              return this.helperService.nFormatterPipe(value, 2);
            },
            minWidth: 40,
            style: {
              colors: color,
              fontSize: "13px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
          },
        },
        dataLabels: {
          enabled: false,
          formatter: (value) => {
            return this.helperService.nFormatterPipe(value, 2);
          },
        },
        markers: {
          size: 3,
          hover: {
            size: 6,
          },
        },
        stroke: {
          curve: "smooth",
          width: 2,
        },
        grid: {
          borderColor: "rgba(156, 159, 166,0.40)",
          row: {
            opacity: 0.5,
          },
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
      };
    }
  }

  ngOnDestroy() {}

  public generateDayWiseTimeSeries(baseval, count, yrange): any[] {
    let i = 0;
    let series = [];
    while (i < count) {
      var x = baseval;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push([x, y]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

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
