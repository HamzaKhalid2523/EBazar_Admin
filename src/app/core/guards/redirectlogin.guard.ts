import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from '../services/helper/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RedirectLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.getLoginToken()) {
      this.router.navigateByUrl('/pages');
    } else {
      return true;
    }
  }
}
