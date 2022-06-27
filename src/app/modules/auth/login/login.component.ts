import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/helper/auth.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private helperService: HelperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      user: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, [Validators.required, Validators.minLength(4)]],
    });
  }

  submitForm(): void {
    for (const i in this.loginForm.controls) {
      if (i) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
  }

  login() {
    this.submitForm();
    console.log('called');
    if (this.loginForm.valid) {
      this.loading = true;
      const { user, password } = this.loginForm.value;

      this.authService.login(user, password).subscribe(
        (response) => {
          const tokenData = response.token;
          this.authService.saveLoginToken(tokenData);
          this.authService.saveLoginData(response.user);

          this.loading = false;
          this.helperService.showToast("Log in successfully");
          this.router.navigateByUrl("/pages");
        },
        (error) => {
          const errorMsg =
            error?.error.Error ||
            error?.detail?._message ||
            error?.error?.message ||
            error?.error?.errmsg ||
            "Something Went Wrong. Server Error!!";
          console.log("error", error, errorMsg);
          0;

          this.helperService.showToast(errorMsg, "error");

          this.loading = false;
        }
      );
    }
  }
}
