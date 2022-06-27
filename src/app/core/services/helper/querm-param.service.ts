import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {Location} from '@angular/common';

@Injectable({
  providedIn: "root",
})
export class QueryParamService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  addQueryParams(filters) {
    let tempQueryParams: any = this.getQueryParams(filters);

    const url = this.router.createUrlTree([], {relativeTo: this.activatedRoute, queryParams: tempQueryParams}).toString();
    this.location.go(url);
  }

  getQueryParams(filters) {
    let tempQueryParams: any = {};

    for(let property in filters) {
      if(filters[property] instanceof Array) {
        for(const element of filters[property]) {
          if(element.key && element.value) {
            let key = element.key;
            let value = element.value;
            let operator = element.operator ? element.operator + '%op%' : '';

            if(element.operator === 'between') tempQueryParams[key] = `${value}`;
            else tempQueryParams[key] = `${operator}${value}`;
          }
        }
      } else if(filters[property] instanceof Object) {
        tempQueryParams = {tempQueryParams, ...this.getQueryParams(filters[property])}
      } else {
        tempQueryParams[property] = filters[property];
      }
    }

    return tempQueryParams;
  }
}
