import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class EventsService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getBigDataPath();
  }

  // Get Data
  public getData(query): Observable<any> {
    const url = this.apiPath + '/latest-events';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
}
