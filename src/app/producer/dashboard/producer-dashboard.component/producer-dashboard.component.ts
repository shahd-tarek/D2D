import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from '../../../components/header/header';
import { CommonModule } from '@angular/common';
import { Footer } from '../../../components/footer/footer';

@Component({
  selector: 'app-producer-dashboard',
  imports: [CommonModule, Header, Footer],
  templateUrl: './producer-dashboard.component.html',
  styleUrl: './producer-dashboard.component.css',
})
export class ProducerDashboardComponent {


isModalOpen: boolean = false;
  
 activeDropdown: 'overview' | 'offers' | 'collaborations' | null = null;
  
  selectedOverviewFilter: string = 'This Month';
  selectedOffersFilter: string = 'This Month';
  selectedCollaborationsFilter: string = 'This Week';

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

  // تحديث الدالة لتقبل الـ 3 خيارات
  toggleDropdown(type: 'overview' | 'offers' | 'collaborations'): void {
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }

  // تحديث الدالة لتحديث الفلتر للثلاثة بالكامل
  selectFilter(type: 'overview' | 'offers' | 'collaborations', filter: string): void {
    if (type === 'overview') {
      this.selectedOverviewFilter = filter;
    } else if (type === 'offers') {
      this.selectedOffersFilter = filter;
    } else if (type === 'collaborations') {
      this.selectedCollaborationsFilter = filter;
    }
    this.activeDropdown = null; // إغلاق القائمة بعد الاختيار
  }
 
  activeTab: 'ai' | 'producers' = 'ai';

  changeTab(tab: 'ai' | 'producers') {
    this.activeTab = tab;
  }
}