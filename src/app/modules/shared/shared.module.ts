import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from '../charts/charts.module';

import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';

import { QueryBuilderModule } from "@syncfusion/ej2-angular-querybuilder";

import { MaximizeDirective } from './directives/maximize.directive';
import { NumberOnlyDirective } from './directives/numbersOnly.directive';
import { NumberRangeDirective } from './directives/numberRange.directive';
import { AbsoluteNumberPipe } from './pipes/number-absolute.pipe';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import {
  BigDataDurationPipe, CapitalizePipe, DatePipe, DifferenceInWords, DurationPipe, ElasticDatePipe, FilterListPipe, HighLightPipe,
  NumberWithCommasPipe, PluralPipe, RoundPipe, TimingPipe
} from './pipes';

import { NavHeaderComponent } from './components/layout/nav-header/nav-header.component';
import { NavMenuComponent } from './components/layout/nav-menu/nav-menu.component';
import { DaterangeCalendarComponent } from './components/filters/daterange-calendar/daterange-calendar.component';
import { BigdataFiltersPopupComponent } from './components/filters/bigdata-filters-popup/bigdata-filters-popup.component';
import { EventsListItemComponent } from './components/layout/events-list-item/events-list-item.component';
import { EventDrawerItemComponent } from './components/layout/event-drawer-item/event-drawer-item.component';
import { DaterangeMenuComponent } from './components/filters/daterange-menu/daterange-menu.component';
import { EventHistogramComponent } from './components/layout/event-histogram/event-histogram.component';
import { EventsListComponent } from './components/layout/events-list/events-list.component';
import { EventStatFiltersComponent } from './components/filters/event-stat-filters/event-stat-filters.component';
import { RadiusListComponent } from './components/layout/radius-list/radius-list.component';
import { RadiusStatFiltersComponent } from './components/filters/radius-stat-filters/radius-stat-filters.component';
import { DaterangeCustomComponent } from './components/filters/daterange-custom/daterange-custom.component';
import { EventsDownloadModalComponent } from './components/layout/events-download-modal/events-download-modal.component';
import { DownloadBarComponent } from './components/layout/download-bar/download-bar.component';
import { RouterModule } from '@angular/router';
import { RolesListPopupComponent } from './components/layout/roles-list-popup/roles-list-popup.component';
import { UserPopoupComponent } from './components/layout/user-popoup/user-popoup.component';
import { RolesListComponent } from './components/layout/roles-list/roles-list.component';
import { CustomHeatMapComponent } from './components/layout/custom-heat-map/custom-heat-map.component';
import { ImagePickerComponent } from './components/filters/image-picker/image-picker.component';
import { MultiImagePickerComponent } from './components/filters/multi-image-picker/multi-image-picker.component';

const ant_modules = [
  NzDatePickerModule, NzPopoverModule, NzDividerModule, NzIconModule, NzSelectModule, NzInputModule, NzListModule,
  NzCheckboxModule, NzPaginationModule, NzCollapseModule, NzDrawerModule, NzTableModule, NzPopconfirmModule, NzModalModule,
  NzToolTipModule, NzFormModule, NzTagModule, NzProgressModule, NzRadioModule, NzTreeModule, NzTreeViewModule, NzBreadCrumbModule,
  NzStepsModule, NzTabsModule
];
const components = [
  NavHeaderComponent, NavMenuComponent, DaterangeCalendarComponent, BigdataFiltersPopupComponent, EventsListItemComponent,
  EventDrawerItemComponent, DaterangeMenuComponent, EventHistogramComponent, EventsListComponent, EventStatFiltersComponent,
  RadiusListComponent, RadiusStatFiltersComponent, DaterangeCustomComponent, EventsDownloadModalComponent, DownloadBarComponent,
  RolesListPopupComponent, UserPopoupComponent, RolesListComponent, CustomHeatMapComponent, ImagePickerComponent,
  MultiImagePickerComponent
];
const pipes = [
  BigDataDurationPipe, CapitalizePipe, DatePipe, DifferenceInWords, DurationPipe, ElasticDatePipe, FilterListPipe,
  HighLightPipe, AbsoluteNumberPipe, NumberWithCommasPipe, PluralPipe, RoundPipe, ShortNumberPipe, TimingPipe
];
const directives = [
  MaximizeDirective, NumberRangeDirective, NumberOnlyDirective
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChartsModule,
    NgxSpinnerModule,
    QueryBuilderModule,
    ...ant_modules
  ],
  declarations: [...components, ...pipes, ... directives],
  exports: [
    FormsModule, ReactiveFormsModule, ChartsModule, NgxSpinnerModule, QueryBuilderModule,
    ...ant_modules, ...components, ...pipes, ... directives
  ],
  providers: []
})
export class SharedModule { }
