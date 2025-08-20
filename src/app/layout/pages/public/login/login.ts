import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, Subscription } from 'rxjs';
import { ApiResponse } from '../../../../models/shared/ApiResponse.Model';
import { LoginService } from '../../../../services/shared/login-service';
import { ToasterService } from '../../../../services/shared/toaster-service';
import { AuthService } from '../../../../services/shared/auth-service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  _subscription: Subscription[] = []
  loading: boolean = false;
  username = 'superadmin';
  password = 'Password@123';
  showPassword = false;
  constructor(
    private loginService: LoginService,
    private router: Router,
    private _tost: ToasterService,
    private authService: AuthService
  ) { }

  // In your component
  //   onLogin() {
  //   const body = {
  //   "ipAddress": "string",
  //   "sessionId": "string",
  //   "accessPlatform": "WEB",
  //   "accessChannel": "WEB",
  //   "userName": "superadmin",
  //   "password": "Password@123",
  //   "address": "string",
  //   "macAddress": "string"
  // };

  //   this.loading = true;
  //   this.temp.userLogin(body).pipe(
  //     finalize(() => this.loading = false)
  //   )
  //   .subscribe({
  //     next: (response) => {
  //       console.log('Login success:', response);
  //       if (response.statusCode === 200 && response.success) {
  //         this._tost.success(response.message);
  //         this.router.navigate(['/DD/Dashboard']);
  //       }
  //     },
  //     error: (err) => {
  //       console.error('Login error:', err);
  //     }
  //   });
  // }
  onLogin() {
    const body = {
      "ipAddress": "string",
      "sessionId": "string",
      "accessPlatform": "WEB",
      "accessChannel": "WEB",
      userName: this.username,
      password: this.password,
      "address": "string",
      "macAddress": "string"
    };
    this.loading = true;
    this._subscription.push(
      this.loginService.userLogin(body)
        .pipe(
          finalize(() => { this.loading = false; })
        )
        .subscribe({
          next: (response: ApiResponse<any>) => {
            console.log('Login Response:', response);

            // 1️⃣ Basic API success check
            if (response.statusCode === 200) {
              if (response.success) {
                // 2️⃣ Token existence check
                const token = response.data?.accessToken;
                if (token) {
                  this.authService.setToken(token);
                  this._tost.success(response.message || 'Login successful!');
                  this.router.navigate(['/DD/Dashboard']);
                } else {
                  this._tost.error('Login successful but no token received.');
                  console.warn('No token found in response:', response);
                }
              } else {
                // 3️⃣ API returned success=false
                this._tost.warning(response.message || 'Invalid username or password.');
              }
            } else {
              // 4️⃣ API returned unexpected status code
              this._tost.error(`Unexpected status code: ${response.statusCode}`);
            }
          },
          error: (err) => {
            // 5️⃣ Handle HTTP/network errors
            console.error('Login error:', err);
            if (err.status === 0) {
              this._tost.error('Unable to connect to the server. Please check your internet.');
            } else if (err.status === 401) {
              this._tost.warning('Invalid credentials. Please try again.');
            } else if (err.status === 403) {
              this._tost.warning('Access denied. Contact administrator.');
            } else if (err.status === 500) {
              this._tost.error('Server error. Please try again later.');
            } else {
              this._tost.error(err.message || 'An unknown error occurred.');
            }
          }
        })
    );
  }
  onCancel() {
    this.loginService.hideLogin();
  }
  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe)
  }
}
