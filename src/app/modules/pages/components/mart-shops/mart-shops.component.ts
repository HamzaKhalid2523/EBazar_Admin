import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MartShopsService } from 'src/app/core/services/api/martShops.service';
import { OriginalShopsService } from 'src/app/core/services/api/originalShops.service';
import { AuthService } from 'src/app/core/services/helper/auth.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';

@Component({
  selector: 'app-mart-shops',
  templateUrl: './mart-shops.component.html',
  styleUrls: ['./mart-shops.component.scss']
})
export class MartShopsComponent implements OnInit {

  selectedStatus;
  selectedCompany;
  search_string;

  uniqueCompanies = [];
  dataList = [];
  dataTotalCount = 0;
  pageSize = 20;
  pageIndex = 1;
  dataLoading = false;

  filterDrawerVisible = true;
  filterDrawerPadding = true;
  topMenuStatus = false;

  currentLoggedUser;

  verficationModalVisible = false;
  verificationDataLoading = false;
  verificationData;
  verificationDataFound;

  constructor(
    private activatedRoute: ActivatedRoute,
    private helplerService: HelperService,
    private martShopsService: MartShopsService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private originalShopsService: OriginalShopsService,
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
    this.dataLoading = true;
    let filterOptions = this.getQueryFilters();

    this.martShopsService.getData(filterOptions).subscribe(
      (response) => {
        this.dataList = response?.data;
        this.uniqueCompanies = response?.unique_actions;
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
    if (this.selectedCompany) {
      filterOptions?.filters.push({ key: 'companyName', value: this.selectedCompany, operator: 'equals' });
    }
    if (this.search_string) {
      filterOptions?.filters.push({ key: 'companyName,companyAddress', value: this.search_string, operator: 'like' });
    }

    return filterOptions;
  }

  // Change User Status (Enable, Disable)
  changeStatus(object) {
    this.dataLoading = true;
    const data = {
      status: object["status"] ? false : true,
    };

    this.martShopsService.updateData(object._id, data).subscribe(
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
    this.martShopsService.deleteData(object._id).subscribe(
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

  getVerificationData(data) {
    this.spinner.show('verificationDataLoading');
    this.verificationDataLoading = true;
    this.verficationModalVisible = true;
    this.verificationData = data;

    const filters = [
      {key: 'seller', value: data?.seller.username, operator: 'equals'},
      {key: 'email', value: data?.seller.email, operator: 'equals'},
      {key: 'phone', value: data?.seller.phone, operator: 'equals'},
      {key: 'companyName', value: data?.companyName, operator: 'equals'}
    ];

    this.originalShopsService.getData({filters}).subscribe(
      (response) => {
        this.verificationDataFound = response.data[0];
        this.verificationDataLoading = false;
        this.spinner.hide('verificationDataLoading');
      },
      (error) => {
        console.log("error", error);
        this.verificationDataLoading = false;
        this.spinner.hide('verificationDataLoading');
      }
    );
  }

  updateStatus() {
    const data = {
      seller: this.verificationData?.seller?._id,
      status: this.verificationDataFound ? true : false
    };
    this.martShopsService.updateShopStatus(this.verificationData?._id, data).subscribe(
      (response) => {
        this.verficationModalVisible = false;
        this.getAllData();
      },
      (error) => {
        console.log("error", error);
      }
    );
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
