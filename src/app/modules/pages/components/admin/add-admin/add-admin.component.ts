import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AdminsService } from 'src/app/core/services/api/admins.service';
import { FirebaseImageHandler } from 'src/app/core/services/api/firebase-image-handler.service';
import { AuthService } from 'src/app/core/services/helper/auth.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  @Output() modalVisible = new EventEmitter<any>();
  @Input() formType = "Create";
  @Input() updatedData;

  userForm: FormGroup;
  passwordForm: FormGroup;
  userLoading = false;
  passwordLoading = false;
  referenceObj: any;
  currentLoggeduser: any;

  defaultTab = "Edit Profile";
  changePasswordRole: boolean;

  roleTypes = [
    {value: 'admin', label: 'Admin'},
    {value: 'operator', label: 'Operator'}
  ];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminsService,
    private helplerService: HelperService,
    private authService: AuthService,
    private firebaseImageHandler: FirebaseImageHandler,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.initializeForm();
    this.passwordFormInitializer();
  }

  createForm() {
    this.userForm = this.fb.group({
      username: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.minLength(4), Validators.email]],
      phone: [ null, [ Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      role: ['operator', [Validators.required]],
      gender: ['male', [Validators.required]],
      cnic: [null, [Validators.required]],
      address: [null, [Validators.required]],
      photoAvatar: [null, []],
      status: [true, [Validators.required]],
    });
  }

  initializeForm() {
    if(this.formType === 'Create') return;
    else if(this.formType === 'Update') {
      this.userForm.reset();
      this.userForm.patchValue({ username: this.updatedData?.username });
      this.userForm.patchValue({ email: this.updatedData?.email });
      this.userForm.patchValue({ phone: this.updatedData?.phone });
      this.userForm.patchValue({ password: this.updatedData?.password });
      this.userForm.patchValue({ role: this.updatedData?.role });
      this.userForm.patchValue({ gender: this.updatedData?.gender });
      this.userForm.patchValue({ cnic: this.updatedData?.cnic });
      this.userForm.patchValue({ address: this.updatedData?.address });
      this.userForm.patchValue({ photoAvatar: this.updatedData?.photoAvatar });
      this.userForm.patchValue({ status: this.updatedData?.status });

      this.userForm.controls["password"].disable();
      this.createReference(this.userForm.value);
    }
  }

  passwordFormInitializer() {
    this.passwordForm = this.fb.group({
      currentPassword: [null, [Validators.required, Validators.minLength(6)]],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6), this.matchOtherValidator('newPassword')]]
    });
  }

  matchOtherValidator(otherControlName: string) {
    return (control: AbstractControl): { [key: string]: any } => {
      const otherControl: AbstractControl = control.root.get(otherControlName);

      if (otherControl) {
        const subscription: Subscription = otherControl.valueChanges.subscribe(
          () => {
            control.updateValueAndValidity();
            subscription.unsubscribe();
          }
        );
      }

      return otherControl && control.value !== otherControl.value
        ? { match: true }
        : null;
    };
  }

  onImagePicked(imageData: File) {
    this.userForm.patchValue({ photoAvatar: imageData });
  }

  submitForm() {
    if (!this.userForm.valid) return;
    const value = this.userForm.value;

    if(this.formType === "Update") this.updateData(value);
    else if(this.formType === "Create") this.saveData(value);
  }

  // Udate User
  updateData(object) {
    this.userLoading = true;
    const data = this.helplerService.getChangedObj(this.referenceObj, object);

    this.adminService.updateData(this.updatedData["_id"], data)
    .subscribe(
      (response) => {
        const msg = response.message;
        this.showToast(msg, "success");
        this.modalVisible.emit();
      },
      (error) => {
        let errorMsg;
        if (error?.status === 422 || error?.error?.code === 422) {
          errorMsg = "No Field to be Updated!";
        } else {
          errorMsg = error?._message || error?.detail?._message ||
                    error?.error?.message || "Something Went Wrong. Server Error!!";
        }
        this.showToast(errorMsg, "error");
        this.userLoading = false;
      }
    );
  }

  // Add User
  async saveData(object) {
    this.userLoading = true;
    const uploadImgObs = await this.firebaseImageHandler.uploadProfileImg(
      this.userForm.value,
      'admins'
    );
    uploadImgObs.subscribe(async (imgUrl) => {
      this.adminService.createData(object, imgUrl).subscribe(
        (response) => {
          if (response?.detail?.code === 11000 || response?.message === "Error") {
            const errorMsg = response?.message || response?.detail?._message || response?.error?.message ||
                            response?.message || "Something Went Wrong. Server Error!!";
            this.showToast(errorMsg, "error");
            this.userLoading = false;
          } else {
            const msg = response.message;
            this.showToast(msg, "success");
            this.userLoading = false;
            this.modalVisible.emit();
          }
        },
        (error) => {
          this.firebaseImageHandler.deleteImage(imgUrl);
          const errorMsg = error?.message || error?._message || error?.detail?._message ||
                          error?.error?.message || "Something Went Wrong. Server Error!!";
          this.showToast(errorMsg, "error");
          this.userLoading = false;
        }
      );
    });
  }

  changePassord() {
    this.passwordLoading = true;
    this.adminService
    .changePassowrd(this.updatedData["_id"], this.passwordForm.value)
    .subscribe(
      (response) => {
        this.showToast(response.message, "success");
        this.modalVisible.emit();
        this.passwordLoading = false;
      },
      (error) => {
        const errorMsg =
          error?.error?.message ||
          "Server Issue!";
        console.log(error, errorMsg);

        this.showToast(errorMsg, "error");
        this.passwordLoading = false;
      }
    );
  }

  createReference(obj: any) {
    this.referenceObj = Object.assign({}, obj);
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
