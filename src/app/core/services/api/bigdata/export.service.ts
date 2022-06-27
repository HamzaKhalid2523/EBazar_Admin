import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class ExportService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getReporterApiPath();
  }

  // Get Data
  public getData(endPoint, query = {}): Observable<any> {
    const url = this.apiPath + endPoint;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Create Data
  public createData(endPoint, body?, query = {}): Observable<any> {
    const url = this.apiPath + endPoint;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.post(url, body, { params: params });
  }

  // Update Data
  public updateData(endPoint, body?, query = {}): Observable<any> {
    const url = this.apiPath + endPoint;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.put(url, body, { params: params });
  }

  // Delete Data
  public deleteData(endPoint, query = {}): Observable<any> {
    const url = this.apiPath + endPoint;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.delete(url, { params: params });
  }

  // Latest Record
  public getLatestData(): Observable<any> {
    const url = this.apiPath + '/reporter/getLatestData';

    return this.http.get(url);
  }
}
