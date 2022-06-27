import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from "@angular/core";
import * as clone from "deepclonevariable";
import { OperationRolesService } from "src/app/core/services/api/operation-roles.service";
import { RolesService } from "src/app/core/services/api/roles.service";
import { ListingService } from "src/app/core/services/helper/listings.service";

@Component({
  selector: "ngx-admin-roles-list-popup",
  styleUrls: ["./roles-list-popup.component.scss"],
  templateUrl: "./roles-list-popup.component.html",
})
export class RolesListPopupComponent implements OnInit, OnChanges {
  constructor(
    private listingService: ListingService,
    private rolesService: RolesService,
    private operationService: OperationRolesService
  ) {}

  @Input() roles_assigned = [];
  @Input() disableRoles = false;
  @Input() viewRolesList = false;
  @Input() selectAll = false;
  @Input() roleId = "";
  @Output() rolesEmitter = new EventEmitter<any>();

  checkboxDisplayArray = [];
  checkedRoles = 0;
  rolesArray: any;
  loading = false;

  ngOnInit() {}

  async ngOnChanges() {
    this.loading = true;
    if(this.roles_assigned && this.roles_assigned.length) {
      await this.getRolesList();
    } else if (this.roleId) {
      this.rolesService.getDataById(this.roleId, {title: "View Roles"+this.roleId}).subscribe(
        async (res) => {
          this.roles_assigned = res?.data?.roles_assigned;
          await this.getRolesList();
        },
        (err) => {
          console.error("error", err);
          this.loading = false;
        }
      );
    } else {
      await this.getRolesList();
    }
  }

  getRolesList() {
    if (!this.listingService.listOfRoles) {
      this.operationService.getData({title: "View Roles", isLogged: false}).subscribe(
        (res) => {
          this.rolesArray = res.data;
          this.listingService.listOfRoles = res.data;
          this.checkRole();
        },
        (err) => {
          console.error("Error while getting roles", err);
          this.loading = false;
        }
      );
    } else if (this.listingService.listOfRoles) {
      this.rolesArray = clone(this.listingService.listOfRoles);
      this.checkRole();
    }
  }

  checkRole() {
    if (this.roles_assigned && this.roles_assigned.length) {
      for (let item of this.rolesArray) {
        let found = false;
        if(this.roles_assigned instanceof Array) {
          found = this.roles_assigned.find((e) => e === item["roleId"]);
        }
        if (found) {
          item["checked"] = true;
          this.checkedRoles++;
        }
        else item["checked"] = false;
      }
    } else for (let item of this.rolesArray) item["checked"] = false;
    this.checkboxDisplayArray = [...this.rolesArray];
    if(this.checkboxDisplayArray.length === this.checkedRoles) this.selectAll = true;
    this.loading = false;
  }

  selectAllAllowdRoles(data) {
    if (data) for (let item of this.rolesArray) item["checked"] = true;
    else for (let item of this.rolesArray) item["checked"] = false;
    this.checkboxDisplayArray = [...this.rolesArray];
    this.rolesEmitter.emit(this.checkboxDisplayArray);
  }

  logChanges() {
    this.rolesEmitter.emit(this.checkboxDisplayArray);
  }
}
