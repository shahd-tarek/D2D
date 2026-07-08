import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Ticket, TicketService } from '../../services/ticket.service';
import { DatePipe, NgClass } from '@angular/common';

export type FilterType = 'all' | 'resolved' | 'open' | 'inprogress';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [DatePipe,NgClass], 
  templateUrl: './support-tickets.html',
  styleUrl: './support-tickets.css',
})
export class SupportTickets implements OnInit{

private ticketService = inject(TicketService);
  private cdr = inject(ChangeDetectorRef);

  
  tickets: Ticket[] = [];
  isReplyModalOpen: boolean = false;
  isSuccessModalOpen: boolean = false;
  pageSize = 6;

currentFilter: FilterType = 'all'; 

currentPage: number = 1;
totalPages: number = 3; 
successMessage: string = '';

ngOnInit(): void {
  this.loadTickets(this.currentFilter, this.currentPage);
}
openMenuTicketId: number | null = null;

toggleMenu(ticketId: number) {
  this.openMenuTicketId =
    this.openMenuTicketId === ticketId ? null : ticketId;
}

closeMenu() {
  this.openMenuTicketId = null;
}

loadTickets(filter: FilterType, page: number = 1): void {
  this.currentFilter = filter;
  this.currentPage = page;

  this.ticketService.getAllTickets(filter, page).subscribe({
    next: (data) => {
      this.tickets = data;
      console.log('Filter:', filter);
      console.log('Tickets:', data);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('Error fetching tickets:', err);
    }
  });
}

  openReplyModal(): void {
    this.isReplyModalOpen = true;
  }

  closeReplyModal(): void {
    this.isReplyModalOpen = false;
  }

  submitReply(): void {
    this.isReplyModalOpen = false;   
    this.isSuccessModalOpen = true;  
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen = false;
  }

  goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page; 
    this.loadTickets(this.currentFilter, this.currentPage);
  }
}

  get pagesArray(): number[] {
  return Array.from({ length: this.totalPages }, (_, i) => i + 1);
}
changeStatus(ticketId: number, status: string) {
  let statusNumber = 0;

  switch (status) {
    case 'Open':
      statusNumber = 0;
      break;

    case 'InReview':
      statusNumber = 1;
      break;

    case 'Resolved':
      statusNumber = 2;
      break;
  }

  this.ticketService.changeTicketStatus(ticketId, statusNumber).subscribe({
    next: () => {
      this.closeMenu(); 

      this.loadTickets(this.currentFilter, this.currentPage);
            this.cdr.detectChanges();

    },
    error: (err) => {
      console.error('Error changing status:', err);
    }
  });
}

openDropdownId: number | null = null;

toggleDropdown(ticketId: number) {
  this.openDropdownId =
    this.openDropdownId === ticketId ? null : ticketId;
}

closeDropdown() {
  this.openDropdownId = null;
}

}