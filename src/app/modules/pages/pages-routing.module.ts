import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { isLoginGuard } from 'src/app/core/guards/islogin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { OriginalShopsComponent } from './components/original-shops/original-shops.component';
import { MartShopsComponent } from './components/mart-shops/mart-shops.component';
import { LocalShopsComponent } from './components/local-shops/local-shops.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [isLoginGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
        },
      },
      {
        path: 'admin',
        component: AdminComponent,
        data: {
        },
      },
      {
        path: 'original-mart-shops',
        component: OriginalShopsComponent,
        data: {
        },
      },
      {
        path: 'mart-shops',
        component: MartShopsComponent,
        data: {
        },
      },
      {
        path: 'local-shops',
        component: LocalShopsComponent,
        data: {
        },
      },
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
