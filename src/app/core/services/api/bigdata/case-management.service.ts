import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class CaseManagementService {
  private apiPath: string = "";
private endPoint = '/cases'
  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getApiPath();
  }

  // Get Data
  public getData(query = {}): Observable<any> {
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

  // Stats
  public getProfileData(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/case-profile`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopApplications(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-applications`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopSnis(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-snis`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopSourceIps(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-source-ips`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopDestinationIps(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-destination-ips`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getSourceIsps(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-source-isps`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getSourceCities(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-source-cities`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getSourceCountries(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-source-countries`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getServerIsps(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-server-isps`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getServerCities(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-server-cities`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getServerCountries(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/top-server-countries`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getIPDRFlows(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/flows`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getCommonApps(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/case-common-applications`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getCommonDestinations(id, query = {}): Observable<any> {
    const url = this.apiPath + `/case-management/${id}/case-common-destinations`;
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
}
