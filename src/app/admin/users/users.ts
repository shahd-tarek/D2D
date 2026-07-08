import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminUsersService, UserResponse } from '../../services/admin-users.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, DatePipe, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  users: UserResponse[] = [];         

  allUsersCount = 0;
  customersCount = 0;
  producersCount = 0;
  activeCount = 0;
  pendingCount = 0;
  suspendedCount = 0;

  selectedTab: 'All' | 'Customer' | 'Producer' = 'All';
  selectedStatus: 'All' | 'Active' | 'Pending' | 'Suspended' = 'All';
  isNewest: boolean = true; 
  searchTerm: string = '';

  currentPage = 1;
  pageSize = 6; 
  totalPages = 1;

  constructor(
    private adminService: AdminUsersService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadUsers(this.currentPage);
  }

  loadUsers(page: number): void {
    this.currentPage = page;
    this.adminService.getAllUsers(this.currentPage, this.pageSize, this.selectedTab, this.selectedStatus, this.searchTerm).subscribe({
      next: (res) => {
        if (res && res.usersResponse) {
          let fetchedUsers = res.usersResponse;

          this.users = fetchedUsers.sort((a, b) => {
            const dateA = new Date(a.joinDate).getTime() || 0;
            const dateB = new Date(b.joinDate).getTime() || 0;
            

            return this.isNewest ? (dateB - dateA) : (dateA - dateB);
          });
          

          this.allUsersCount = res.allUsersCount;
          this.customersCount = res.allCustomersCount;
          this.producersCount = res.allProducersCount;
          this.activeCount = res.activeStatusCount;
          this.pendingCount = res.pendingStatusCount;
          this.suspendedCount = res.susbendStatusCount;


          let currentCount = this.allUsersCount;
          if (this.selectedTab === 'Customer') currentCount = this.customersCount;
          if (this.selectedTab === 'Producer') currentCount = this.producersCount;
          
          if (this.selectedStatus === 'Active') currentCount = this.activeCount;
          if (this.selectedStatus === 'Pending') currentCount = this.pendingCount;
          if (this.selectedStatus === 'Suspended') currentCount = this.suspendedCount;

          this.totalPages = Math.ceil(currentCount / this.pageSize) || 1;
        } else {
          this.users = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.users = [];
        this.cdr.detectChanges();
      }
    });
  }

  onSearchChange(): void {
  this.loadUsers(1); 
}

  applyFilter(tabName: 'All' | 'Customer' | 'Producer'): void {
    this.selectedTab = tabName;
    this.loadUsers(1); 
  }

  applyStatusFilter(statusName: 'All' | 'Active' | 'Pending' | 'Suspended'): void {
    this.selectedStatus = statusName;
    this.loadUsers(1); 
  }


  toggleSort(): void {
    this.isNewest = !this.isNewest;
    this.loadUsers(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadUsers(page);
    }
  }

  updateUserStatus(userId: string, statusNumber: number): void {
    this.adminService.changeUserStatus(userId, statusNumber).subscribe({
      next: (res) => {
        this.loadUsers(this.currentPage);
        alert('User status updated successfully');
      },
      error: (err) => console.error(err)
    });
  }
}