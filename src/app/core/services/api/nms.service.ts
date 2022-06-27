import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HelperService } from "../helper/helper.service";
import { CoreConfig } from "../helper/core.config";

@Injectable({
  providedIn: "root",
})
export class NmsService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getApiPath();
  }

  public getHeatMap(query = {}): Observable<any> {
    const url = this.apiPath + '/nms/heat-map';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getDevicesAvailability(query = {}): Observable<any> {
    const url = this.apiPath + '/nms/get-devices-availability';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getRecentAlarms(query = {}): Observable<any> {
    const url = this.apiPath + '/nms/recent-alarms';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getDevicesByCPUUsage(query = {}): Observable<any> {
    const url = this.apiPath + '/nms/devices-by-cpu-usage';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getDevicesByMemoryUsage(query = {}): Observable<any> {
    const url = this.apiPath + '/nms/devices-by-memory-usage';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
}
