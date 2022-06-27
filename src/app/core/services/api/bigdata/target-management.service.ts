import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class TargetManagementService {
  private apiPath: string = "";
private endPoint = '/targets'
  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getApiPath();
  }

  // Get Data
  public getData(endPoint = null, query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Data
  public getDataById(id, query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/' + id;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Create Data
  public createData(body?, query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.post(url, body, { params: params });
  }

  // Update Data
  public updateData(_id,body?, query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + `/${_id}`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.put(url, body, { params: params });
  }

  // Delete Data
  public deleteData(_id,query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint+ `/${_id}`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.delete(url, { params: params });
  }
}
