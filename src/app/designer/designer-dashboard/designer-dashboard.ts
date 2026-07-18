import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from "../../components/footer/footer";
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-designer-dashboard',
  imports: [Header, CommonModule, Footer],
  templateUrl: './designer-dashboard.html',
  styleUrl: './designer-dashboard.css',
})
export class DesignerDashboard {
// private authService = inject(AuthService);
  // private profileService = inject(ProfileService);
  // private router = inject(Router);

  // token = '';
  // payloadJson = '';
  // userName = 'Customer';

  // ngOnInit(): void {
  //   this.token = this.authService.getAccessToken() || '';
  //   const userId = this.authService.getUserId();
  //   if (userId) {
  //     this.profileService.getProfile(userId).subscribe({
  //       next: (profile) => {
  //         if (profile && profile.firstName) {
  //           this.userName = profile.firstName;
  //         }
  //       },
  //       error: (err) => {
  //         console.error('Error fetching profile for dashboard:', err);
  //       }
  //     });
  //   }
  //   if (this.token) {
  //     try {
  //       const parts = this.token.split('.');
  //       const decoded = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
  //       const payload = JSON.parse(decoded);
  //       this.payloadJson = JSON.stringify(payload, null, 2);
  //     } catch (e) {
  //       this.payloadJson = 'Failed to decode payload.';
  //     }
  //   }
  // }

  // logout(): void {
  //   const refreshToken = this.authService.getRefreshToken();
  //   if (refreshToken) {
  //     this.authService.signout(refreshToken).subscribe();
  //   }
  //   this.authService.clearTokens();
  //   this.router.navigate(['/login']);
  // }

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

  toggleDropdown(type: 'overview' | 'offers' | 'collaborations'): void {
    this.activeDropdown = this.activeDropdown === type ? null : type;
  }

  selectFilter(type: 'overview' | 'offers' | 'collaborations', filter: string): void {
    if (type === 'overview') {
      this.selectedOverviewFilter = filter;
    } else if (type === 'offers') {
      this.selectedOffersFilter = filter;
    } else if (type === 'collaborations') {
      this.selectedCollaborationsFilter = filter;
    }
    this.activeDropdown = null; 
  }
 
  activeTab: 'ai' | 'producers' = 'ai';

  changeTab(tab: 'ai' | 'producers') {
    this.activeTab = tab;
  }
}


