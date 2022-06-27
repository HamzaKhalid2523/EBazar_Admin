import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-event-stat-filters',
  templateUrl: './event-stat-filters.component.html',
  styleUrls: ['./event-stat-filters.component.scss']
})
export class EventStatFiltersComponent implements OnInit {

  @Output() selectedData = new EventEmitter<any>();
  @Input() recordsLoading = false;
  @Input() records = [];

  clientIps = [];
  serverIps = [];
  clientPorts = [];
  serverPorts = [];
  protocols = [];
  snis = [];

  clientIpsOptions = [];
  serverIpsOptions = [];
  clientPortsOptions = [];
  serverPortsOptions = [];
  protocolsOptions = [];
  snisOptions = [];
  privateIpsOptions = [];

  clientIpsAll = false;
  serverIpsAll = false;
  clientPortsAll = false;
  serverPortsAll = false;
  protocolsAll = false;
  snisAll = false;
  privateIpsAll = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.initData();
    this.getUniqueStats();
  }

  initData() {
    this.clientIps = [];
    this.serverIps = [];
    this.clientPorts = [];
    this.serverPorts = [];
    this.protocols = [];
    this.snis = [];

    this.clientIpsOptions = [];
    this.serverIpsOptions = [];
    this.clientPortsOptions = [];
    this.serverPortsOptions = [];
    this.protocolsOptions = [];
    this.snisOptions = [];
    this.privateIpsOptions = [];
  }

  getUniqueStats() {
    this.records.forEach((record: any) => {
      if(this.clientIps.indexOf(record?.client_addr) === -1 && record?.client_addr) this.clientIps.push(record?.client_addr);
      if(this.serverIps.indexOf(record?.server_addr) === -1 && record?.server_addr) this.serverIps.push(record?.server_addr);
      if(this.clientPorts.indexOf(record?.client_port) === -1 && record?.client_port) this.clientPorts.push(record?.client_port);
      if(this.serverPorts.indexOf(record?.server_port) === -1 && record?.server_port) this.serverPorts.push(record?.server_port);
      if(this.protocols.indexOf(record?.protocol) === -1 && record?.protocol) this.protocols.push(record?.protocol);
      if(this.snis.indexOf(record?.sni) === -1 && record?.sni) this.snis.push(record?.sni);
    });

    this.setClientIpOption(this.clientIpsAll);
    this.setServerIpOption(this.serverIpsAll);
    this.setClientPortOption(this.clientPortsAll);
    this.setServerPortOption(this.serverPortsAll);
    this.setProtocolOption(this.protocolsAll);
    this.setSniOption(this.snisAll);
  }

  setClientIpOption(viewAll = true) {
    this.clientIpsOptions = [];
    if(viewAll) {
      this.clientIps.forEach((item: any) => {this.clientIpsOptions.push({label: item, value: item})});
    } else {
      this.clientIps.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.clientIpsOptions.push({label: item, value: item})
      });
    }
  }

  setServerIpOption(viewAll = true) {
    this.serverIpsOptions = [];
    if(viewAll) {
      this.serverIps.forEach((item: any) => {this.serverIpsOptions.push({label: item, value: item})});
    } else {
      this.serverIps.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.serverIpsOptions.push({label: item, value: item})
      });
    }
  }

  setClientPortOption(viewAll = true) {
    this.clientPortsOptions = [];
    if(viewAll) {
      this.clientPorts.forEach((item: any) => {this.clientPortsOptions.push({label: item, value: item})});
    } else {
      this.clientPorts.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.clientPortsOptions.push({label: item, value: item})
      });
    }
  }

  setServerPortOption(viewAll = true) {
    this.serverPortsOptions = [];
    if(viewAll) {
      this.serverPorts.forEach((item: any) => {this.serverPortsOptions.push({label: item, value: item})});
    } else {
      this.serverPorts.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.serverPortsOptions.push({label: item, value: item})
      });
    }
  }

  setProtocolOption(viewAll = true) {
    this.protocolsOptions = [];
    if(viewAll) {
      this.protocols.forEach((item: any) => {this.protocolsOptions.push({label: item, value: item})});
    } else {
      this.protocols.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.protocolsOptions.push({label: item, value: item})
      });
    }
  }

  setSniOption(viewAll = true) {
    this.snisOptions = [];
    if(viewAll) {
      this.snis.forEach((item: any) => {this.snisOptions.push({label: item, value: item})});
    } else {
      this.snis.forEach((item: any, index: any) => {
        if(index >= 5) return;
        this.snisOptions.push({label: item, value: item})
      });
    }
  }

  // Filter
  processFilter(field, list) {
    this.selectedData.emit({field, list});
  }
}
