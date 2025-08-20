import { Component } from '@angular/core';
import { AuthService } from '../../../services/shared/auth-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(
    private authService:AuthService,
    private _router:Router
  ){}
//logout here 
  logoutUser() {
    this.authService.clearToken();
    this._router.navigate(['']);
  }
}
