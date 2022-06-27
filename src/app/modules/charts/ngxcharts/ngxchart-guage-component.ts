import { Component, OnDestroy, Input, OnChanges, OnInit } from "@angular/core";
import { HelperService } from "src/app/core/services/helper/helper.service";

@Component({
  selector: "ngx-chart-guage",
  template: `
    <ngx-charts-gauge
      id="ngxChartGuage"
      [view]="[containerRef.offsetWidth, 350]"
      [scheme]="colorScheme"
      [results]="data"
      [max]="data[0].value"
      [min]="data[data.length-1].value"
      [bigSegments]="10"
      [smallSegments]="2"
      [legend]="legend"
      [legendPosition]="legendPosition"
      [valueFormatting]="chartOptions.formatter"
      [axisTickFormatting]="axisTickFormatting"
    >
    </ngx-charts-gauge>
  `,
})
export class NGXChartGuageComponent implements OnChanges, OnDestroy, OnInit {
  @Input() data: any[];
  @Input() colorScheme = {
    domain: ["#5AA454", "#E44D25", "#CFC0BB", "#7aa3e5", "#a8385d", "#aae3f5"],
  };
  @Input() view: any[] = [500, 300];
  @Input() showLegend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() containerRef;
  @Input() legend: boolean = true;
  @Input() legendPosition: string = "below";

  axisTickFormatting;
  chartOptions;

  constructor(
    private helperService: HelperService
  ) {}
  ngOnInit() {
  }
  ngOnChanges() {
    this.chartOptions = {
      formatter: (value) => {
        return this.helperService.nFormatterPipe(value, 2);
      },
    };
    this.axisTickFormatting = ((data) => {
      if(data && (typeof data === 'string')) {
        let temp = data.indexOf(",") != -1
          ? this.helperService.nFormatterPipe(parseFloat(data.replace(",", "")), 2)
          : this.helperService.nFormatterPipe(parseFloat(data), 2);
        return temp;
      } else if(typeof data == 'number') {
        return this.helperService.nFormatterPipe(data, 2);
      }
    });
  }
  ngOnDestroy() {}
}
