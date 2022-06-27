import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HelperService } from "../helper/helper.service";
import { CoreConfig } from "../helper/core.config";

@Injectable({
  providedIn: "root",
})
export class TargetsService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getApiPath();
  }

  // Get Data
  public getData(query = {}): Observable<any> {
    const url = this.apiPath + '/targets';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Create Data
  public createData(body?, query = {}): Observable<any> {
    const url = this.apiPath + '/targets';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.post(url, body, { params: params });
  }

  // Update Data
  public updateData(body?, query = {}): Observable<any> {
    const url = this.apiPath + '/targets';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.put(url, body, { params: params });
  }

  // Delete Data
  public deleteData(body?, query = {}): Observable<any> {
    const url = this.apiPath + '/targets';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.request('delete', url, { params: params, body: body})
  }
}
