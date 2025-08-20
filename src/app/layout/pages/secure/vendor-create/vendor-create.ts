import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToasterService } from '../../../../services/shared/toaster-service';
import { finalize, Subscription } from 'rxjs';
import { CommonService } from '../../../../services/shared/common-service';
import { ApiResponse } from '../../../../models/shared/ApiResponse.Model';
import { ICommonDropdownList } from '../../../../models/shared/common-modal-module';
import { VendorService } from '../../../../services/vendor-service';


@Component({
  selector: 'app-vendor-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vendor-create.html',
  styleUrl: './vendor-create.css'
})
export class VendorCreate {
  loading: boolean = false;
  addVendorForm!: FormGroup;
  subscription: Subscription[] = [];
  getAllCountry: ICommonDropdownList[] = [];
  stateByCountryId: ICommonDropdownList[] = [];
  cityByStateId: ICommonDropdownList[] = [];
  GovtDocumentType: ICommonDropdownList[] = [];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private _toasterService: ToasterService,
    private _commonService: CommonService,
    private _vendorService: VendorService
  ) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initVendorCreateForm();
      this.getCountries();
      this.GovtGovtDocumentType();
    }
  }
  initVendorCreateForm() {
    this.addVendorForm = this.fb.group({
      id: [0],
      isVendorType: [''],
      partnerTypeName: [''],
      companyName: [''],
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
      emailId: [''],
      profileImageUrl: [''],
      address: [''],
      password: [''],
      documentIdNumber: [''],
      documentImageURL: [''],
      countryId: ['0'],
      stateId: ['0'],
      cityId: [''],
      govtId: [''],
      userName: ['']
    });
  }
  getCountries() {
    this.loading = true;
    this.subscription.push(
      this._commonService.GetCountriesList()
        .pipe(finalize(() => {
          this.loading = false;
        }))
        .subscribe({
          next: (response: ApiResponse<ICommonDropdownList[]>) => {
            if (response.success) {
              this.getAllCountry = response.data;
              console.log(this.getAllCountry)
            }
          },
          error: (err) => {
            this._toasterService.warning('Failed To Load Data')
            console.error('Error fetching countries:', err);
          }
        })
    );
  }
  onCountryChange() {
    const data = this.addVendorForm.get('countryId')?.value
    if (!data) { return };
    this.loading = true;
    this.subscription.push(
      this._commonService.getStateByCountryId(data)
        .pipe(finalize(() => {
          this.loading = false;
        }))
        .subscribe({
          next: (response: ApiResponse<ICommonDropdownList[]>) => {
            if (response.success) {
              this.stateByCountryId = response.data;
              console.log(this.stateByCountryId)
            }
          },
          error: (err) => {
            this._toasterService.warning('Failed To Load Data')
            console.error('Error fetching state:', err);
          }
        })
    );
  }
  onStateChange() {
    const data = this.addVendorForm.get('stateId')?.value
    if (!data) { return };
    this.loading = true;
    this.subscription.push(
      this._commonService.getCityByStateId(data)
        .pipe(finalize(() => {
          this.loading = false;
        }))
        .subscribe({
          next: (response: ApiResponse<ICommonDropdownList[]>) => {
            if (response.success) {
              this.cityByStateId = response.data;
              console.log(this.cityByStateId)
            }
          },
          error: (err) => {
            this._toasterService.warning('Failed To Load Data')
            console.error('Error fetching state:', err);
          }
        })
    );
  }
  onCityChange() { }
  GovtGovtDocumentType() {
    this.loading = true;
    this.subscription.push(
      this._commonService.GovtGovtDocumentType()
        .pipe(finalize(() => {
          this.loading = false;
        }))
        .subscribe({
          next: (response: ApiResponse<ICommonDropdownList[]>) => {
            if (response.success) {
              this.GovtDocumentType = response.data;
              console.log(this.GovtDocumentType)
            }
          },
          error: (err) => {
            this._toasterService.warning('Failed To Load Data')
            console.error('Error fetching state:', err);
          }
        })
    );
  }
  onSubmit() {
    const f = this.addVendorForm.value;
    let erroMsg = [];
    if (!f.isVendorType) {
      this._toasterService.warning('Vendor Type is required');
      return;
    }
    if (!f.firstName) {
      this._toasterService.warning('First Name is required');
      return;
    }
    if (!f.lastName) {
      this._toasterService.warning('last Name is required');
      return;
    } if (!f.phoneNumber) {
      this._toasterService.warning('phone number is required');
      return;
    }
    if (!f.emailId) {
      this._toasterService.warning('Email is required');
      return;
    }
    if (!f.address) {
      this._toasterService.warning('address is required');
      return;
    } if (!f.password) {
      this._toasterService.warning('Password is required');
      return;
    }
    if (!f.countryId) {
      this._toasterService.warning('Country is required');
      return;
    }
    if (!f.stateId) {
      this._toasterService.warning('state is required');
      return;
    }
    if (!f.cityId) {
      this._toasterService.warning('city is required');
      return;
    }
    if (!f.govtId) {
      this._toasterService.warning('govt id is required');
      return;
    }
    if (!f.userName) {
      this._toasterService.warning('user name id is required');
      return;
    }
    const data = {
      id: this.addVendorForm.get('id')?.value,
      isVendorType: this.addVendorForm.get('isVendorType')?.value,
      partnerTypeName: this.addVendorForm.get('partnerTypeName')?.value,
      companyName: this.addVendorForm.get('companyName')?.value,
      firstName: this.addVendorForm.get('firstName')?.value,
      lastName: this.addVendorForm.get('lastName')?.value,
      phoneNumber: this.addVendorForm.get('phoneNumber')?.value,
      emailId: this.addVendorForm.get('emailId')?.value,
      profileImageUrl: this.addVendorForm.get('profileImageUrl')?.value,
      address: this.addVendorForm.get('address')?.value,
      password: this.addVendorForm.get('password')?.value,
      documentIdNumber: this.addVendorForm.get('documentIdNumber')?.value,
      documentImageURL: this.addVendorForm.get('documentImageURL')?.value,
      countryId: this.addVendorForm.get('countryId')?.value,
      stateId: this.addVendorForm.get('stateId')?.value,
      cityId: this.addVendorForm.get('cityId')?.value,
      govtId: this.addVendorForm.get('govtId')?.value,
      userName: this.addVendorForm.get('userName')?.value,
    }
    this.loading = true
    this.subscription.push(
      this._vendorService.AddVendorList(data)
        .pipe(finalize(() => { this.loading = false }))
        .subscribe({
          next: (responce: ApiResponse<any>) => {
            console.log(responce)
            if (responce.success) {
              this._toasterService.success(responce.message)
            }
            else {
              this._toasterService.warning(responce.message)
            }
          },
          error: (err) => {
            this._toasterService.warning('failed to add record');
            console.log(err);
          },
        }))
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s) => s.unsubscribe())
  }
}