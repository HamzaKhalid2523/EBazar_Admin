import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/helper/auth.service';
import { ListingService } from 'src/app/core/services/helper/listings.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent implements OnInit, OnChanges {

  @Input() submenuItem;
  @Output() selection = new EventEmitter<string>();
  @Output() menuname = new EventEmitter<string>();

  selectedMenuTitle: any;
  selectedMenu = 'Dashboard';
  menu = [];
  generalMenu = [
    // {
    //   path: '/pages/dashboard',
    //   title: 'Dashboard',
    //   icon: 'fas fa-chart-area',
    // },
    {
      path: '/pages/admin',
      title: 'Admin',
      icon: 'fas fa-calendar',
    },
    {
      path: '/pages/original-mart-shops',
      title: 'Original Mart Shops',
      icon: 'fas fa-server',
    },
    {
      path: '/pages/mart-shops',
      title: 'Mart Shops',
      icon: 'fas fa-server',
    },
    {
      path: '/pages/local-shops',
      title: 'Local Shops',
      icon: 'fas fa-server',
    }
  ];

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
    const currentUrl = this.router.url.split('?')[0];
    this.menu.forEach((item: any) => {
      if (item.path && item.path === currentUrl) {
        this.selectedMenu = item.title;
        return;
      } else if (item.children && item.children.length) {
        for (let ch of item.children) {
          if (ch.path && ch.path === currentUrl) {
            this.selectedMenu = ch.title;
            return;
          }
        }
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.menu = this.generalMenu;

    if (
      changes.submenuItem?.previousValue !== changes.submenuItem?.currentValue
    ) {
      for (let menuItem of this.menu) {
        if (menuItem.children && menuItem.children.length) {
          for (let child of menuItem.children) {
            if (child.path === this.submenuItem.path) {
              this.selectedMenu = menuItem.title;
              return;
            }
          }
        }
      }
    }
  }

  toggleMenu(menu: string, item: any, link: any) {
    this.selection.emit(item);
    this.menuname.emit(menu);

    if (
      menu === 'IPDR Search' ||
      menu === 'Settings' ||
      menu === 'Bigdata Case Management'
    ) {
      return;
    }
    this.selectedMenu = menu;
    this.router.navigateByUrl(link);
  }
}
