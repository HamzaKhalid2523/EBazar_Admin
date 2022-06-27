import { Component, AfterViewInit, Input, OnChanges, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { HelperService } from "src/app/core/services/helper/helper.service";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-radius-pie",
  template: ` <div *ngIf="chartId" [id]="chartId" class="amchart" style="width: 100%; height: 100%; min-height: 400px;"></div> `,
})
export class AMChartRadiusPieComponent implements OnInit, OnChanges, AfterViewInit {

  subscriptions: Subscription[] = [];
  @Input() chartData = [];
  @Input() chartId;
  @Output() chartDataEmit = new EventEmitter<any>();
  data = [];
  chart;

  constructor(
    private helperService: HelperService
    ) {}
  ngOnInit() {
  }
  ngOnChanges() {
    this.createChart();
  }
  ngAfterViewInit(): void {
    
    setTimeout(() => {
      this.createChart();

    }, 50);

  }

  createChart() {
    setTimeout(() => {
      var chart = am4core.create(this.chartId, am4charts.PieChart);
      chart.hiddenState.properties.opacity = 0;
  
      chart.data = this.data;
      chart.radius = am4core.percent(60);
      chart.innerRadius = am4core.percent(40);
      chart.startAngle = 180;
      chart.endAngle = 360;
  
      var series = chart.series.push(new am4charts.PieSeries());
      series.dataFields.value = "count";
      series.dataFields.category = "key";
      series.slices.template.stroke = new am4core.InterfaceColorSet().getFor("background");
      series.slices.template.strokeWidth = 0;
      series.slices.template.strokeOpacity = 1;
      series.slices.template.states.getKey("hover").properties.shiftRadius = 0.05;
      series.slices.template.states.getKey("hover").properties.scale = 1;
      series.slices.template.tooltipText = "{category}: [bold]{value}[/]";
      series.labels.template.tooltipText = "{category}: [bold]{value}[/]";
      series.labels.template.text = `{category}`;
      series.labels.template.fontSize = 12;
      series.labels.template.propertyFields.fill = "color";
      series.ticks.template.propertyFields.stroke = "color";
  
      series.slices.template.cornerRadius = 5;
      series.slices.template.innerCornerRadius = 5;
      series.slices.template.draggable = true;
      series.slices.template.inert = true;
      series.alignLabels = false;
  
      series.hiddenState.properties.startAngle = 90;
      series.hiddenState.properties.endAngle = 90;
      
      this.createData();
    }, 500);

  
    // const selfRef = this;
    // var label = chart.seriesContainer.createChild(am4core.Label);
    // label.textAlign = "middle";
    // label.horizontalCenter = "middle";
    // label.verticalCenter = "middle";
    // label.adapter.add("text", function(text, target){
    // return `[font-size:25px fill: #555]Total[/]:\n[bold font-size:20px fill:#555]` + selfRef.helperService.nFormatterPipe(series.dataItem.values.value.sum, 2) + "[/]";
    // })
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
    console.log('radius pie')
  }
}
