import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/helper/auth.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss'],
})
export class NavHeaderComponent implements OnInit {
  mainMenuToggle = false;
  userMenuToggle = false;
  submenuSelection: any;
  paddingvalue: any;
  currentUser;
  mName: any;
  submenuItem;
  selectedSubMenuItem;

  constructor(
    private authService: AuthService,
    private router: Router,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getLoginData();
  }

  toggleMenu(link) {
    this.submenuItem = this.submenuSelection.find((e) => e.path === link);

    this.mainMenuToggle = false;
    this.paddingvalue = null;
    this.helperService.setTopmenuStatus(false);
    this.router.navigateByUrl(link);
  }

  toggleUserMenu() {
    this.userMenuToggle = !this.userMenuToggle;
  }

  logoutUser() {
    this.authService.logout();
  }

  selectedvalue(value: any) {
    if (this.submenuSelection) {
      this.submenuSelection = null;
    }

    if (value?.length > 0) {
      if (this.paddingvalue && this.paddingvalue === value[0].paddingvalue) {
        this.paddingvalue = null;
        this.helperService.setTopmenuStatus(false);
      } else {
        this.paddingvalue = value[0].paddingvalue;
        this.mainMenuToggle = true;
        this.helperService.setTopmenuStatus(true);
      }
    } else {
      this.paddingvalue = null;
      this.helperService.setTopmenuStatus(false);
    }
    this.submenuSelection = value;
  }

  menuname(value: any) {
    this.mName = value;
  }
}
