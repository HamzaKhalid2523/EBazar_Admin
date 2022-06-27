import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class LITargetManagementService {
  private apiPath: string = "";
private endPoint = 'li-target-management'
  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getVersion2Path();
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

  // Get Data
  public getCorelatedData(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/corelation';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Data
  public getRadiusData(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/radius_data';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getIntelligentIPDRs(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/intelligent_ipdrs';
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

  // Stats
  public getSnis(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/top-snis';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getProtocols(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/top-protocols';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getSourceIPs(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/top-sources';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getDestinationIPs(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/top-destinationd';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getSourceCountries(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/top-source-countries';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getDestinationCountries(query = {}): Observable<any> {
    const url = this.apiPath + this.endPoint + '/top-destination-countries';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
}
