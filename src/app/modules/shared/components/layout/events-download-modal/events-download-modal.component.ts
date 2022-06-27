import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExportService } from 'src/app/core/services/api/bigdata/export.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { ListingService } from 'src/app/core/services/helper/listings.service';

@Component({
  selector: 'app-events-download-modal',
  templateUrl: './events-download-modal.component.html',
  styleUrls: ['./events-download-modal.component.scss']
})
export class EventsDownloadModalComponent implements OnInit {

  export_formats = [];
  field_types = [
    {name: "All", value: "all"},
    {name: "Custom", value: "custom"}
  ];

  @Input() exportVisible = "all";
  @Input() chartFields = false;
  @Input() dataOnly = false;
  @Input() singleExport = false;
  @Input() eventsSelected = [];
  @Input() dateRange = [];
  @Input() query: any;
  @Input() filters: [];
  @Input() inputFields = [];
  @Input() endPoint = "/events";
  @Input() fileTitle = "";
  @Input() elementView = "";
  @Input() data_type = "events";
  @Output() reportGenerated = new EventEmitter<any>();
  @Output() downloadFile = new EventEmitter<any>();
  queryItems = [];
  formGroup: FormGroup;
  loading;
  taskNoLoading = false;
  taskNo = 1;

  constructor(
    private fb: FormBuilder,
    private listingService: ListingService,
    private helperService: HelperService,
    private datePipe: DatePipe,
    private exportService: ExportService
  ) { }

  async ngOnInit() {
    await this.getTaskNo();
    this.export_formats = [
      // {name: "PDF (Chart)", value: "pdf_chart"},
      {name: "PDF (Data)", value: "pdf"},
      {name: "XML (Data)", value: "xml"},
      {name: "CSV (Data)", value: "csv"}
    ];

    if(this.chartFields && this.inputFields && this.inputFields.length) this.queryItems = this.inputFields;
    else {
      if(this.endPoint === "/events") this.queryItems = this.listingService.eventsDownloadQueryItems;
      else if(this.endPoint === "/http") this.queryItems = this.listingService.httpDownloadQueryItems;
      else if(this.endPoint === "/email") this.queryItems = this.listingService.emailDownloadQueryItems;
      else if(this.endPoint === "/radius") this.queryItems = this.listingService.radiusQueryItems;
    }
    this.formInitializer();
  }

  getTaskNo() {
    this.taskNoLoading = true;
    this.exportService.getLatestData().subscribe(
      (response) => {
        this.taskNo = response.data?.task_no || 0;
        this.taskNo++;
        this.taskNoLoading = false;
      }, (error) => {
        const errorMsg =
          error?._message ||
          error?.detail?._message ||
          error?.error?.message ||
          "Something Went Wrong. Server Error!!";

        this.showToast(errorMsg, "error");
        this.taskNoLoading = false;
      }
    );
  }

  formInitializer() {
    this.formGroup = this.fb.group({
      size: [100, [Validators.required]],
      from: [0, [Validators.required]],
      fields_list: [[], []],
      field_type: ["all", []],
      export_format: ["pdf", [Validators.required]],
      should_export: [1, [Validators.required]],
      task_description: [null, [Validators.required]],
      title: [null, [Validators.required]],
    });

    if(this.exportVisible === "data") this.formGroup.patchValue({"export_format": "pdf"});
  }

  exportData() {
    this.loading = true;

    const reportDate = this.datePipe.transform(new Date(), "medium");

    if(this.formGroup.value["export_format"] === "pdf_chart") {
      this.fileTitle = `${this.fileTitle} - ${reportDate}.pdf`;
      this.helperService.generatePDF(
        this.elementView,
        this.fileTitle,
        this.dateRange
      );
      this.loading = false;
      this.reportGenerated.emit();
    } else {

      let query = this.query;
      let selectedFields = this.formGroup.value["fields_list"].join(",");
      let allFields = this.query.match(/(?<=SELECT\s+).*?(?=\s+from)/gs);

      if(allFields.length && this.formGroup.value["fields_list"].length) {
        query = query.replace(allFields[0], selectedFields);
      }
      if(!this.eventsSelected.length && !this.singleExport) {
        const size = this.formGroup.value["size"];
        const from = this.formGroup.value["from"];
        query += ` limit ${from},${size}`;
      }

      const export_format = this.formGroup.value["export_format"];
      const task_description = this.formGroup.value["task_description"];
      const title = this.formGroup.value["title"];
      const filters = {
        query,
        export_format,
        task_description,
        title,
        data_type: this.data_type,
        filters: this.filters
      };
      let url = "/reporter/generate-report"
      if(this.endPoint == '/genesis-search'){
        url = "/reporter/generate-report-genesis"
      }
      this.exportService.createData(url, filters).subscribe(
        (response) => {
          if (response?.worker?.status === "In Progress") {
            this.showToast("Your Download is Processing!");
            this.helperService.addDwonloadFile(response?.worker?._id);
          }
          this.loading = false;
          this.downloadFile.emit();
        },
        (error) => {
          const errorMsg =
            error?._message ||
            error?.detail?._message ||
            error?.error?.message ||
            "Something Went Wrong. Server Error!!";

          this.showToast(errorMsg, "error");
          this.loading = false;
        }
      );

    }
  }

  getExportedFields() {
    const data = {};

    if(this.chartFields) {
      this.inputFields.forEach(item => {
        data[item?.name] = item.value;
      });
    } else if(this.formGroup.value["field_type"] === "all")  {
      this.queryItems.forEach(item => data[item.name] = item.value)
    } else if(this.formGroup.value["field_type"] === "custom")  {
      this.formGroup.value["fields_list"].forEach(item => {
        const obj: any = this.queryItems.find((e) => e.value === item);
        const filterObj = {...obj};

        if(filterObj) data[filterObj?.name] = filterObj.value;
      });
    }

    return data;
  }

  setFieldType(value) {
    this.formGroup.patchValue({export_format: value});
  }
  get formDataFieldType() {
    return <FormControl>this.formGroup.get("field_type");
  }

  // Show Toaster
  showToast(msg, status = "success") {
    if (status == "success") {
      this.helperService.showToast(msg, "success");
    } else {
      this.helperService.showToast(msg, "error");
    }
  }
}
