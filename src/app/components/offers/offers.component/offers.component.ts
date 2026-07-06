import { Component, HostListener, ElementRef } from '@angular/core';
import { OfferDetails } from "../offer-details/offer-details";
import { AcceptOffer } from '../accept-offer/accept-offer';
@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  imports: [OfferDetails,AcceptOffer]
})
export class OffersComponent {
  isSortDropdownOpen = false;

  activeCardMenuId: number | null = null;
  isDeclineModalOpen = false;
  isSaveModalOpen = false;
  
  selectedOfferId: number | null = null;

  sortOptions: string[] = [
    'All Offers',
    'Newest Offers',
    'Best Match',
    'Lowest Price',
    'Highest Rating',
    'Fastest Delivery',
    'Saved Offers'
  ];

  selectedSortOption: string = 'All Offers';

  offers = [
    {
      id: 1,
      title: 'Denim Jeans',
      image: 'shirt.png',
      producerId: '1024',
      rating: '4.8',
      ordersCount: '28',
      completedOrders: '42',
      proposal: 'We are confident in our ability to bring your design to life with exceptional quality and attention to detail. Our team will ensure that every piece meets your specifications while maintaining high production standards. We offe...',
      price: '320',
      deliveryTime: '26',
      timeAgo: '33 mins ago'
    },
    {
      id: 2,
      title: 'Melton Pants',
      image: 'shirt.png',
      producerId: '1024',
      rating: '4.8',
      ordersCount: '28',
      completedOrders: '42',
      proposal: 'We are confident in our ability to bring your design to life with exceptional quality and attention to detail. Our team will ensure that every piece meets your specifications while maintaining high production standards. We offe...',
      price: '320',
      deliveryTime: '26',
      timeAgo: '11 hours ago'
    },
    {
      id: 3,
      title: 'Oversize Blouse',
      image: 'shirt.png',
      producerId: '1024',
      rating: '4.8',
      ordersCount: '28',
      completedOrders: '42',
      proposal: 'We are confident in our ability to bring your design to life with exceptional quality and attention to detail. Our team will ensure that every piece meets your specifications while maintaining high production standards. We offe...',
      price: '320',
      deliveryTime: '26',
      timeAgo: '2 days ago'
    }
  ];
  constructor(private elementRef: ElementRef) { }

  toggleSortDropdown(event: Event) {
    event.stopPropagation();
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    this.activeCardMenuId = null;
  }

  toggleCardMenu(id: number, event: Event) {
    event.stopPropagation();
    this.activeCardMenuId = this.activeCardMenuId === id ? null : id;
    this.isSortDropdownOpen = false;
  }

  selectSortOption(option: string) {
    this.selectedSortOption = option;
    this.isSortDropdownOpen = false;
  }

  openDeclineModal(offerId: number) {
    this.selectedOfferId = offerId;
    this.isDeclineModalOpen = true;
    this.activeCardMenuId = null; 
  }

  openSaveModal(offerId: number) {
    this.selectedOfferId = offerId;
    this.isSaveModalOpen = true;
    this.activeCardMenuId = null; 
  }

  closeModals() {
    this.isDeclineModalOpen = false;
    this.isSaveModalOpen = false;
    this.selectedOfferId = null;
  }

  confirmDecline() {
    console.log('Declined offer ID:', this.selectedOfferId);
    this.closeModals();
  }

  confirmSave() {
    console.log('Saved as draft offer ID:', this.selectedOfferId);
    this.closeModals();
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(clickedElement)) {
      this.closeAllMenus();
    } else {
      if (!clickedElement.closest('.btn-sort') && !clickedElement.closest('.btn-more')) {
        this.closeAllMenus();
      }
    }
  }

  private closeAllMenus() {
    this.isSortDropdownOpen = false;
    this.activeCardMenuId = null;
  }

  //view details
currentView: 'list' | 'details' = 'list';
  selectedOfferForDetails: any = null;
  viewDetails(offer: any) {
    this.selectedOfferForDetails = offer;
    this.currentView = 'details';
  }

  handleBackToList() {
    this.currentView = 'list';
    this.selectedOfferForDetails = null;
  }

  //accept offers
  isPaymentOpen = false;
  selectedOfferForPayment: any = null;

  handleAcceptOffer(offer: any) {
    this.selectedOfferForPayment = offer;
    this.isPaymentOpen = true;
  }

  handleClosePayment() {
    this.isPaymentOpen = false;
    this.selectedOfferForPayment = null;
  }
}