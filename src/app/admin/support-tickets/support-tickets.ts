import { Component } from '@angular/core';

@Component({
  selector: 'app-support-tickets',
  standalone: true,
  imports: [], // فارغ لأن @if لا تحتاج لإستيراد أي موديل خارجي
  templateUrl: './support-tickets.html',
  styleUrl: './support-tickets.css',
})
export class SupportTickets {
  // متغيرات التحكم في ظهور النوافذ
  isReplyModalOpen: boolean = false;
  isSuccessModalOpen: boolean = false;

  openReplyModal(): void {
    this.isReplyModalOpen = true;
  }

  closeReplyModal(): void {
    this.isReplyModalOpen = false;
  }

  submitReply(): void {
    this.isReplyModalOpen = false;   // إغلاق نافذة الكتابة
    this.isSuccessModalOpen = true;  // فتح نافذة النجاح
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen = false;
  }
}