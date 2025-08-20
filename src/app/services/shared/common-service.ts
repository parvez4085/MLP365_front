import { Injectable } from '@angular/core';
import { DataService } from './data-service';
import { ApiResponse } from '../../models/shared/ApiResponse.Model';
import { map, Observable } from 'rxjs';
import { ICommonDropdownList } from '../../models/shared/common-modal-module';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private dataservice: DataService
  ) { }
  GetCountriesList(): Observable<ApiResponse<ICommonDropdownList[]>> {
    const route = 'Master/GetCountries';
    return this.dataservice.get(route, true).pipe(
      map((res: ApiResponse<ICommonDropdownList[]>) => res) 
    );
  }
  getStateByCountryId(data:any): Observable<ApiResponse<ICommonDropdownList[]>> {
    const route = `Master/GetStates?countryId=${data}`;
    return this.dataservice.get(route, true).pipe(
      map((res: ApiResponse<ICommonDropdownList[]>) => res) 
    );
  }
  getCityByStateId(data:any): Observable<ApiResponse<ICommonDropdownList[]>> {
    const route = `Master/GetCities?stateId=${data}`;
    return this.dataservice.get(route, true).pipe(
      map((res: ApiResponse<ICommonDropdownList[]>) => res) 
    );
  }
  GovtGovtDocumentType(): Observable<ApiResponse<ICommonDropdownList[]>> {
    const route = `GovtDocument/GetAll`;
    return this.dataservice.get(route, true).pipe(
      map((res: ApiResponse<ICommonDropdownList[]>) => res) 
    );
  }
}
