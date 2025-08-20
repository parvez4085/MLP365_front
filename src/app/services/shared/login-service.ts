import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from './data-service';
import { ApiResponse } from '../../models/shared/ApiResponse.Model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loading: boolean = false;
  private loginVisibleSubject = new BehaviorSubject<boolean>(false);
  public loginVisible$ = this.loginVisibleSubject.asObservable();

  // Store dataService in a class property using `private`
  constructor(private dataService: DataService) { }

  showLogin() {
    this.loginVisibleSubject.next(true);
  }

  hideLogin() {
    this.loginVisibleSubject.next(false);
  }

  toggleLogin() {
    this.loginVisibleSubject.next(!this.loginVisibleSubject.value);
  }

  userLogin(data: any): Observable<ApiResponse<any>> {
    const route = 'Account/Login';
    return this.dataService.post(route, data, true)
  }
}
