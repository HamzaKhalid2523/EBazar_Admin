import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from '../auth/auth.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SharedModule } from '../shared/shared.module';

const components = [
  AuthComponent, LoginComponent
];

const nzComponents = [NzButtonModule, NzSpinModule];
@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ...nzComponents,
  ],
})
export class AuthModule {}
