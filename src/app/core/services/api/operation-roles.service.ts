import { BehaviorSubject, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HelperService } from "../helper/helper.service";
import { CoreConfig } from "../helper/core.config";

@Injectable({
  providedIn: "root",
})
export class OperationRolesService {
  private apiPath: string = "";
  public getDataSub = new BehaviorSubject(false);

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getApiPath();
  }

  // Get Data
  public getData(query = {}): Observable<any> {
    const url = this.apiPath + '/operation-roles';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Create Data
  public createData(body?, query = {}): Observable<any> {
    const url = this.apiPath + '/operation-roles';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.post(url, body, { params: params });
  }

  // Update Data
  public updateData(id, body?, query = {}) {
    const url = this.apiPath + '/operation-roles/'+id;
    const params = this.helperService.objectToHttpParams(query);

    this.http.put(url, body, { params: params }).subscribe(
      (response) => {
        this.helperService.showToast("Updated Successfully", "success");
        this.getDataSub.next(true);
      }, (error) => {
        const errorMsg = error?.detail?._message || error?.error?.message || error?.error?.errmsg || "Server Error";
        console.log("error", error, errorMsg);

        this.helperService.showToast(errorMsg, "error");
      }
    );
  }

  // Delete Data
  public deleteData(id, body?, query = {}) {
    const url = this.apiPath + '/operation-roles/'+id;
    const params = this.helperService.objectToHttpParams(query);

    this.http.request('delete', url, { params: params, body: body}).subscribe(
      (response) => {
        this.helperService.showToast("Deteled Successfully", "success");
        this.getDataSub.next(true);
      }, (error) => {
        const errorMsg = error?.detail?._message || error?.error?.message || error?.error?.errmsg || "Server Error";
        console.log("error", error, errorMsg);

        this.helperService.showToast(errorMsg, "error");
      }
    );
  }
}
