import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from '../../../components/footer/footer';
import { Header } from '../../../components/header/header';
import { ProposalDetails } from "../proposal-details/proposal-details";

@Component({
  selector: 'app-proposal',
  imports: [Header, Footer, CommonModule, ProposalDetails],
  templateUrl: './proposal.component.html',
  styleUrl: './proposal.component.css',
})
export class ProposalComponent {
  currentView: 'list' | 'details' = 'list';
  isSortDropdownOpen = false;
  activeCardMenuId: number | null = null;
  isDeclineModalOpen = false;

  selectedOfferId: number | null = null;
  selectedOfferForDetails: any = null;

  sortOptions: string[] = ['Newest', 'Oldest'];
  selectedSortOption: string = 'Newest';

  offers = [
    {
      id: 1,
      title: 'Denim Jeans',
      image: 'shirt.png',
      producerId: '1024',
      date: 'May 12, 2026',
      proposal: 'We are confident in our ability to bring your design to life with exceptional quality and attention to detail. Our team will ensure that every piece meets your specifications while maintaining high production standards. We offe...',
      price: '320',
      deliveryTime: '26',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Melton Pants',
      image: 'shirt.png',
      producerId: '1024',
      date: 'May 12, 2026',
      proposal: 'We are confident in our ability to bring your design to life with exceptional quality and attention to detail. Our team will ensure that every piece meets your specifications while maintaining high production standards. We offe...',
      price: '320',
      deliveryTime: '26',
      status: 'Accepted'
    },
    {
      id: 3,
      title: 'Oversize Blouse',
      image: 'shirt.png',
      producerId: '1024',
      date: 'May 12, 2026',
      proposal: 'We are confident in our ability to bring your design to life with exceptional quality and attention to detail. Our team will ensure that every piece meets your specifications while maintaining high production standards. We offe...',
      price: '320',
      deliveryTime: '26',
      status: 'Declined'
    },
    {
      id: 4,
      title: 'Denim Jeans',
      image: 'shirt.png',
      producerId: '1024',
      date: 'May 12, 2026',
      proposal: 'We are confident in our ability to bring your design to life with exceptional quality and attention to detail. Our team will ensure that every piece meets your specifications while maintaining high production standards. We offe...',
      price: '320',
      deliveryTime: '26',
      status: 'Pending'
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

  closeModals() {
    this.isDeclineModalOpen = false;
    this.selectedOfferId = null;
  }

  confirmDecline() {
    console.log('Declined offer ID:', this.selectedOfferId);
    this.closeModals();
  }

  viewDetails(offer: any) {
    this.selectedOfferForDetails = offer;
    this.currentView = 'details';
  }

  handleBackToList() {
    this.currentView = 'list';
    this.selectedOfferForDetails = null;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(clickedElement)) {
      this.closeAllMenus();
    } else if (!clickedElement.closest('.btn-sort') && !clickedElement.closest('.btn-more')) {
      this.closeAllMenus();
    }
  }

  private closeAllMenus() {
    this.isSortDropdownOpen = false;
    this.activeCardMenuId = null;
  }
}