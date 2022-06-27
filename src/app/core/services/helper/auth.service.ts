import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreConfig } from './core.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { UsersService } from '../api/users.service';
// import { AppMenuService } from "./appmenu.service";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UsersService
  ) {}

  public saveLoginToken(token) {
    localStorage.setItem('ebazar_token', token);
  }
  public saveLoginData(preferences) {
    localStorage.setItem('ebazar_login_data', JSON.stringify(preferences));
  }

  public getLoginToken() {
    const token = localStorage.getItem('ebazar_token');
    return token;
  }
  public getLoginData() {
    const preferences = localStorage.getItem('ebazar_login_data');
    try {
      return JSON.parse(preferences);
    } catch (ex) {
      console.log('ex', ex);
    }
  }

  public removeLoginUser() {
    this.userService.logoutUser().subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      }
    );
    this.clearToken();
  }

  clearToken() {
    localStorage.removeItem('ebazar_token');
    localStorage.removeItem('ebazar_login_data');
    this.router.navigateByUrl('/auth/login');
  }

  public login(user: string, password: string): Observable<any> {
    const url = CoreConfig.getApiPath() + `/admins/login`;
    const body = { user, password };

    return this.http.post(url, body);
  }

  public logout() {
    this.removeLoginUser();
  }

  public checkRole(roleid) {
    const user = this.getLoginData();
    if (user?.role_type === 'superadmin') {
      return true;
    } else {
      if (user?.roles_assigned.includes(roleid)) {
        return true;
      } else {
        return false;
      }
    }
  }
}
