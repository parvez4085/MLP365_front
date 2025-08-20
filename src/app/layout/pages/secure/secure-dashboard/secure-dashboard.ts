import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Widget {
  iconClass: string;
  bgClass: string;
  count: number | string;
  desc: string;
  link?: string;
  prefix?: string;
}

interface Customer {
  id: number;
  name: string;
  mobile: string;
  regDate: string;
}

interface Renewal {
  name: string;
  addedDate: string;
  renewalDate: string;
}

interface AccountBalance {
  name: string;
  balance: number;
}

@Component({
  selector: 'app-secure-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './secure-dashboard.html',
  styleUrls: ['./secure-dashboard.css']
})
export class SecureDashboard {
  widgets: Widget[] = [];
  companyName: string = 'Your Company Name';
  todaysPurchaseAmount = 2000;

  pendingCustomers: Customer[] = [];
  renewals: Renewal[] = [];
  accountBalances: AccountBalance[] = [];
  totalBalance: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.widgets = [
      {
        iconClass: 'fa fa-warehouse',
        bgClass: 'bg-soft-primary border-primary',
        count: 42,
        desc: 'Total Companies',
        link: '/super-stockiest-list'
      },
      {
        iconClass: 'fa fa-store',
        bgClass: 'bg-soft-success border-success',
        count: 113,
        desc: 'Total Branches',
        link: '/outlet-list'
      },
      {
        iconClass: 'fa fa-chart-line',
        bgClass: 'bg-soft-info border-info',
        count: '1,25,000',
        desc: 'Total Purchase',
        link: '/purchase-bill-details',
        prefix: '₹'
      }
    ];

    this.pendingCustomers = [
      { id: 1, name: 'John Doe', mobile: '9876543210', regDate: '2025-07-30' },
      { id: 2, name: 'Jane Smith', mobile: '9123456789', regDate: '2025-07-28' }
    ];

    this.renewals = [
      { name: 'Customer A', addedDate: '2025-05-15', renewalDate: '2025-08-10' },
      { name: 'Customer B', addedDate: '2025-06-01', renewalDate: '2025-08-15' }
    ];

    this.accountBalances = [
      { name: 'Main Bank', balance: 60000 },
      { name: 'Reserve Bank', balance: 90000 }
    ];

    this.totalBalance = this.accountBalances.reduce((sum, acc) => sum + acc.balance, 0);
  }
}
