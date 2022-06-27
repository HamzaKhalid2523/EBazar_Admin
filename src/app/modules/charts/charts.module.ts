import { NgModule } from '@angular/core';
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { NgApexchartsModule } from 'ng-apexcharts';
import { AMChartCustomPieComponent } from './amcharts/amchart-custom-pie.component';
import { AMChartDataLinkComponent } from './amcharts/amchart-datalink.component';
import { AMChartFunnelComponent } from './amcharts/amchart-funnel.component';
import { AMChartMapComponent } from './amcharts/amchart-map.component';
import { AMChartRadiusPieComponent } from './amcharts/amchart-radius-pie.component';
import { AMChartHBarComponent } from './amcharts/amcharts-hbar.component';
import { AMChartHorizontalBarComponent } from './amcharts/amcharts-horizontal-bar.component';
import { AMChartRadialPieComponent } from './amcharts/amcharts-radial-pie.component';
import { AMChartSemiCircleComponent } from './amcharts/amcharts-semi-circle.component';
import { AMChartVBarComponent } from './amcharts/amcharts-vbar.component';

import { ApexChartBarComponent } from './apexcharts/apexchart-bar.component';
import { ApexChartLineComponent } from './apexcharts/apexchart-line.component';
import { ApexChartMixBarComponent } from './apexcharts/apexchart-mixbar.component';
import { ApexChartPieComponent } from './apexcharts/apexchart-pie.component';
import { ApexChartHistogramComponent } from './apexcharts/apexcharts-histogram.component';
import { ApexChartRadarComponent } from './apexcharts/apexcharts-radar.component';
import { ApexChartRadialPieComponent } from './apexcharts/apexcharts-radial-pie.component';
import { NGXChartGuageComponent } from './ngxcharts/ngxchart-guage-component';

const components = [
  ApexChartPieComponent, ApexChartBarComponent, ApexChartMixBarComponent, ApexChartHistogramComponent,
  NGXChartGuageComponent, ApexChartRadarComponent, ApexChartRadialPieComponent, AMChartRadiusPieComponent,
  ApexChartLineComponent, AMChartRadialPieComponent, AMChartHorizontalBarComponent, AMChartHBarComponent,
  AMChartVBarComponent, AMChartSemiCircleComponent, AMChartFunnelComponent, AMChartCustomPieComponent,
  AMChartMapComponent, AMChartDataLinkComponent
];

@NgModule({
  imports: [
    NgxChartsModule,
    NgApexchartsModule
  ],
  declarations: [...components],
  exports: [...components]
})
export class ChartsModule { }
