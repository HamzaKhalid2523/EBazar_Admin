import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HelperService } from "../helper/helper.service";
import { CoreConfig } from "../helper/core.config";

@Injectable({
  providedIn: "root",
})
export class OriginalShopsService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getApiPath();
  }

  // Get Data
  public getData(query = {}): Observable<any> {
    const url = this.apiPath + '/originalShops';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Create Data
  public createData(body?, imgUrls?, query = {}): Observable<any> {
    const url = this.apiPath + '/originalShops';
    const params = this.helperService.objectToHttpParams(query);

    let formData = {
      'seller': body.seller,
      'phone': body.phone,
      'email': body.email,
      'cnic': body.cnic,
      'address': body.address,
      'status': body.status,
      'companyName': body.companyName,
      'companyAddress': body.companyAddress,
      'companyDocs': imgUrls
    };

    return this.http.post(url, formData, { params: params });
  }

  // Update Data
  public updateData(id, body?, query = {}): Observable<any> {
    const url = this.apiPath + '/originalShops/'+id;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.put(url, body, { params: params });
  }

  // Delete Data
  public deleteData(id, body?, query = {}): Observable<any> {
    const url = this.apiPath + '/originalShops/'+id;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.request('delete', url, { params: params, body: body})
  }
}
