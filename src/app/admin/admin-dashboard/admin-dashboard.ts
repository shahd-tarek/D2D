import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsDropdownComponent } from "../../components/Notification/notifications-dropdown.component/notifications-dropdown.component"; // 1. قم باستيراد هذا الموديول هنا

@Component({
  selector: 'app-admin-dashboard',
  standalone: true, // تأكد من وجود standalone إذا كنت تستخدم صيغة imports المباشرة
  imports: [CommonModule, NotificationsDropdownComponent], // 2. أضف الموديول داخل مصفوفة الـ imports لكي تعمل التفاعلية
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboardComponent {

//profile

  isProfileOpen = false;
  userName = 'Ahmed';
  profileImage = 'avatar.jpg';

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