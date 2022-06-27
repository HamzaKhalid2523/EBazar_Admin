import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminsService } from 'src/app/core/services/api/admins.service';
import { AuthService } from 'src/app/core/services/helper/auth.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  selectedStatus;
  selectedUser;
  selectedEmail;
  selectedPhone;
  search_string;

  uniqueUsers = [];
  uniqueEmails = [];
  uniquePhone = [];
  dataList = [];
  dataTotalCount = 0;
  pageSize = 20;
  pageIndex = 1;
  dataLoading = false;

  formVisible = false;
  modalData;
  formType;

  selectedData;
  filterDrawerVisible = true;
  filterDrawerPadding = true;
  topMenuStatus = false;

  currentLoggedUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helplerService: HelperService,
    private adminService: AdminsService,
    private authService: AuthService
  ) {}

  // Method Declarations
  ngOnInit() {
    this.topMenuListener();
    this.currentLoggedUser = this.authService.getLoginData();
    this.activatedRoute.queryParamMap.subscribe((paramMap: any) => {
      this.getAllData();
    });
  }

  topMenuListener() {
    this.helplerService.getTopmenuStatus().subscribe(
      (response) => {
        this.topMenuStatus = response;
      }
    );
  }

  // Get All Users
  getAllData() {
    this.formVisible = false;
    this.dataLoading = true;
    let filterOptions = this.getQueryFilters();

    this.adminService.getData(filterOptions).subscribe(
      (response) => {
        this.dataList = response?.data;
        this.uniqueUsers = response?.unique_actions;
        this.dataTotalCount = response?.total;
        this.dataLoading = false;
      },
      (error) => {
        console.log("error", error);
        this.dataLoading = false;
      }
    );
  }

  // Pagination Implementation
  pageSizeChanged(e) {
    this.pageSize = e;
    this.getAllData();
  }
  pageIndexChanged(e) {
    this.pageIndex = e;
    this.getAllData();
  }

  getQueryFilters() {
    const limit = this.pageSize;
    const skip = (this.pageIndex - 1) * this.pageSize;
    const sort = '-createdAt';

    let filters = [];
    let filterOptions = { filters, limit, skip, sort, isLogged: true };

    if (this.selectedStatus && this.selectedStatus !== "all") {
      filterOptions?.filters.push({ key: 'status', value: this.selectedStatus, operator: 'equals' });
    }
    if (this.selectedUser) {
      filterOptions?.filters.push({ key: 'username', value: this.selectedUser, operator: 'equals' });
    }
    if (this.selectedEmail) {
      filterOptions?.filters.push({ key: 'email', value: this.selectedEmail, operator: 'equals' });
    }
    if (this.selectedPhone) {
      filterOptions?.filters.push({ key: 'phone', value: this.selectedPhone, operator: 'equals' });
    }
    if (this.search_string) {
      filterOptions?.filters.push({ key: 'username,email,phone,role,gender,address', value: this.search_string, operator: 'like' });
    }

    return filterOptions;
  }

  // Change User Status (Enable, Disable)
  changeStatus(object) {
    this.dataLoading = true;
    const data = {
      status: object["status"] ? false : true,
    };

    this.adminService.updateData(object._id, data).subscribe(
        (response) => {
          const msg = response.message;
          this.showToast(msg, "success");

          this.getAllData();
          this.dataLoading = false;
        },
        (error) => {
          const errorMsg =
            error?._message ||
            error?.detail?._message ||
            error?.error?.message ||
            "Server Error";

          this.showToast(errorMsg, "error");
          this.dataLoading = false;
        }
      );
  }

  // Delete User
  deleteData(object) {
    this.dataLoading = true;
    this.adminService.deleteData(object._id).subscribe(
      (response) => {
        this.showToast("Data Deteled Successfully", "success");
        this.getAllData();
        this.dataLoading = false;
      },
      (error) => {
        const errorMsg =
          error?.detail?._message ||
          error?.error?.message ||
          error?.error?.errmsg ||
          "Server Error";
        console.log("error", error, errorMsg);

        this.showToast(errorMsg, "error");
        this.dataLoading = false;
      }
    );
  }

  // Actions/Users Filters Applied
  statusSelected() {
    this.pageIndex = 1;
    this.getAllData();
  }

  showCreateModal() {
    this.modalData = null;
    this.formType = "Create";
    this.formVisible = true;
  }
  showEditModal(data) {
    this.modalData = data;
    this.formType = "Update";
    this.formVisible = true;
  }

  toggleFilterDrawer() {
    this.filterDrawerVisible = !this.filterDrawerVisible;
    if(this.filterDrawerVisible) {
      this.filterDrawerPadding = true;
    } else {
      setTimeout(() => {
        this.filterDrawerPadding = false;
      }, 800);
    }
  }

  // Show Toaster
  showToast(msg, status = "success") {
    if (status == "success") {
      this.helplerService.showToast(msg, "success");
    } else {
      this.helplerService.showToast(msg, "error");
    }
  }
}
