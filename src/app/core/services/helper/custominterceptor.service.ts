import "rxjs/add/operator/do";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";
import { HelperService } from "./helper.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private helperService: HelperService,
    private authService: AuthService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).do(
      event => { },
      err => {
        console.log(err);
        if (err instanceof HttpErrorResponse && err.status === 401 || err.status === 403) {
          // this.helperService.showToast(err?.error?.message || err?.error.Error || err.message, "error");
          this.authService.clearToken();
          return;
        }

        if (err instanceof HttpErrorResponse && (err.status === 500 || err.status === 429)) {
          this.helperService.showToast(err?.error?.message || err?.error.Error || err.message, "error");
          return;
        }
      }
    );
  }
}
