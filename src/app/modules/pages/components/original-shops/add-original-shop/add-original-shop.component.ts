import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseImageHandler } from 'src/app/core/services/api/firebase-image-handler.service';
import { OriginalShopsService } from 'src/app/core/services/api/originalShops.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-add-original-shop',
  templateUrl: './add-original-shop.component.html',
  styleUrls: ['./add-original-shop.component.scss']
})
export class AddOriginalShopComponent implements OnInit {

  @Output() modalVisible = new EventEmitter<any>();
  @Input() formType = "Create";
  @Input() updatedData;

  shopForm: FormGroup;
  userLoading = false;
  referenceObj: any;
  currentLoggeduser: any;

  constructor(
    private fb: FormBuilder,
    private originalShopsService: OriginalShopsService,
    private helplerService: HelperService,
    private firebaseImageHandler: FirebaseImageHandler,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.initializeForm();
  }

  createForm() {
    this.shopForm = this.fb.group({
      seller: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.minLength(4), Validators.email]],
      phone: [ null, [ Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
      cnic: [null, [Validators.required]],
      address: [null, [Validators.required]],
      companyName: [null, [Validators.required]],
      companyAddress: [null, [Validators.required]],
      companyDocs: [null, []],
      status: [true, [Validators.required]],
    });
  }

  initializeForm() {
    if(this.formType === 'Create') return;
    else if(this.formType === 'Update') {
      this.shopForm.reset();
      this.shopForm.patchValue({ seller: this.updatedData?.seller });
      this.shopForm.patchValue({ email: this.updatedData?.email });
      this.shopForm.patchValue({ phone: this.updatedData?.phone });
      this.shopForm.patchValue({ cnic: this.updatedData?.cnic });
      this.shopForm.patchValue({ address: this.updatedData?.address });
      this.shopForm.patchValue({ companyName: this.updatedData?.companyName });
      this.shopForm.patchValue({ companyAddress: this.updatedData?.companyAddress });
      this.shopForm.patchValue({ companyDocs: this.updatedData?.companyDocs });
      this.shopForm.patchValue({ status: this.updatedData?.status });
      this.createReference(this.shopForm.value);
    }
  }

  onImagePicked(imageData: any) {
    const files = [];
    var filesAmount = imageData.length;
    for (let i = 0; i < filesAmount; i++) {
      files.push(imageData[i]);
    }
    this.shopForm.patchValue({ companyDocs: files });
  }

  removeImage(index) {
    const files = this.shopForm.get('companyDocs').value;
    files.splice(index, 1);
    this.shopForm.patchValue({ companyDocs: files });
  }

  submitForm() {
    if (!this.shopForm.valid) return;
    const value = this.shopForm.value;

    if(this.formType === "Update") this.updateData(value);
    else if(this.formType === "Create") this.saveData(value);
  }

  // Udate User
  updateData(object) {
    this.userLoading = true;
    const data = this.helplerService.getChangedObj(this.referenceObj, object);

    this.originalShopsService.updateData(this.updatedData["_id"], data)
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
    const uploadImgObs = combineLatest(await this.firebaseImageHandler.uploadMartShopsDocs(
      this.shopForm.value,
      'originalMartShops'
    ));
    uploadImgObs.subscribe(async (imgUrls) => {
      this.originalShopsService.createData(object, imgUrls).subscribe(
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
          imgUrls.forEach(img => {
            this.firebaseImageHandler.deleteImage(img);
          });
          const errorMsg = error?.message || error?._message || error?.detail?._message ||
                          error?.error?.message || "Something Went Wrong. Server Error!!";
          this.showToast(errorMsg, "error");
          this.userLoading = false;
        }
      );
    });
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
