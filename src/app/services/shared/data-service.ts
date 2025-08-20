import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { ApiResponse } from '../../models/shared/ApiResponse.Model';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  // ----------------------
  // Build Headers
  // ----------------------
  private buildHeaders(authRequired: boolean = false): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (authRequired) {
      const token =  this.authService.getToken();;
      if (token) {
        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'accept': '*/*',
          'Authorization': `Bearer ${token}`
        });
      } else {
        console.warn('No token found in sessionStorage.');
      }
    }
    return headers;
  }

  // private buildHeaders(authRequired: boolean = false): HttpHeaders {
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   if (authRequired) {
  //     const username = 'Md
  //     const password = 'M!&lp@2025';
  //     const basicAuth = btoa(`${username}:${password}`); // base64 encode
  //     headers = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //       'Authorization': `Basic ${basicAuth}`
  //     });
  //   }
  //   return headers;
  // }

  // ----------------------
  // GET Method
  // ----------------------
  get<T>(route: string, authRequired: boolean = false): Observable<any> {
    const url = `${this.baseUrl}${route}`;
    const headers = this.buildHeaders(authRequired);
    return this.http.get<any>(url, { headers });
  }

  // ----------------------
  // POST Method
  // ----------------------
  post<T>(route: string, data: any, authRequired: boolean = false): Observable<any> {
    const url = `${this.baseUrl}${route}`;
    const headers = this.buildHeaders(authRequired);
    return this.http.post<any>(url, data, { headers });
  }
}
