import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppMenuService {
  menu = [
  
  ];
  menuList = [];
  currentLoggedUser;

  constructor() {}

  getMenuList() {
    this.currentLoggedUser = JSON.parse(localStorage.getItem("preferences"));
    if (
      (this.currentLoggedUser?.roles_assigned?.length ||
        this.currentLoggedUser?.user_custom_roles?.length) &&
      !this.menuList?.length
    ) this.initializeMenuList();

    return this.menuList;
  }

  initializeMenuList() {
    if (!this.menuList?.length) {
      const data = this.currentLoggedUser;
      this.currentLoggedUser = data;
      if (data.role_type === "superadmin") {
        this.menuList = [...this.menu];
      } else if (data?.role_type === "admin") {
        this.menuList = [...this.menu];
      } else {
        // this.displayList = [...this.menu];
        for (let item of this.menu) {
          let childArray = [];
          if (item?.children) {
            for (let child of item?.children) {
              if (data?.roles_assigned?.includes(child?.roleId)) {
                childArray.push(child);
              }
            }
            item.children = childArray;
            if (item?.children && item?.children?.length > 0) {
              this.menuList.push(item);
            }
          } else {
            if (Array.isArray(item?.roleId)) {
              if (this.findCommonElement(item?.roleId, data?.roles_assigned)) {
                this.menuList.push(item);
              }
            } else {
              if (data?.roles_assigned.includes(item?.roleId))
                this.menuList.push(item);
            }
          }
        }
      }
    }
  }

  resetMenuList() {
    this.menuList = [];
  }

  findCommonElement(array1, array2) {
    for (let i = 0; i < array1.length; i++) {
      for (let j = 0; j < array2.length; j++) {
        if (array1[i] === array2[j]) {
          return true;
        }
      }
    }

    return false;
  }
}
