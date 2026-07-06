import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Footer } from "../../../components/footer/footer";

@Component({
  selector: 'app-producer-requests',
  imports: [CommonModule, Footer],
  templateUrl: './producer-requests.component.html',
  styleUrl: './producer-requests.component.css',
})
export class ProducerRequestsComponent {
  isSortDropdownOpen = false;
  sortOptions = ['Newest', 'Oldest'];
  selectedSortOption = 'Newest';
  
  isSuccessModalOpen = false;

  requests = [
    { 
      id: 1, 
      title: 'Denim Jeans', 
      image: 'shirt.png', 
      customerId: '1024', 
      date: 'May 12, 2026', 
      proposalText: 'We are confident in our ability to bring your design to life with excep...', 
      price: 'EGP 320 / PC', 
      deliveryTime: '26 Days' 
    },
    { 
      id: 2, 
      title: 'Melton Pants', 
      image: 'shirt.png', 
      customerId: '1024', 
      date: 'May 12, 2026', 
      proposalText: 'We are confident in our ability to bring your design to life with excep...', 
      price: 'EGP 320 / PC', 
      deliveryTime: '26 Days' 
    },
    { 
      id: 3, 
      title: 'Oversize Blouse', 
      image: 'shirt.png', 
      customerId: '1024', 
      date: 'May 12, 2026', 
      proposalText: 'We are confident in our ability to bring your design to life with excep...', 
      price: 'EGP 320 / PC', 
      deliveryTime: '26 Days' 
    },
    { 
      id: 4, 
      title: 'Denim Jeans', 
      image: 'shirt.png', 
      customerId: '1024', 
      date: 'May 12, 2026', 
      proposalText: 'We are confident in our ability to bring your design to life with excep...', 
      price: 'EGP 320 / PC', 
      deliveryTime: '26 Days' 
    }
  ];

  toggleSortDropdown(event: Event) {
    event.stopPropagation();
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
  }

  selectSortOption(option: string) {
    this.selectedSortOption = option;
    this.isSortDropdownOpen = false;
  }

  openSuccessModal() {
    this.isSuccessModalOpen = true;
  }

  closeSuccessModal() {
    this.isSuccessModalOpen = false;
  }

}
