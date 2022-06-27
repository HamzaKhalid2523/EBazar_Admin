import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CoreConfig } from "../../helper/core.config";
import { HelperService } from "../../helper/helper.service";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  private apiPath: string = "";

  constructor(private http: HttpClient, private helperService: HelperService) {
    this.apiPath = CoreConfig.getBigDataPath();
  }

  // Get Snis
  public getTopSnis(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-snis';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getTopProtocols(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-protocols';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getTopHosts(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-http-hosts';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getTopUserIps(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-client-ips';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopUserIpsByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-client-ips-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopClientIspsByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-client-isps-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopClientCitiesByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-client-cities-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopClientCountriesByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-client-countries-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopClientGelocationByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-client-geolocation-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopServerCountriesByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-server-countries-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopServerIspsByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-server-isps-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
  public getTopServerCitiesByFilters(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-server-cities-by-filters';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getTopServerIps(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-destination-ips';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getEventHistogram(query): Observable<any> {
    const url = this.apiPath + '/reporting/events-histogram';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getRadiusHistogram(query): Observable<any> {
    const url = this.apiPath + '/reporting/radius-histogram';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getRadiusMSISDN(query): Observable<any> {
    const url = this.apiPath + '/reporting/radius-msisdn';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  // Get Snis
  public getRadiusCellId(query): Observable<any> {
    const url = this.apiPath + '/reporting/radius-cellId';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }


  // Get protocls
  public getTopSocialMedia(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-social-media';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }


  // Get voip
  public getTopVoip(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-voip';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getTopVpn(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-vpn';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getTopCrypto(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-crypto';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getTopStreaming(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-streaming';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getTopEmail(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-email';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getTopFinance(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-finance';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }

  public getTopShopping(query): Observable<any> {
    const url = this.apiPath + '/reporting/top-shopping';
    const params = this.helperService.objectToHttpParams(query);

    return this.http.get(url, { params: params });
  }
}
