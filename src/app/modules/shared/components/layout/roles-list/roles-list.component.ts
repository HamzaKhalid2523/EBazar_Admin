import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import * as clone from 'deepclonevariable';
import { NzFormatEmitEvent } from 'ng-zorro-antd/tree';
import { OperationRolesService } from 'src/app/core/services/api/operation-roles.service';
import { RolesService } from 'src/app/core/services/api/roles.service';
import { ListingService } from 'src/app/core/services/helper/listings.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss'],
})
export class RolesListComponent implements OnInit, OnChanges {
  constructor(
    private listingService: ListingService,
    private rolesService: RolesService,
    private operationService: OperationRolesService
  ) {}

  @Input() roles_assigned = [];
  @Input() disableRoles = false;
  @Input() viewRolesList = false;
  @Input() selectAll = false;
  @Input() roleId = '';
  @Output() rolesEmitter = new EventEmitter<any>();

  checkboxDisplayArray = [];
  checkedRoles = 0;
  rolesArray: any = [];
  latestRolesArray: any = [];
  loading = false;
  allRolesChecked = false;
  defaultCheckedKeys = [];
  defaultSelectedKeys = [];
  defaultExpandedKeys = [];
  nodes = [];

  ngOnInit() {
    this.getRolesList()
  }

  async ngOnChanges() {

    // if(this.rolesArray.length){
    // this.setNodes()
    // }
    
    // this.loading = true;
    // if (this.roles_assigned && this.roles_assigned.length) {
    //   await this.getRolesList();
    // } else if (this.roleId) {
    //   this.rolesService
    //     .getDataById(this.roleId, { title: 'View Roles' + this.roleId })
    //     .subscribe(
    //       async (res) => {
    //         this.roles_assigned = res?.data?.roles_assigned;
    //         await this.getRolesList();
    //       },
    //       (err) => {
    //         console.error('error', err);
    //         this.loading = false;
    //       }
    //     );
    // } else {
    //   await this.getRolesList();
    // }
  }
  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    this.generateCheckboxArray();
  }
  getRolesList() {
    this.operationService
      .getData({ title: 'View Roles', isLogged: false })
      .subscribe(
        (res) => {
          this.rolesArray = res.data;
          this.listingService.listOfRoles = res.data;
          this.setNodes();
        },
        (err) => {
          console.error('Error while getting roles', err);
          this.loading = false;
        }
      );
  }

  setNodes() {
    const all_nodes = clone(this.rolesArray);
    for (let item of all_nodes) {
      item.title = item.role;
      item.value = item.roleId;
      item.isLeaf = true;
      item.selectable = this.disableRoles;
      item.expanded = true;
      item.isExpanded = true;
    }
    const uniqueModules = [...new Set(all_nodes.map((obj) => obj.module))];
    let finalNodes = [];
    this.defaultExpandedKeys = uniqueModules;
    for (let item of uniqueModules) {
      let obj = {};
      obj['title'] = item;
      obj['expanded'] = true;

      obj['selectable'] =  this.disableRoles;
   
      const objects = all_nodes.filter((e) => e.module === item);
      obj['children'] = objects;
      for(let child of  obj['children']){
        if(  this.roles_assigned.includes(Number(child.roleId))){
          console.log('done',child);
          child.checked = true
        }
      }
      finalNodes.push(obj);
    }

    this.nodes = finalNodes;
    console.log(finalNodes);
  }

  generateCheckboxArray() {
    let checkedArray = [];
    for (let item of this.nodes) {
      for (let child of item.children) {
        console.log(child);
        if (child.checked) {
          checkedArray.push(child.roleId);
        }
      }
    }
    console.log(checkedArray);
    this.rolesEmitter.emit({checkedArray});
  }
  // getRolesList() {
  //   if (!this.listingService.listOfRoles) {
  //     this.operationService.getData({title: "View Roles", isLogged: false}).subscribe(
  //       (res) => {
  //         this.rolesArray = res.data;
  //         this.listingService.listOfRoles = res.data;
  //         this.checkRole();
  //       },
  //       (err) => {
  //         console.error("Error while getting roles", err);
  //         this.loading = false;
  //       }
  //     );
  //   } else if (this.listingService.listOfRoles) {
  //     this.rolesArray = clone(this.listingService.listOfRoles);
  //     this.checkRole();
  //   }
  // }

  // checkRole() {
  //   if (this.roles_assigned && this.roles_assigned.length) {
  //     for (let item of this.rolesArray) {
  //       let found = false;
  //       if(this.roles_assigned instanceof Array) {
  //         found = this.roles_assigned.find((e) => e === item["roleId"]);
  //       }
  //       if (found) {
  //         item["checked"] = true;
  //         this.checkedRoles++;
  //       }
  //       else item["checked"] = false;
  //     }
  //   } else for (let item of this.rolesArray) item["checked"] = false;
  //   this.checkboxDisplayArray = [...this.rolesArray];
  //   if(this.checkboxDisplayArray.length === this.checkedRoles) this.selectAll = true;

  //   this.modifyRoles();
  // }

  // modifyRoles() {
  //   const tempRoles = [];

  //   this.checkboxDisplayArray.forEach((item) => {
  //     if(tempRoles.includes(item.role)) {
  //       this.latestRolesArray[tempRoles.indexOf(item.role)].operation.push(item.operation);
  //       this.latestRolesArray[tempRoles.indexOf(item.role)][item.operation] = {
  //         roleId: item.roleId,
  //         checked: false
  //       };
  //     } else {
  //       tempRoles.push(item.role);
  //       this.latestRolesArray.push({
  //         roleName: item.role,
  //         operation: [item.operation],
  //         View: {},
  //         Add: {},
  //         Edit: {},
  //         Delete: {},
  //         Cancel: {},
  //         Download: {}
  //       });
  //       this.latestRolesArray[tempRoles.indexOf(item.role)][item.operation] = {
  //         roleId: item.roleId,
  //         checked: false
  //       };
  //     }
  //   });

  //   this.loading = false;
  //   console.log(this.latestRolesArray);
  // }

  // selectAllAllowdRoles(data) {
  //   if (data) for (let item of this.rolesArray) item["checked"] = true;
  //   else for (let item of this.rolesArray) item["checked"] = false;
  //   this.checkboxDisplayArray = [...this.rolesArray];
  //   this.rolesEmitter.emit(this.checkboxDisplayArray);
  // }

  // logChanges(event) {
  //   for(let item of this.checkboxDisplayArray) {
  //     if(item.roleId === event.roleId) {
  //       item.checked = event.checked;
  //       break;
  //     }
  //   }
  //   console.log(this.checkboxDisplayArray);
  //   this.rolesEmitter.emit(this.checkboxDisplayArray);
  // }

  // logRowChanges(option, event) {
  //   event.operation.forEach(op => {
  //     const role = event[op];
  //     event[op].checked = option;
  //     for(let item of this.checkboxDisplayArray) {
  //       if(item.roleId === role.roleId) {
  //         item.checked = option;
  //         break;
  //       }
  //     }
  //   });

  //   console.log(this.checkboxDisplayArray);
  //   this.rolesEmitter.emit(this.checkboxDisplayArray);
  // }

  // updateAllChecked() {
  //   this.latestRolesArray.forEach(event => {
  //     event.checked = this.allRolesChecked;
  //     event.operation.forEach(op => {
  //       event[op].checked = this.allRolesChecked;
  //       for(let item of this.checkboxDisplayArray) {
  //         item.checked = this.allRolesChecked;
  //       }
  //     });
  //   });
  //   console.log(this.checkboxDisplayArray);
  //   this.rolesEmitter.emit(this.checkboxDisplayArray);
  // }
}
