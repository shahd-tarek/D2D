import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardService, RecentTicket, RecentUser, UsersCountResponse } from '../../services/admin-dashboard.service';
import { forkJoin } from 'rxjs';
import { AdminCollaborationsService, CollaborationResponse, GetAllProducersOffersResponse } from '../../services/admin-collaborations.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent implements OnInit {


  private dashboardService = inject(AdminDashboardService);
  private cdr = inject(ChangeDetectorRef);
  private collaborationsService = inject(AdminCollaborationsService);

  dashboardCollaborations: CollaborationResponse[] = [];

  usersCount!: UsersCountResponse;
  recentUsers: RecentUser[] = [];
  recentTickets: RecentTicket[] = [];
  collaborationsStats!: GetAllProducersOffersResponse;
  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    forkJoin({
      usersCount: this.dashboardService.getUsersCount(),
      recentUsers: this.dashboardService.getRecentUsers(),
      recentTickets: this.dashboardService.getRecentTickets(),
      collaborations: this.collaborationsService.getAllProducersOffers(
        1,
        5,
        '',
        'all',
        true
      )
    }).subscribe({
      next: (res) => {
        this.usersCount = res.usersCount;
        this.recentUsers = res.recentUsers;
        this.recentTickets = res.recentTickets;
        this.dashboardCollaborations = res.collaborations.collaborationResponses;

        this.collaborationsStats = res.collaborations;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  isSidebarOpen: boolean = false;

  isOffersOpen = false;
  isRevenueOpen = false;

  offersFilter = 'This Month';
  revenueFilter = 'This Week';

  filterOptions = [
    'This Week',
    'Last Month',
    'Last 3 Months',
    'Last 6 Months',
    'This Year',
    'Last Year',
    'All Time'
  ];

  toggleOffersDropdown() {
    this.isOffersOpen = !this.isOffersOpen;
    this.isRevenueOpen = false;
  }

  toggleRevenueDropdown() {
    this.isRevenueOpen = !this.isRevenueOpen;
    this.isOffersOpen = false;
  }

  selectOffersFilter(value: string) {
    this.offersFilter = value;
    this.isOffersOpen = false;
  }

  selectRevenueFilter(value: string) {
    this.revenueFilter = value;
    this.isRevenueOpen = false;
  }
}