import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { ChatDetails } from "./chat-details/chat-details";
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminCollaborationsService, CollaborationResponse } from '../../services/admin-collaborations.service';

@Component({
  selector: 'app-collaborations',
  standalone: true,
  imports: [ChatDetails, FormsModule, CommonModule, DatePipe],
  templateUrl: './collaborations.html',
  styleUrl: './collaborations.css',
})
export class Collaborations implements OnInit {
  private collaborationsService = inject(AdminCollaborationsService);
  private cdr = inject(ChangeDetectorRef);

  collaborations: CollaborationResponse[] = [];

  allCount = 0;
  completedCount = 0;
  closedCount = 0;
  pendingCount = 0;

  offerName: string = '';
  selectedStatus: 'all' | 'completed' | 'closed' | 'pending' = 'all';


  isNewest: boolean = true;

  currentPage = 1;
  pageSize = 6;
  totalPages = 1;

  isChatDetailsVisible: boolean = false;
  selectedChatId!: number;

  ngOnInit(): void {
    this.loadOffers(this.currentPage);
  }


  loadOffers(page: number): void {
    this.currentPage = page;


    this.collaborationsService.getAllProducersOffers(
      this.currentPage,
      this.pageSize,
      this.offerName,
      this.selectedStatus,
      this.isNewest
    ).subscribe({
      next: (res) => {
        console.log("API Response Page " + page + ":", res);

        if (res && res.collaborationResponses) {
          this.collaborations = res.collaborationResponses;
          this.allCount = res.allCount;
          this.completedCount = res.completedCount;
          this.closedCount = res.closedCount;
          this.pendingCount = res.pendingCount;

          let currentCount = this.allCount;
          if (this.selectedStatus === 'completed') currentCount = this.completedCount;
          if (this.selectedStatus === 'closed') currentCount = this.closedCount;
          if (this.selectedStatus === 'pending') currentCount = this.pendingCount;

          this.totalPages = Math.ceil(currentCount / this.pageSize) || 1;
        } else {
          this.collaborations = [];
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.collaborations = [];
        this.cdr.detectChanges();
      }
    });
  }


  toggleSortOrder(): void {
    this.isNewest = !this.isNewest;
    this.loadOffers(1);
  }

  filterByStatus(statusName: 'all' | 'completed' | 'closed' | 'pending'): void {
    this.selectedStatus = statusName;
    this.loadOffers(1);
  }

  onSearchChange(): void {
    this.loadOffers(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadOffers(page);
    }
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  showChatDetails(chatId: number): void {
    this.selectedChatId = chatId;
    console.log("Selected Chat ID:", chatId);
    this.isChatDetailsVisible = true;
    this.cdr.detectChanges();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  backToCollaborationsList(): void {
    this.isChatDetailsVisible = false;
    this.loadOffers(this.currentPage);
    this.cdr.detectChanges();
  }
}