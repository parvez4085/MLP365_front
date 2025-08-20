import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/shared/auth-service";

@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // already logged in → force to dashboard
      return this.router.parseUrl('/DD/Dashboard');
    }
    return true; // allow login page
  }
}
