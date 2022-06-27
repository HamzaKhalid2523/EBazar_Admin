import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-radius-stat-filters',
  templateUrl: './radius-stat-filters.component.html',
  styleUrls: ['./radius-stat-filters.component.scss']
})
export class RadiusStatFiltersComponent implements OnInit, OnChanges {

  @Output() selectedData = new EventEmitter<any>();
  @Input() recordsLoading = false;
  @Input() records = [];

  callingStationIds = [];
  calledStationIds = [];
  cellIds = [];
  areaCodes = [];
  imeis = [];
  imsis = [];
  privateIps = [];

  callingStationIdsOptions = [];
  calledStationIdsOptions = [];
  cellIdsOptions = [];
  areaCodesOptions = [];
  imeisOptions = [];
  imsisOptions = [];
  privateIpsOptions = [];

  callingStationIdsAll = false;
  calledStationIdsAll = false;
  cellIdsAll = false;
  areaCodesAll = false;
  imeisAll = false;
  imsisAll = false;
  privateIpsAll = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.initData();
    this.getUniqueStats();
  }

  initData() {
    this.callingStationIds = [];
    this.calledStationIds = [];
    this.cellIds = [];
    this.areaCodes = [];
    this.imeis = [];
    this.imsis = [];
    this.privateIps = [];

    this.callingStationIdsOptions = [];
    this.calledStationIdsOptions = [];
    this.cellIdsOptions = [];
    this.areaCodesOptions = [];
    this.imeisOptions = [];
    this.imsisOptions = [];
    this.privateIpsOptions = [];
  }

  getUniqueStats() {
    this.records.forEach((record: any) => {
      if(this.callingStationIds.indexOf(record?.calling_station_id) === -1) this.callingStationIds.push(record?.calling_station_id);
      if(this.calledStationIds.indexOf(record?.called_station_id) === -1) this.calledStationIds.push(record?.called_station_id);
      if(this.cellIds.indexOf(record?.cell_id) === -1) this.cellIds.push(record?.cell_id);
      if(this.areaCodes.indexOf(record?.area_code) === -1) this.areaCodes.push(record?.area_code);
      if(this.imeis.indexOf(record?.IMEI) === -1) this.imeis.push(record?.IMEI);
      if(this.imsis.indexOf(record?.IMSI) === -1) this.imsis.push(record?.IMSI);
      if(this.privateIps.indexOf(record?.framed_ip) === -1) this.privateIps.push(record?.framed_ip);
    });

    this.setCallingOption(this.callingStationIdsAll);
    this.setCalledOption(this.calledStationIdsAll);
    this.setCellOption(this.cellIdsAll);
    this.setAreaOption(this.areaCodesAll);
    this.setImeiOption(this.imeisAll);
    this.setImsiOption(this.imsisAll);
    this.setPrivateOption(this.privateIpsAll);
  }

  setCallingOption(viewAll = true) {
    this.callingStationIdsOptions = [];
    if(viewAll) {
      this.callingStationIds.forEach((item: any) => {this.callingStationIdsOptions.push({label: item, value: item})});
    } else {
      this.callingStationIds.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.callingStationIdsOptions.push({label: item, value: item})
      });
    }
  }

  setCalledOption(viewAll = true) {
    this.calledStationIdsOptions = [];
    if(viewAll) {
      this.calledStationIds.forEach((item: any) => {this.calledStationIdsOptions.push({label: item, value: item})});
    } else {
      this.calledStationIds.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.calledStationIdsOptions.push({label: item, value: item})
      });
    }
  }

  setCellOption(viewAll = true) {
    this.cellIdsOptions = [];
    if(viewAll) {
      this.cellIds.forEach((item: any) => {this.cellIdsOptions.push({label: item, value: item})});
    } else {
      this.cellIds.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.cellIdsOptions.push({label: item, value: item})
      });
    }
  }

  setAreaOption(viewAll = true) {
    this.areaCodesOptions = [];
    if(viewAll) {
      this.areaCodes.forEach((item: any) => {this.areaCodesOptions.push({label: item, value: item})});
    } else {
      this.areaCodes.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.areaCodesOptions.push({label: item, value: item})
      });
    }
  }

  setImeiOption(viewAll = true) {
    this.imeisOptions = [];
    if(viewAll) {
      this.imeis.forEach((item: any) => {this.imeisOptions.push({label: item, value: item})});
    } else {
      this.imeis.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.imeisOptions.push({label: item, value: item})
      });
    }
  }

  setImsiOption(viewAll = true) {
    this.imsisOptions = [];
    if(viewAll) {
      this.imsis.forEach((item: any) => {this.imsisOptions.push({label: item, value: item})});
    } else {
      this.imsis.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.imsisOptions.push({label: item, value: item})
      });
    }
  }

  setPrivateOption(viewAll = true) {
    this.privateIpsOptions = [];
    if(viewAll) {
      this.privateIps.forEach((item: any) => {this.privateIpsOptions.push({label: item, value: item})});
    } else {
      this.privateIps.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.privateIpsOptions.push({label: item, value: item})
      });
    }
  }

  // Filter
  processFilter(field, list) {
    this.selectedData.emit({field, list});
  }
}
