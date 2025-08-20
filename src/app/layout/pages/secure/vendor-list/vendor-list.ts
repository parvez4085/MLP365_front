import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ToasterService } from '../../../../services/shared/toaster-service';
import { isPlatformBrowser } from '@angular/common';
import { VendorService } from '../../../../services/vendor-service';
import { finalize, Subscription } from 'rxjs';
import { ApiResponse } from '../../../../models/shared/ApiResponse.Model';

@Component({
  selector: 'app-vendor-list',
  imports: [],
  templateUrl: './vendor-list.html',
  styleUrl: './vendor-list.css'
})
export class VendorList {
  _subscription:Subscription[]=[];
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private _toasterService: ToasterService,
    private VendorService:VendorService,
  ) { }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.GeAllVender();
    }
  }
  GeAllVender(){
    this._subscription.push(
      this.VendorService.GetVendorList()
      .pipe(finalize(()=>{}))
      .subscribe({
        next:(data:ApiResponse<any>) =>{
          if(data.success){
            this._toasterService.success('data fached sucessfuly');
            console.log(data);
          }
        },error:(err)=> {
          console.log(err)
        },
      })
    )
  }
}