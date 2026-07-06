import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-orders.component.html',
  styleUrl: './active-orders.component.css',
})
export class ActiveOrdersComponent {
  currentView: 'list' | 'details' = 'list';
  
isSortDropdownOpen = false;
isFilterDropdownOpen = false;

sortOptions = ['Newest', 'Oldest', 'Delivery Date'];
selectedSortOption = 'Newest';

filterOptions = [
  'All',
  'Order Confirmed',
  'Materials Prepared',
  'Pattern Making',
  'Cutting Fabric',
  'Sewing In Progress',
  'Quality Check',
  'Ready For Delivery',
  'Shipped',
  'Delivered'
];
selectedFilterOption = 'All';

openedStatusDropdown: number | null = null;

statusOptions = [
  'Order Confirmed',
  'Materials Prepared',
  'Pattern Making',
  'Cutting Fabric',
  'Sewing In Progress',
  'Quality Check',
  'Ready For Delivery',
  'Shipped',
  'Delivered'
];

toggleStatusDropdown(id: number, event: Event) {
  event.stopPropagation();

  if (this.openedStatusDropdown === id) {
    this.openedStatusDropdown = null;
  } else {
    this.openedStatusDropdown = id;
  }
}

selectedOrder: any = null;
selectedStatus = '';

updateOrderStatus(order: any, status: string) {
  this.selectedOrder = order;
  this.selectedStatus = status;

  this.openedStatusDropdown = null;

  this.isConfirmModalOpen = true;
}


  orders = [
    { id: 1, title: 'Denim Jeans', image: 'shirt.png', customerId: '1024', startDate: 'May 12, 2026', pieces: 170, estimatedDeliveryDate: 'June 8, 2026', status: 'Quality Check', progress: 80, nextStep: 'Ready For Delivery' },
    { id: 2, title: 'Melton Pants', image: 'shirt.png', customerId: '1024', startDate: 'May 12, 2026', pieces: 170, estimatedDeliveryDate: 'June 8, 2026', status: 'Cutting Fabric', progress: 50, nextStep: 'Sewing In Progress' },
    { id: 3, title: 'Oversize Blouse', image: 'shirt.png', customerId: '1024', startDate: 'May 12, 2026', pieces: 170, estimatedDeliveryDate: 'June 8, 2026', status: 'Quality Check', progress: 80, nextStep: 'Ready For Delivery' },
    { id: 4, title: 'Melton Pants', image: 'shirt.png', customerId: '1024', startDate: 'May 12, 2026', pieces: 170, estimatedDeliveryDate: 'June 8, 2026', status: 'Quality Check', progress: 80, nextStep: 'Ready For Delivery' },
    { id: 5, title: 'Oversize Blouse', image: 'shirt.png', customerId: '1024', startDate: 'May 12, 2026', pieces: 170, estimatedDeliveryDate: 'June 8, 2026', status: 'Quality Check', progress: 80, nextStep: 'Ready For Delivery' }
  ];

  constructor(private elementRef: ElementRef) { }

 
toggleSortDropdown(event: Event) {
  event.stopPropagation();

  this.isSortDropdownOpen = !this.isSortDropdownOpen;
  this.isFilterDropdownOpen = false;
}

toggleFilterDropdown(event: Event) {
  event.stopPropagation();

  this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
  this.isSortDropdownOpen = false;
}

selectSortOption(option: string) {
  this.selectedSortOption = option;
  this.isSortDropdownOpen = false;
}

selectFilterOption(option: string) {
  this.selectedFilterOption = option;
  this.isFilterDropdownOpen = false;
}

@HostListener('document:click')
closeDropdowns() {
  this.isSortDropdownOpen = false;
  this.isFilterDropdownOpen = false;
}

//Modals 
  isConfirmModalOpen = false;
  isSuccessModalOpen = false;
  selectedOrderIdForUpdate: number | null = null;

  // 1.Update Status
  openUpdateStatusDropdown(orderId: number) {
    this.selectedOrderIdForUpdate = orderId;
    this.isConfirmModalOpen = true;
  }

  // 2. Cancel
  closeConfirmModal() {
    this.isConfirmModalOpen = false;
    this.selectedOrderIdForUpdate = null;
  }

  // 3. 
 confirmStatusUpdate() {

  if (this.selectedOrder) {
    this.selectedOrder.status = this.selectedStatus;
  }

  this.isConfirmModalOpen = false;
  this.isSuccessModalOpen = true;
}

  // 4. 
  closeSuccessModal() {
    this.isSuccessModalOpen = false;
    this.selectedOrderIdForUpdate = null;
  }
}