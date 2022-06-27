import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BigdataHelperService } from 'src/app/core/services/helper/bigdata-helper.service';
import { ListingService } from 'src/app/core/services/helper/listings.service';

@Component({
  selector: 'ngx-bigdata-filters-popup',
  templateUrl: './bigdata-filters-popup.component.html',
  styleUrls: ['./bigdata-filters-popup.component.scss']
})
export class BigdataFiltersPopupComponent implements OnInit {

  @Output() selectedData = new EventEmitter<any>();
  @Output() valueChanged = new EventEmitter<any>();
  @Output() resetFilters = new EventEmitter<any>();
  @Input() dataType = 'events';
  @Input() ipdrType = 'events';
  @Input() tags = [];
  @Input() selectedFilter;
  @Input() selectedKeyword;
  @Input() selectedOperator;
  @Input() filterValue;
  @Input() selectedFilterId;
  @Input() tagUpdated = false;

  operators = [];
  equalOperator = [];
  queryItems = [];
  protocolsListing = [];
  filteredProtocolList = [];
  httpMethodsListing = [];
  httpCodesListing = [];
  argumentTypes = [
    { name: "yes", label: "Yes" },
    { name: "no", label: "No" },
  ];
  emailProtocols = [
    { name: "imap", label: "IMAP" },
    { name: "pop3", label: "POP3" },
    { name: "smtp", label: "SMTP" },
  ];

  isLoadingProtocol = false;

  constructor(
    private listingService: ListingService,
    private bigdataHelperService: BigdataHelperService
  ) { }

  ngOnInit(): void {
    this.operators = [...this.listingService.operators];
    this.equalOperator = [...this.listingService.equalOperator];

    if(this.dataType === 'events') {
      this.queryItems = [...this.listingService.eventsQueryItems];
      this.protocolsListing = [...this.listingService.serviceProtocolListing];
    } else if(this.dataType === 'genesis-events') {
      this.queryItems = [...this.listingService.genesisEventsQueryItems];
      this.protocolsListing = [...this.listingService.serviceProtocolListing];
    } else if(this.dataType === 'email-events') {
      this.queryItems = [...this.listingService.emailQueryItems];
      this.protocolsListing = [...this.emailProtocols];
    } else if(this.dataType === 'http-events') {
      this.queryItems = [...this.listingService.httpQueryItems];
      this.httpMethodsListing = [...this.listingService.httpMethods];
      this.httpCodesListing = [...this.listingService.httpStatusCodes];
    } else if(this.dataType === 'ott') {
      this.queryItems = [...this.listingService.ottQueryItems];
      this.protocolsListing = [...this.listingService.ottProtocolsListing];
    } else if(this.dataType === 'radius-events') {
      this.queryItems = [...this.listingService.radiusQueryItems];
    } else if(this.dataType === 'visitor-analytics') {
      this.queryItems = [...this.listingService.visitorAnalyticsQueryItems];
    }

    if(this.ipdrType === 'voip') {
      this.protocolsListing = [...this.listingService.voipProtocolsListing];
    } else if(this.ipdrType === 'vpn') {
      this.protocolsListing = [...this.listingService.vpnProtocolsListing];
    } else if(this.ipdrType === 'social') {
      this.protocolsListing = [...this.listingService.socialProtocolsListing];
    } else if(this.ipdrType === 'crypto') {
      this.protocolsListing = [...this.listingService.cryptoProtocolsListing];
    } else if(this.ipdrType === 'streaming') {
      this.protocolsListing = [...this.listingService.streamingProtocolsListing];
    }

    if(this.protocolsListing.length && this.protocolsListing.length > 100) {
      this.filteredProtocolList = [...this.protocolsListing.slice(0, 100)];
    }
  }

  protocolChanges(value) {
    this.isLoadingProtocol = true;

    if(!value || !value.length) this.filteredProtocolList = [...this.protocolsListing.slice(0, 100)];
    else this.filteredProtocolList = this.protocolsListing.filter(e=> e.toLowerCase().includes(value.toLowerCase()));

    this.isLoadingProtocol = false;
  }

  dataChanged() {
    this.valueChanged.emit({
      selectedFilter: this.selectedFilter,
      selectedOperator: this.selectedOperator,
      filterValue: this.filterValue
    });
  }

  preProcessFilter() {
      const obj = this.bigdataHelperService.getProcessedFilter(
        this.queryItems, this.tags, this.selectedFilter, this.selectedOperator, this.filterValue, this.selectedFilterId, this.tagUpdated, this.selectedKeyword
      );

      this.emitSelectedData(obj);
  }

  emitSelectedData(data) {
    this.selectedData.emit(data);
  }

  emitResetFilters() {
    this.resetFilters.emit();
  }
}
