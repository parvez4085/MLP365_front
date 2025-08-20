import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from '../../../models/shared/menuSideBar.model';
import { AuthService } from '../../../services/shared/auth-service';
import { ToasterService } from '../../../services/shared/toaster-service';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-menu-side-bar',
  templateUrl: './menu-side-bar.html',
  styleUrls: ['./menu-side-bar.css'] // corrected from 'styleUrl' to 'styleUrls'
})
export class MenuSideBar {
  constructor(private authService: AuthService,
    private _toaster:ToasterService,
    private _router:Router
  ) { }
  menuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'bi bi-speedometer2', route: '/dashboard' },
    {
      label: 'Vendor',
      icon: 'fas fa-user',
      isExpanded: false,
      children: [
        { label: 'Get Vendor', route: '/DD/VendorList' },
        { label: 'Create Vendor', route: '/DD/VendorCreate' }
      ]
    }
  ];

  isCollapsed = false;

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;

    // Close all submenus when collapsing
    if (this.isCollapsed) {
      this.menuItems.forEach(item => {
        if (item.children) {
          item.isExpanded = false;
        }
      });
    }
  }
  toggleSubmenu(item: MenuItem): void {
    if (item.children && !this.isCollapsed) {
      item.isExpanded = !item.isExpanded;

      // Optional: Close other expanded menus (accordion behavior)
      // this.menuItems.forEach(menuItem => {
      //   if (menuItem !== item && menuItem.children) {
      //     menuItem.isExpanded = false;
      //   }
      // });
    }
  }
}
