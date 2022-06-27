import { Component, OnInit, NgZone, OnChanges, Input, AfterViewInit } from "@angular/core";
import { Subscription } from "rxjs";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
am4core.addLicense("ch-custom-attribution");

@Component({
  selector: "amchart-data-link",
  template: `
    <div
      id="amChartDataLink"
      style="width: 100%; height: 100%;"
    ></div>
  `,
})
export class AMChartDataLinkComponent implements OnInit,AfterViewInit, OnChanges {

  private chart: am4plugins_forceDirected.ForceDirectedTree;
  subscriptions: Subscription[] = [];

  @Input() chartData;
  @Input() calledFrom;

  data;

  constructor(
  ) {}
  ngOnInit() {
    this.destroyChart();
    this.createData();
  }
  destroyChart(){
    let old_chart = this.getChart('amChartDataLink');
    if(old_chart){
      old_chart.dispose();
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.createChart();
    }, 50);
  }
  ngOnChanges() {}
  getChart(id) {
    return am4core.registry.baseSprites.find(function(chartObj) {
      return chartObj.htmlContainer.id === id;
    });
  }
  createChart() {
    if(this.data && this.data.length) {

      let color = "#000000";

      am4core.options.autoDispose = true;
      let chart = am4core.create("amChartDataLink", am4plugins_forceDirected.ForceDirectedTree);
      chart.responsive.enabled = true;
      // chart.zoomable = true;
      // chart.zoomOutButton.align = "right";
      // chart.zoomOutButton.valign = "top";

      var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
      networkSeries.data = this.data;

      networkSeries.dataFields.linkWith = "linkWith";
      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.id = "name";
      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.children = "children";

      networkSeries.nodes.template.label.text = "{name}"
      networkSeries.nodes.template.label.fill = am4core.color(color);
      networkSeries.fontSize = 12;
      networkSeries.linkWithStrength = 1;
      networkSeries.maxRadius = 60;
      // networkSeries.minRadius = 60;

      var nodeTemplate = networkSeries.nodes.template;
      nodeTemplate.tooltipText = "{name}";
      nodeTemplate.fillOpacity = 1;
      nodeTemplate.label.hideOversized = true;
      nodeTemplate.label.truncate = true;

      var linkTemplate = networkSeries.links.template;
      var linkHoverState = linkTemplate.states.create("hover");
      linkHoverState.properties.strokeOpacity = 1;
      linkHoverState.properties.strokeWidth = 5;
      linkTemplate.strokeWidth = 4;

      nodeTemplate.events.on("over", function (event) {
        event.target.dataItem.childLinks.each((link) => link.isHover = true)
      })
      nodeTemplate.events.on("out", function (event) {
        event.target.dataItem.childLinks.each((link) => link.isHover = false)
      })

      if(this.calledFrom == "app-link-analysis" || this.calledFrom == "email-link-analysis"){
        // Configure icons
        var icon = networkSeries.nodes.template.createChild(am4core.Image);
        icon.propertyFields.href = "image";
        icon.horizontalCenter = "middle";
        icon.verticalCenter = "middle";
        icon.width = 40;
        icon.height = 40;

        nodeTemplate.label.hideOversized = true;
        nodeTemplate.label.truncate = true;

        // networkSeries.centerStrength = 0;
        networkSeries.linkWithStrength = 1;
        networkSeries.manyBodyStrength = -50;
        networkSeries.links.template.distance = 4;
        // networkSeries.links.template.strength = 2;
        // Configure circles
        networkSeries.nodes.template.circle.disabled = true;
        // Add labels
        networkSeries.nodes.template.label.text = "[bold]{name}";
        networkSeries.nodes.template.label.valign = "middle";
        networkSeries.nodes.template.label.fill = am4core.color(color);
        networkSeries.nodes.template.label.dy = 10;
        networkSeries.nodes.template.tooltipText = "[bold]{name}";
        networkSeries.fontSize = 12;
        networkSeries.minRadius = 20;
        networkSeries.maxRadius = 20;

      }
    }
  }

  createData() {
    this.data = this.chartData;
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.dispose();
    }
  }
}
