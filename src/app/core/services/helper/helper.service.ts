import { Injectable } from "@angular/core";
import html2canvas from "html2canvas";
import * as jspdf from "jspdf";
import { DatePipe } from "@angular/common";
import * as logoFile from "src/logo.js";
import * as isObjectLike from "lodash.isobjectlike";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";

type ToastTypes = "success" | "info" | "warning" | "Error" | "error";
@Injectable({
  providedIn: "root",
})
export class HelperService {
  constructor(
    // private excelService: ExcelService,
    private datePipe: DatePipe,
    private http: HttpClient,
    private notification: NzNotificationService
  ) {}

  byteList = ["Kbs", "Mbs", "Gbs", "Tbs"];

  graphModes = [
    { id: 1, label: "Throughput", value: "speed" },
    { id: 2, label: "Bytes", value: "size" },
    { id: 3, label: "Connections", value: "connections" },
  ];

  localServiceData: any = {};
  sideMenuStatus = true;
  sidemenuStatusSub = new BehaviorSubject(true);
  timelineChartSub = new BehaviorSubject(true);
  pieChartSub = new BehaviorSubject(true);
  radiusPieChartSub = new BehaviorSubject(true);
  barChartSub = new BehaviorSubject(true);
  barGroupChartSub = new BehaviorSubject(true);
  guageChartSub = new BehaviorSubject(true);
  radarChartSub = new BehaviorSubject(true);

  eventHistogramSearched = false;
  eventHistogramSub = new BehaviorSubject(false);

  downloadedFilesIds = [];
  downloadedFilesSub = new BehaviorSubject(0);

  topMenuStatus = false;
  topmenuStatusSub = new BehaviorSubject(false);

  setTopmenuStatus(status) {
    this.topMenuStatus = status;
    this.topmenuStatusSub.next(this.topMenuStatus);
  }
  getTopmenuStatus(): Observable<any> {
    return this.topmenuStatusSub.asObservable();
  }

  setEventHistogram() {
    this.eventHistogramSearched = !this.eventHistogramSearched;
    this.eventHistogramSub.next(this.eventHistogramSearched);
  }
  getEventHistogramStatus(): Observable<any> {
    return this.eventHistogramSub.asObservable();
  }
  setSidemenuStatus() {
    this.sideMenuStatus = !this.sideMenuStatus;
    this.sidemenuStatusSub.next(this.sideMenuStatus);
  }
  setTimelineChartStatus() {
    this.timelineChartSub.next(true);
  }
  setPieChartStatus() {
    this.pieChartSub.next(true);
  }
  setRadiusPieChartStatus() {
    this.radiusPieChartSub.next(true);
  }
  setGuageChartStatus() {
    this.guageChartSub.next(true);
  }
  setBarChartStatus() {
    this.barChartSub.next(true);
  }
  setBarGroupChartStatus() {
    this.barGroupChartSub.next(true);
  }
  setRadarChartStatus() {
    this.radarChartSub.next(true);
  }
  getSidemenuStatus(): Observable<any> {
    return this.sidemenuStatusSub.asObservable();
  }
  getTimelineStatus(): Observable<any> {
    return this.timelineChartSub.asObservable();
  }
  getPieStatus(): Observable<any> {
    return this.pieChartSub.asObservable();
  }
  getRadiusPieStatus(): Observable<any> {
    return this.radiusPieChartSub.asObservable();
  }
  getGuageStatus(): Observable<any> {
    return this.guageChartSub.asObservable();
  }
  getBarStatus(): Observable<any> {
    return this.barChartSub.asObservable();
  }
  getBarGroupStatus(): Observable<any> {
    return this.barGroupChartSub.asObservable();
  }
  getRadarStatus(): Observable<any> {
    return this.radarChartSub.asObservable();
  }

  addDwonloadFile(id) {
    this.downloadedFilesIds.unshift({id: id, isDownloaded: false});
    this.downloadedFilesSub.next(this.downloadedFilesIds.length);
  }
  updateDownloadFile(data, index) {
    this.downloadedFilesIds[index] = data;
  }
  resetDonwloadedFiles(data = []) {
    this.downloadedFilesIds = data;
  }
  removeDonwloadedFile(id) {
    this.downloadedFilesIds = this.downloadedFilesIds.filter(item => item.id !== id);
  }
  getDownloadedFilesIds() {
    return this.downloadedFilesIds.slice(0, 5);
  }
  getDownloadedFilesSub(): Observable<any> {
    return this.downloadedFilesSub.asObservable();
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i: any = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
        (decimalCount
          ? decimal +
            Math.abs(amount - i)
              .toFixed(decimalCount)
              .slice(2)
          : "")
      );
    } catch (e) {
      console.log(e);
    }
  }

  showPipedNumber(number){

    if(number.length!==12){
      return number
    }

    const  slice1 = number.slice(0,5);
    const slice2 = number.slice(5);

    return slice1 + '-' + slice2
    }


  // this function dynamically creates the headers in ng2-smart-table
  createTableSettings(selectedType = "Gbs") {
    const columns = {
      id: {
        title: "#",
        type: "number",
      },
      name: {
        title: "Name",
        type: "string",
      },
    };

    let finalcols;

    if (selectedType === "Tbs") {
      finalcols = {
        ...columns,

        bytestotal_tb: {
          title: "Bytes Total (TBs)",
          type: "number",

          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 3);
          },
        },
        bytesin_tb: {
          title: "Bytes In (TBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 3);
          },
        },
        bytesout_tb: {
          title: "Bytes Out (TBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 3);
          },
        },
      };
    } else if (selectedType === "Gbs") {
      finalcols = {
        ...columns,

        bytestotal_gb: {
          title: "Bytes Total (GBs)",
          type: "number",

          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
        bytesin_gb: {
          title: "Bytes In (GBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
        bytesout_gb: {
          title: "Bytes Out (GBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
      };
    } else if (selectedType === "Mbs") {
      finalcols = {
        ...columns,

        bytestotal_mb: {
          title: "Bytes Total (MBs)",
          type: "number",

          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
        bytesin_mb: {
          title: "Bytes In (MBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
        bytesout_mb: {
          title: "Bytes Out (MBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
      };
    } else if (selectedType === "Kbs") {
      finalcols = {
        ...columns,

        bytestotal_kb: {
          title: "Bytes Total (KBs)",
          type: "number",

          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
        bytesin_kb: {
          title: "Bytes In (KBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
        bytesout_kb: {
          title: "Bytes Out (KBs)",
          type: "number",
          valuePrepareFunction: (value) => {
            if (!value) return "";
            return this.formatMoney(value, 2);
          },
        },
      };
    }

    const settings = {
      add: false,
      actions: false,
      columns: finalcols,
      hideSubHeader: true,
    };
    return settings;
  }

  toggleUiBlock(status = "start", msg = "loading...") {
    if (status === "start") {
      // this.blockUI.start(msg);
    } else if (status === "stop") {
      // this.blockUI.stop();
    }
  }

  generatePDF(element, fileName, date_range) {
    setTimeout(() => {
      const el = document.getElementById(element);

      if(el) {
        const width = el?.offsetWidth || 0;
        let calculatedScale = 1;
        if (width > 1100) calculatedScale = 0.75;
        else if (width > 900) calculatedScale = 0.9;

        const reportDate = this.datePipe.transform(new Date(), "medium");

        const displayDateRange =
          this.datePipe.transform(new Date(date_range.start), "mediumDate") +
          " - " +
          this.datePipe.transform(new Date(date_range.end), "mediumDate");
        const dateOfReport = "Report Date: " + reportDate;

        html2canvas(el, { scale: calculatedScale - 0.1 }).then((canvas) => {
          const contentDataURL = canvas.toDataURL("image/png");
          let pdf = new jspdf({ orientation: "l", unit: "in" });

          // pdf.addImage(logoFile.etisalatHeaderlogoBase64, "JPEG", 0, 0, 11.7, 0.7);

          pdf.setFontSize(24);
          pdf.text("Events Timeline Reports", 5.4, 1.5, null, null, "center");

          pdf.setFontSize(14);
          if (fileName) { pdf.text(1, 2, `Report: ${fileName}`); }
          pdf.text(1, 2.4, dateOfReport);
          pdf.text(1, 2.8, `Date Range: ${displayDateRange}`);
          pdf.addImage(contentDataURL, "JPEG", 1, 3.5);
          pdf.setTextColor(100);
          pdf.setFontStyle("bold");

          pdf.setFontSize(12);
          pdf.text( "Powered By TechAvenue Private Limited", 5.4, 8.1, null, null, "center" );
          pdf.save(fileName);
        });
      } else {
        this.showToast("No Data Found!", "Error", 3000);
      }
    }, 100);
  }

  async exportAllCharts(isp_name, date_range) {
    try {
      this.toggleUiBlock("start", "creating PDF report, please wait ...");
      let tabSet = document.getElementById("top-tabset");
      tabSet.classList.add("fulldisplay");
      let barElement = document.getElementById("verticalBar");

      if (!barElement) {
        barElement = document.getElementById("horizontalBar");
      }
      const pieChartTraffic = document.getElementById("echart-pie-traffic");
      const lineChart = document.getElementById("lineChart");
      const tableTraffic = document.getElementById("smartTableTraffic");
      let echartElement = document.getElementById("echart-pie");

      if (!echartElement) {
        echartElement = document.getElementById("echart-bar");
      }

      const tableConnections = document.getElementById("smartTableConnections");

      const width = barElement.offsetWidth;
      let calculatedScale = 1;
      if (width > 900) {
        calculatedScale = 0.9;
      }
      if (width > 1100) {
        calculatedScale = 0.75;
      }

      const barCanvas = await html2canvas(barElement, {
        scale: calculatedScale - 0.1,
      });
      const pieChartTrafficCanvas = await html2canvas(pieChartTraffic, {
        scale: calculatedScale,
      });
      const lineChartCanvas = await html2canvas(lineChart, {
        scale: calculatedScale,
      });
      const tableTrafficCanvas = await html2canvas(tableTraffic, {
        scale: calculatedScale,
      });
      const echartCanvas = await html2canvas(echartElement, {
        scale: calculatedScale,
      });
      const tableConnectionsCanvas = await html2canvas(tableConnections, {
        scale: calculatedScale,
      });

      const barCanvasURL = barCanvas.toDataURL("image/png");
      const pieChartTrafficCanvasURL = pieChartTrafficCanvas.toDataURL(
        "image/png"
      );
      const lineChartCanvasURL = lineChartCanvas.toDataURL("image/png");
      const tableTrafficCanvasURL = tableTrafficCanvas.toDataURL("image/png");
      const echartCanvasURL = echartCanvas.toDataURL("image/png");
      const tableConnectionsCanvasURL = tableConnectionsCanvas.toDataURL(
        "image/png"
      );

      tabSet.classList.remove("fulldisplay");

      let pdf = new jspdf({
        orientation: "l",
        unit: "in",
        // format: "l"
      });

      const displayDateRange =
        this.datePipe.transform(new Date(date_range.start), "mediumDate") +
        " - " +
        this.datePipe.transform(new Date(date_range.end), "mediumDate");

      const reportDate = this.datePipe.transform(new Date(), "medium");
      const filename = `${isp_name} - ${reportDate} - Full Report.pdf`;

      const dateOfReport = "Report Date: " + reportDate;

      pdf.addImage(logoFile.etisalatHeaderlogoBase64, "JPEG", 0, 0, 11.7, 0.7);
      pdf.setFontSize(24);
      pdf.text("All Reports", 5.4, 1.5, null, null, "center");

      // pdf.text(5, 2.5, "ISP Reporting Tool");
      pdf.setFontSize(14);

      pdf.text(1, 2, `ISP: ${isp_name}`);
      pdf.text(1, 2.4, `Date Range: ${displayDateRange}`);
      pdf.text(1, 2.8, dateOfReport);
      pdf.text(1, 3.2, `Top Apps by Trafic: Bar chart`);

      pdf.addImage(barCanvasURL, "JPEG", 1, 3.5);
      pdf.setTextColor(100);
      pdf.setFontSize(12);
      pdf.text(
        "Powered By SNSkies Private Limited",
        5.4,
        8.1,
        null,
        null,
        "center"
      );
      pdf.addPage();

      pdf.addImage(logoFile.etisalatHeaderlogoBase64, "JPEG", 0, 0, 11.7, 0.7);

      pdf.setFontSize(18);
      pdf.setTextColor(0);
      pdf.text("Top Apps by Trafic: Pie Chart", 5.4, 1.5, null, null, "center");

      pdf.addImage(pieChartTrafficCanvasURL, "JPEG", 1, 2.5);
      pdf.setTextColor(100);
      pdf.setFontSize(12);
      pdf.text(
        "Powered By SNSkies Private Limited",
        5.4,
        8.1,
        null,
        null,
        "center"
      );
      pdf.addPage();

      pdf.addImage(logoFile.etisalatHeaderlogoBase64, "JPEG", 0, 0, 11.7, 0.7);

      pdf.setFontSize(18);
      pdf.setTextColor(0);
      pdf.text("Trafic Timeline chart", 5.4, 1.5, null, null, "center");

      pdf.addImage(lineChartCanvasURL, "JPEG", 1, 2.5);
      pdf.setTextColor(100);
      pdf.setFontSize(12);
      pdf.text(
        "Powered By SNSkies Private Limited",
        5.4,
        8.1,
        null,
        null,
        "center"
      );
      pdf.addPage();

      pdf.addImage(logoFile.etisalatHeaderlogoBase64, "JPEG", 0, 0, 11.7, 0.7);

      pdf.setFontSize(18);
      pdf.setTextColor(0);
      pdf.text(
        "Top Apps by Trafic: Tabular View",
        5.4,
        1.5,
        null,
        null,
        "center"
      );

      pdf.addImage(tableTrafficCanvasURL, "JPEG", 1, 2.5);
      pdf.setTextColor(100);
      pdf.setFontSize(12);
      pdf.text(
        "Powered By SNSkies Private Limited",
        5.4,
        8.1,
        null,
        null,
        "center"
      );

      pdf.addPage();

      pdf.addImage(logoFile.etisalatHeaderlogoBase64, "JPEG", 0, 0, 11.7, 0.7);

      pdf.setFontSize(18);
      pdf.setTextColor(0);
      pdf.text("Top Apps by Connections", 5.4, 1.5, null, null, "center");

      pdf.addImage(echartCanvasURL, "JPEG", 1, 2.5);
      pdf.setTextColor(100);
      pdf.setFontSize(12);
      pdf.text(
        "Powered By SNSkies Private Limited",
        5.4,
        8.1,
        null,
        null,
        "center"
      );

      pdf.addPage();

      pdf.addImage(logoFile.etisalatHeaderlogoBase64, "JPEG", 0, 0, 11.7, 0.7);

      pdf.setFontSize(18);
      pdf.setTextColor(0);
      pdf.text(
        "Top Apps by Connections: Tabular View",
        5.4,
        1.5,
        null,
        null,
        "center"
      );

      pdf.addImage(tableConnectionsCanvasURL, "JPEG", 1, 2.5);
      pdf.setTextColor(100);
      pdf.setFontSize(12);
      pdf.text(
        "Powered By SNSkies Private Limited",
        5.4,
        8.1,
        null,
        null,
        "center"
      );

      this.toggleUiBlock("stop");
      this.showToast("PDF downloaded successfully!");
      pdf.save(filename);
    } catch (ex) {
      console.log("exception while creating PDF", ex);
      this.toggleUiBlock("stop");
    }
  }

  generateCsv(dataArray, type = "traffic", date_range, tableSettings?) {
    let response;
    if (type == "traffic") {
      response = this.createCsvDataTraffic(dataArray, tableSettings);
    } else {
      response = this.createCsvDataConnections(dataArray);
    }

    const headerKeys = response.headers;

    const header = headerKeys.map((element) => element.toUpperCase());

    const data = response.flattenArray;
    // this.excelService.generateExcel(
    //   "ISP Reporting Tool",
    //   header,
    //   data,
    //   date_range
    // );
  }

  createCsvDataConnections(dataArray) {
    const finalArr = [];

    for (const item of dataArray) {
      const obj = {
        id: item.id,
        name: item.name,
        connections: item.connections,
      };

      finalArr.push(obj);
    }

    const headers = Object.keys(finalArr[0]);

    const flattenArray = this.returnFlattenArray(finalArr);
    return { flattenArray, headers };
  }

  // convert Array of Objects to Array of Arrays
  returnFlattenArray(arr) {
    const flattenArray = arr.map(function (obj) {
      return (
        Object.keys(obj)
          // .sort()
          .map(function (key) {
            return obj[key];
          })
      );
    });

    return flattenArray;
  }

  createCsvDataTraffic(chartData, tableSettings) {
    const allColumns = tableSettings.columns;

    // first , create headers

    const headers = [];
    const headerKeys = [];
    const resultArray = [];
    // key = bytestotal_gb
    // valueobj = title: "Bytes Out (GBs)", type: "number"
    for (const [key, valueObj] of Object.entries(allColumns)) {
      headers.push(valueObj["title"]);
      headerKeys.push(key);
    }

    for (const [index, item] of chartData.entries()) {
      let obj = {};

      for (let headerKey of headerKeys) {
        obj[headerKey] = item[headerKey];
      }

      resultArray.push(obj);
      // const obj
    }

    const flattenArray = this.returnFlattenArray(resultArray);

    return { flattenArray, headers };
  }

  filterServiceData(arr, return_all = false) {
    arr = arr.filter((e) => {
      return (
        e.name !== "SSL v3" &&
        e.name !== "Being analyzed" &&
        e.name !== "DNS" &&
        e.name !== "HTTP" &&
        e.name !== "IP protocol 1 (ICMP)" &&
        e.name !== "HTTP download" &&
        e.name !== "IKEv2 IPsec nat-t" &&
        e.name !== "Unknown" &&
        e.name !== "HTTP2 over TLS" &&
        e.name !== "Not analyzed (Mid-stream start)" &&
        e.name !== "<Others>"
      );
    });

    if (!return_all) {
      if (arr.length > 10) {
        arr.length = 10;
      }
    }

    arr.forEach((element, index) => {
      element.id = index + 1;
      element.connections = element.values.connections;

      element["bytestotal_tb"] = +(
        element.values["bytes total"] / Math.pow(1024, 4)
      );
      element["bytesin_tb"] = +(element.values["bytes in"] / Math.pow(1024, 4));
      element["bytesout_tb"] = +(
        element.values["bytes out"] / Math.pow(1024, 4)
      );

      element["bytestotal_gb"] = +(
        element.values["bytes total"] / Math.pow(1024, 3)
      );
      element["bytesin_gb"] = +(element.values["bytes in"] / Math.pow(1024, 3));
      element["bytesout_gb"] = +(
        element.values["bytes out"] / Math.pow(1024, 3)
      );

      element["bytestotal_mb"] = +(
        element.values["bytes total"] / Math.pow(1024, 2)
      );
      element["bytesin_mb"] = +(element.values["bytes in"] / Math.pow(1024, 2));
      element["bytesout_mb"] = +(
        element.values["bytes out"] / Math.pow(1024, 2)
      );

      element["bytestotal_kb"] = +(
        element.values["bytes total"] / Math.pow(1024, 1)
      );
      element["bytesin_kb"] = +(element.values["bytes in"] / Math.pow(1024, 1));
      element["bytesout_kb"] = +(
        element.values["bytes out"] / Math.pow(1024, 1)
      );
    });

    return arr;
  }

  objectToHttpParams(obj: any) {
    return Object.entries(obj || {}).reduce((params, [key, value]) => {
      if (value === undefined || value === null) {
        value = "";
      }
      return params.set(
        key,
        isObjectLike(value) ? JSON.stringify(value) : String(value)
      );
      // }
    }, new HttpParams());
  }

  getChangedObj(originalObj ,dataObj: any) {
    const data = {};

    for (let prop in dataObj) {
      if (originalObj[prop] !== dataObj[prop] && JSON.stringify(originalObj[prop]) !== JSON.stringify(dataObj[prop])) {
        if(Array.isArray(dataObj[prop])) {
          if(dataObj[prop]) data[prop] = dataObj[prop];
        }
        else data[prop] = dataObj[prop];
      }
    }
    return data;
  }

  getActiveDuration(data) {
    let dateStart = null;
    let dateEnd = null;

    let dateList = [];
    let response = 0;

    for(let i=0; i<data.length; i++) {
      const history = data[i];
      const fields = history?.fields[0];
      if(fields.status != undefined) {
        const status = fields.status;

        if(status && !dateStart) dateStart = new Date(history?.date_created);
        else if(i!==0 && !status && !dateEnd) dateEnd = new Date(history?.date_created);

        if(dateStart && dateEnd) {
          dateList.push({start: dateStart, end: dateEnd});
          dateStart = null;
          dateEnd = null;
        }
      }
    }

    if(dateStart && !dateEnd) {
      dateList.push({start: dateStart, end: new Date()});
      dateStart = null;
      dateEnd = null;
    }

    dateList.forEach(dateObj => {
      response += this.dateDifference(dateObj.start, dateObj.end);
    });

    return this.msToTime(response);
  }

  msToTime(duration) {
    let seconds: any = Math.floor((duration / 1000) % 60);
    let minutes: any = Math.floor((duration / (1000 * 60)) % 60);
    let hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);
    let days: any = Math.floor((duration / (1000 * 60 * 60 * 24)) % 7);
    let weeks: any = Math.floor((duration / (1000 * 60 * 60 * 24 * 7)) % 4);
    let months: any = Math.floor((duration / (1000 * 60 * 60 * 24 * 7 * 4)) % 12);

    let monthsLabel = (months > 1) ? months + ' Months' : months + ' Month';
    let weeksLabel = (weeks > 1) ? weeks + ' Weeks' : weeks + ' Week';
    let daysLabel = (days > 1) ? days + ' Days' : days + ' Day';
    let hoursLabel = (hours > 1) ? hours + ' Hours' : hours + ' Hour';
    let minutesLabel = (minutes > 1) ? minutes + ' Minutes' : minutes + 'Minute';
    let secondsLabel = (seconds > 1) ? seconds + ' Seconds' : seconds + ' Second';

    return {months, weeks, days, hours, minutes, seconds, monthsLabel, weeksLabel, daysLabel, hoursLabel, minutesLabel, secondsLabel};
  }

  dateDifference(d1, d2) {
    var t2 = d2.getTime();
    var t1 = d1.getTime();

    return t2-t1;
  }

  saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  getDataFromLocalStorage(key) {
    const preferences = localStorage.getItem(key);
    try {
      return JSON.parse(preferences);
    } catch (ex) {
      console.log("ex", ex);
    }
  }
  removeDataFromLocalStorage(key) {
    localStorage.removeItem(key);
  }

  validateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true)
    }
    return (false)
  }

  saveDataToService(key, data) {
    this.localServiceData[key] = data;
  }
  getDataFromService(key) {
    return this.localServiceData[key];
  }
  removeDataFromService(key) {
    this.localServiceData[key] = {};
  }

  showToast(title, status: ToastTypes = "success", duration = 3000, msg = '') {
    this.notification.create(
      status,
      title,
      msg,
      {
        nzDuration: duration
      }
    );
  }
  async fileExists(url: string) {
    try {
      return await this.http.get(url).toPromise();
    } catch (error) {
      console.log('error',error);
      return false;
    }
  }

  nFormatterPipe(num, digits, complex = false) {
    let lookup;

    if(complex) {
      lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: " Thousand" },
        { value: 1e6, symbol: " Million" },
        { value: 1e9, symbol: " Billion" },
        { value: 1e12, symbol: " Trillion" },
        { value: 1e15, symbol: " P" },
        { value: 1e18, symbol: " E" }
      ];
    } else {
      lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: " K" },
        { value: 1e6, symbol: " M" },
        { value: 1e9, symbol: " B" },
        { value: 1e12, symbol: " T" },
        { value: 1e15, symbol: " P" },
        { value: 1e18, symbol: " E" }
      ];
    }
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
}
