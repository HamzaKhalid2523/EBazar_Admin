import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class GenesisSearchService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getVersion2Path();
  }
  public createSearch(body?, query = {}): Observable<any> {
    const url = this.apiPath + 'genesis-search';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.post(url, body, { params: params });
  }
  // Get Data
  public getData(query): Observable<any> {
    const url = this.apiPath + 'genesis-search';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  // Get Data
  public getSearchDetailsDashboard(_id): Observable<any> {
    const url = this.apiPath + 'genesis-search/details/'+_id+'/dashboard';
    return this.http.get(url);
  }
  // Get Data
  public getSearchDetailsIpdrs(_id,query): Observable<any> {
    const url = this.apiPath + 'genesis-search/details/'+_id+'/ipdrs';
    const params = this.helperService.objectToHttpParams(query);
    return this.http.get(url, { params: params });
  }
  // Get Data
  public getSearchById(_id): Observable<any> {
    const url = this.apiPath + 'genesis-search/'+_id;
    return this.http.get(url);
  }
}
