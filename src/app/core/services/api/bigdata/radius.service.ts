import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class RadiusService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getBigDataPath();
  }

  // Get Data
  public getData(query): Observable<any> {
    const url = this.apiPath + '/latest-radius';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getCallingStation(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-calling-station';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getCalledStation(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-called-station';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getAreaCode(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-area-code';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getCellId(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-cell-id';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getIMEI(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-imei';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getIMSI(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-imsi';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getSGSNAddress(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-sgsn-addr';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getGGSNAddress(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-ggsn-addr';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getPrivateIp(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-unique-private-ip';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
}
