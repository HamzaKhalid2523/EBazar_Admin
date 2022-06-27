import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { AuthService } from "../services/helper/auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const user = this.authService.getLoginData();

    if (route.data.role && route.data.role.indexOf(user.role_type) === -1) {
      if (user?.role_type === "analyst") {
        this.router.navigateByUrl("/admin/case-management");
      } else {
        this.router.navigateByUrl("/admin");
      }
    } else {
      return true;
    }
  }
}
