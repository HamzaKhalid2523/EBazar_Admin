import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExportService } from 'src/app/core/services/api/bigdata/export.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-download-bar',
  templateUrl: './download-bar.component.html',
  styleUrls: ['./download-bar.component.scss']
})
export class DownloadBarComponent implements OnInit, OnChanges, OnDestroy {

  @Output() closeDownloads = new EventEmitter<any>();
  @Input() downloadGenerated;

  filesData = [];
  loading = false;
  interval;
  subscriptions: Subscription[] = [];

  constructor(
    private helperService: HelperService,
    private exportService: ExportService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.helperService.getDownloadedFilesSub().subscribe(() => this.getRecords());
    this.getRecords();
  }
  ngOnChanges() {
  }

  getRecords() {
    this.loading = true;
    if(this.interval)clearInterval(this.interval);
    this.subscriptions.forEach(sub => sub.unsubscribe());

    this.interval = setInterval(() => {
      const reports_Ids = [];
      const reports_Items = this.helperService.getDownloadedFilesIds();
      reports_Items.forEach(item => reports_Ids.push(item.id));

      this.subscriptions.push(
        this.exportService.getData("/reporter/get-records", {reports_Ids}).subscribe(
          (response) => {
            this.filesData = response.reverse();
            let progress = false;
            this.filesData.forEach((element, fileIndex) => {
              if(element.progress !== 100 || element.status !== "Completed") {
                progress = true;
                return;
              } else if(fileIndex === 0) {
                reports_Items.forEach(item => {
                  // if(element._id === item.id) this.downloadData(element);
                });
              }
            });
            if(!progress) clearInterval(this.interval);
            this.loading = false;
          },
          (error) => {
            console.log(error);
            this.loading = false;
          }
        )
      )
    }, 3000);
  }

  ngOnDestroy() {
    if(this.interval) clearInterval(this.interval);
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  trackByIndex(index, item) {
    return item._id;
  }

  close() {
    this.closeDownloads.emit();
  }

  // Download Data
  downloadData(data) {
    const envPath = environment.envHost;
    const url = `${envPath}:3200${data?.file_url}`;
    window.open(url, "_blank");
  }
  openNewTab(data) {
    const envPath = environment.envHost;
    const url = `${envPath}${data}`;
    window.open(url, "_blank");
  }
}
