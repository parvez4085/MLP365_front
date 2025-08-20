import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { ApiResponse } from '../models/shared/ApiResponse.Model';


@Injectable({
  providedIn: 'root'
})
export class TempService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // ----------------------
  // Build Headers
  // ----------------------
  private buildHeaders(authRequired: boolean = false): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': '*/*',
      'Authorization': 'Bearer cdfgsd' // Replace with actual token when available
    });

    console.log('%c[LoginService] Headers built:', 'color: blue', 
      headers.keys().map(k => ({ [k]: headers.get(k) }))
    );

    return headers;
  }

  // ----------------------
  // POST Login
  // ----------------------
  userLogin(data: any): Observable<ApiResponse<any>> {
    const url = `${this.baseUrl}Account/Login`;
    const headers = this.buildHeaders(false);

    console.log('%c[LoginService] POST Request:', 'color: orange', {
      url,
      headers: headers.keys().map(k => ({ [k]: headers.get(k) })),
      body: data
    });

    return this.http.post<ApiResponse<any>>(url, data, { headers }).pipe(
      tap(response => console.log('%c[LoginService] POST Response:', 'color: green', response)),
      catchError(error => {
        console.error('%c[LoginService] POST Error:', 'color: red', error);
        throw error;
      })
    );
  }
}
