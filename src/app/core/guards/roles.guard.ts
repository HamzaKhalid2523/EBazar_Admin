import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

import { Injectable } from "@angular/core";
import { AuthService } from "../services/helper/auth.service";
import { AppMenuService } from "../services/helper/appmenu.service";

@Injectable({
  providedIn: "root",
})
export class RolesGuard implements CanActivate {
  user: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private appMenuService: AppMenuService
  ) {}

  canActivate(route: ActivatedRouteSnapshot) {
    this.user = this.authService.getLoginData();

    if (this?.user?.role_type === "superadmin") {
      return true;
    } else {
      let roleFound = false;
      if (Array.isArray(route?.data?.roleId)) {
        roleFound = this.findCommonElement(
          this.user.roles_assigned,
          route?.data?.roleId
        );
      } else if (
        (this.user.roles_assigned?.length &&
          this.user.roles_assigned.includes(route.data.roleId)) ||
        (this.user.user_custom_roles?.length &&
          this.user.user_custom_roles.includes(route.data.roleId))
      ) {
        roleFound = true;
      }

      if (roleFound) return roleFound;
      let menuList = this.appMenuService.getMenuList();
      let menuFound = false;

      for(let menu of menuList) {
        if (menu?.roleId) {
          if (Array.isArray(menu?.roleId)) {
            for(const id of menu?.roleId) {
              if (
                (this.user.roles_assigned?.length &&
                  this.user.roles_assigned.includes(id)) ||
                (this.user.user_custom_roles?.length &&
                  this.user.user_custom_roles.includes(id))
              ) {
                menuFound = true;
                this.router.navigateByUrl(menu?.link);
                break;
              }
            };
          } else {
            if (
              (this.user.roles_assigned?.length &&
                this.user.roles_assigned.includes(menu?.roleId)) ||
              (this.user.user_custom_roles?.length &&
                this.user.user_custom_roles.includes(menu?.roleId))
            ) {
              menuFound = true;
              this.router.navigateByUrl(menu?.link);
            }
          }
        } else if (menu?.children && menu?.children.length) {
          for(const subMenu of menu?.children) {
            if (
              (this.user.roles_assigned?.length &&
                this.user.roles_assigned.includes(subMenu?.roleId)) ||
              (this.user.user_custom_roles?.length &&
                this.user.user_custom_roles.includes(subMenu?.roleId))
            ) {
              menuFound = true;
              this.router.navigateByUrl(subMenu?.link);
              break;
            }
          };
        }
        if(menuFound) break;
      };

      //custom route redirected if user is forbidden
      if (!menuFound) this.router.navigateByUrl("/main-menu");
    }
  }

  findCommonElement(array1, array2) {
    for (let i = 0; i < array1?.length; i++) {
      for (let j = 0; j < array2?.length; j++) {
        if (array1[i] === array2[j]) {
          return true;
        }
      }
    }

    return false;
  }
}
