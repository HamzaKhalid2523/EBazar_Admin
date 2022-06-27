import { HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { AuthService } from "./auth.service";
import { ListingService } from "./listings.service";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  queryItems = [];

  constructor(
    private injector: Injector,
    private listingService: ListingService
  ) {}

  intercept(req: HttpRequest<string>, next) {

    this.queryItems = this.listingService.allQueryItems;
    let httpParams: HttpParams = req.params;
    let keys = httpParams.keys();
    let params = {};
    let isLogged = true;
    // console.log(keys, httpParams);
    keys.forEach((key: string) => {
      if(
        key === "title" || key === "search_string" || key === "action" ||
        key === "username" || key === "mv" || key === "flow_type" || key === "targetId" ||
        key === "type" || key === "id" || key === "event_type" || key === "searchByEmail" ||
        key === "searchByHttp" || key === 'isViewedField' || key === 'sort' || key === 'status' ||
        key === 'category' || key === 'target'
      ) {
        params[key] = httpParams.getAll(key)[0];
      } else params[key] = JSON.parse(httpParams.getAll(key)[0]);

      if(key === "isLogged" && !JSON.parse(httpParams.getAll(key)[0])) isLogged = false;
    });

    let logs = this.removeDuplicates(this.setLogParams(params));
    let authService = this.injector.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `${authService.getLoginToken()}`,
      },
      setParams: {
        isLogged: JSON.stringify(isLogged),
        params: JSON.stringify(logs)
      }
    });

    return next.handle(tokenizedReq);
  }

  setLogParams(params) {
    let tempLogs = [];
    if(params?.operator === "like") {
      let mainKey = Object.keys(params)[0];
      let titleKey = mainKey;
      for(let item of this.queryItems) {
        if(Object.keys(params)[0].toLowerCase() === item.value) {
          titleKey = item.name;
          break;
        }
      }
      let value = params[mainKey];
      tempLogs.push({key: titleKey, value: value, operator: "includes"});
    } else if(params?.negation) {
      let mainKey = Object.keys(params)[0];
      let titleKey = mainKey;
      for(let item of this.queryItems) {
        if(Object.keys(params)[0].toLowerCase() === item.value) {
          titleKey = item.name;
          break;
        }
      }
      let value = params[mainKey];
      if(mainKey.toLowerCase() === 'length(file_types_array)') {
        tempLogs.push({key: "Attachments", value: "Yes"});
      } else tempLogs.push({key: titleKey, value: value, operator: "!="});
    } else {
      for (const property in params) {
        if(params[property] instanceof Array) {
          if(property === "targets") {
            tempLogs.push({key: property, value: params[property]});
          } else {
            for(const iterator of params[property]) {
              for(const innerIterator in iterator) {
                if(innerIterator.toLowerCase() === 'date_time' || innerIterator.toLowerCase() === 'start_time' ||
                   innerIterator.toLowerCase() === 'stop_time') {
                    const temp = iterator["date_time"] || iterator["start_time"] || iterator["stop_time"];
                    tempLogs.push({key: "Date Range", value: [temp[0], temp[1]]});
                } else if(innerIterator.toLowerCase() === 'keywords' || innerIterator.toLowerCase() === 'post_variables.name' ||
                          innerIterator.toLowerCase() === 'uri_params.name') {
                    let title = 'Email Keywords';
                    if(innerIterator.toLowerCase() === 'post_variables.name') title = 'Post Vriables';
                    else if(innerIterator.toLowerCase() === 'uri_params.name')title = 'URI Params';
                    tempLogs.push({key: title, value: iterator['keywords']});
                } else {
                  if(params?.date_time || params?.start_time || params?.stop_time ||
                    params["post_variables.name"] || params["uri_params.name"] || params["keywords"]) continue;
                  tempLogs = [...tempLogs, ...this.setLogParams(iterator)];
                }
              }
            }
          }
        } else if(params[property] instanceof Object) {
          tempLogs = [...tempLogs, ...this.setLogParams(params[property])];
        } else {
          if(params?.operator) continue;
          if (
            property.toLowerCase() === 'check_flow' || property.toLowerCase() === 'operator' || property.toLowerCase() === 'order' ||
            property.toLowerCase() === 'join' || property.toLowerCase() === 'group' || property.toLowerCase() === 'select' ||
            property.toLowerCase() === 'mv' || property.toLowerCase() === 'title' || property.toLowerCase() === 'exist' ||
            property.toLowerCase() === 'ishistogram' || property.toLowerCase() === 'istarget' ||
            property.toLowerCase() === 'radius' || property.toLowerCase() === 'post_variables.name' ||
            property.toLowerCase() === 'uri_params.name'
          ) continue;

          if(property.toLowerCase() === 'start' || property.toLowerCase() === 'end') {
            if(params["start"] && params["end"] && typeof params["start"] === "string" && typeof params["end"] === "string") {
              tempLogs.push({key: "Date Range", value: [params["start"], params["end"]]});
              continue;
            }
          }
          if((property.toLowerCase() === 'start' || property.toLowerCase() === 'from') && typeof property !== "string") {
            tempLogs.push({key: "Start", value: params[property]});
          } else if((property.toLowerCase() === 'limit' || property.toLowerCase() === 'size') && typeof property !== "string") {
            tempLogs.push({key: "Size", value: params[property]});
          } else {
            let itemExists = false;
            for(let item of this.queryItems) {
              if(property.toLowerCase() === item.value) {
                tempLogs.push({key: item.name, value: params[property]});
                itemExists = true;
                break;
              }
            }
            if(!itemExists) {
              if(property.toLowerCase() === 'length(file_types_array)') {
                tempLogs.push({key: "Attachments", value: "No"});
              } else tempLogs.push({key: property[0].toUpperCase() + property.slice(1), value: params[property]});
            }
          }
        }
      }
    }
    return tempLogs;
  }

  removeDuplicates(list) {
    const uniqueArray = list.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return index === list.findIndex(obj => {
        return JSON.stringify(obj) === _thing;
      });
    });
    return uniqueArray;
  }
}
