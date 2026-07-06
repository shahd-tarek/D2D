import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

@Component({
  selector: 'app-dashboard-component',
  standalone: true,
  imports: [CommonModule, Footer, Header],
  templateUrl: './dashboard-component.html',
  styleUrls: ['./dashboard-component.css']
})
export class DashboardComponent {
  
  isModalOpen: boolean = false;

  activeDropdown: 'overview' | 'offers' | null = null;

 
  selectedOverviewFilter: string = 'This Month';
  selectedOffersFilter: string = 'This Month';


  filterOptions: string[] = [
    'This Month', 
    'Last Month', 
    'Last 3 Months', 
    'Last 6 Months', 
    'This Year', 
    'Last Year', 
    'All Time'
  ];

 
  allTransactions = [
    { name: 'Design Purchase', date: 'May 25, 2025', amount: '3,550.00', type: 'purchase' },
    { name: 'Payment Received', date: 'May 23, 2025', amount: '780.00', type: 'received' },
    { name: 'Design Purchase', date: 'May 20, 2025', amount: '2,550.00', type: 'purchase' },
    { name: 'Design Purchase', date: 'May 18, 2025', amount: '3,550.00', type: 'purchase' },
    { name: 'Payment Received', date: 'May 14, 2025', amount: '780.00', type: 'received' },
    { name: 'Design Purchase', date: 'May 11, 2025', amount: '3,550.00', type: 'purchase' },
    { name: 'Payment Received', date: 'May 08, 2025', amount: '780.00', type: 'received' },
    { name: 'Design Purchase', date: 'May 02, 2025', amount: '780.00', type: 'purchase' }
  ];


  toggleModal(isOpen: boolean): void {
    this.isModalOpen = isOpen;
  }

 
  toggleDropdown(type: 'overview' | 'offers'): void {
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }

 
  selectFilter(type: 'overview' | 'offers', filter: string): void {
    if (type === 'overview') {
      this.selectedOverviewFilter = filter;
    } else if (type === 'offers') {
      this.selectedOffersFilter = filter;
    }
    this.activeDropdown = null;
  }
 
  
activeTab: 'ai' | 'producers' = 'ai';

changeTab(tab: 'ai' | 'producers') {
  this.activeTab = tab;
}

}