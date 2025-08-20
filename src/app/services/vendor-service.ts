import { Injectable } from '@angular/core';
import { DataService } from './shared/data-service';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '../models/shared/ApiResponse.Model';
import { ICommonDropdownList } from '../models/shared/common-modal-module';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  constructor(
    private dataservice: DataService
  ) { }
  GetVendorList(): Observable<ApiResponse<ICommonDropdownList[]>> {
    const route = 'Vendor/GetAll';
    return this.dataservice.get(route, true).pipe(
      map((res: ApiResponse<ICommonDropdownList[]>) => res)
    );
  } 
  AddVendorList(data:any): Observable<ApiResponse<any>> {
    const route = 'Vendor/Create';
    return this.dataservice.post(route, data,true).pipe(
      map((res: ApiResponse<any>) => res)
    );
  }
}
