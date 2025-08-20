import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../../../services/shared/login-service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Output() loginClick = new EventEmitter<void>();

  constructor(private loginService: LoginService) {}

  onLoginClick() {
    this.loginService.showLogin();
    this.loginClick.emit();
  }
}

