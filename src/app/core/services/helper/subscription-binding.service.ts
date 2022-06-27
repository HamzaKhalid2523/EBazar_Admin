import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubscriptionBindingService {

  constructor() {}

  visitorAnalysisFlows = false;
  visitorAnalysisFlowsSub = new BehaviorSubject(false);

  caseIPDRFlows = false;
  caseIPDRSub = new BehaviorSubject(false);

  liRadiusDrawer = false;
  liRadiusDrawerSub = new BehaviorSubject(false);

  liMassIPDR = false;;
  liMassIPDRSub = new BehaviorSubject(false);

  liVoipIPDR = false;
  liVoipIPDRSub = new BehaviorSubject(false);

  liVpnIPDR = false;
  liVpnIPDRSub = new BehaviorSubject(false);

  liSocialIPDR = false;
  liSocialIPDRSub = new BehaviorSubject(false);

  liCryptoIPDR = false;
  liCryptoIPDRSub = new BehaviorSubject(false);

  liStreamingIPDR = false;
  liStreamingIPDRSub = new BehaviorSubject(false);

  setVisitorAnalysisFlows() {
    this.visitorAnalysisFlows = !this.visitorAnalysisFlows;
    this.visitorAnalysisFlowsSub.next(this.visitorAnalysisFlows);
  }
  getVisitorAnalysisFlows(): Observable<any> {
    return this.visitorAnalysisFlowsSub.asObservable();
  }

  setCaseIPDRFlows(value) {
    this.caseIPDRFlows = value;
    this.caseIPDRSub.next(this.caseIPDRFlows);
  }
  getCaseIPDRFlows(): Observable<any> {
    return this.caseIPDRSub.asObservable();
  }

  setLiRadiusDrawer(value) {
    this.liRadiusDrawer = value;
    this.liRadiusDrawerSub.next(this.liRadiusDrawer);
  }
  getLiRadiusDrawer(): Observable<any> {
    return this.liRadiusDrawerSub.asObservable();
  }

  setLIMass(value) {
    this.liMassIPDR = value;
    this.liMassIPDRSub.next(this.liMassIPDR);
  }
  getLIMass(): Observable<any> {
    return this.liMassIPDRSub.asObservable();
  }

  setLIVoip(value) {
    this.liVoipIPDR = value;
    this.liVoipIPDRSub.next(this.liVoipIPDR);
  }
  getLIVoip(): Observable<any> {
    return this.liVoipIPDRSub.asObservable();
  }

  setLIVpn(value) {
    this.liVpnIPDR = value;
    this.liVpnIPDRSub.next(this.liVpnIPDR);
  }
  getLIVpn(): Observable<any> {
    return this.liVpnIPDRSub.asObservable();
  }

  setLISocial(value) {
    this.liSocialIPDR = value;
    this.liSocialIPDRSub.next(this.liSocialIPDR);
  }
  getLISocial(): Observable<any> {
    return this.liSocialIPDRSub.asObservable();
  }

  setLICrypto(value) {
    this.liCryptoIPDR = value;
    this.liCryptoIPDRSub.next(this.liCryptoIPDR);
  }
  getLICrypto(): Observable<any> {
    return this.liCryptoIPDRSub.asObservable();
  }

  setLIStreaming(value) {
    this.liStreamingIPDR = value;
    this.liStreamingIPDRSub.next(this.liStreamingIPDR);
  }
  getLIStreaming(): Observable<any> {
    return this.liStreamingIPDRSub.asObservable();
  }
}
