import { Component, Input, OnInit, inject, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminCollaborationsService, ReadOnlyChatResponse } from '../../../services/admin-collaborations.service';

@Component({
  selector: 'app-chat-details',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './chat-details.html',
  styleUrl: './chat-details.css'
})
export class ChatDetails implements OnInit {
  private collaborationsService = inject(AdminCollaborationsService);
  private cdr = inject(ChangeDetectorRef);


  @Input() chatId!: number;
  @Output() backPressed = new EventEmitter<void>();

  chatData: ReadOnlyChatResponse | null = null;
  isLoading: boolean = true;


  messageToUsers: string = '';
  isEndConfirmationModalVisible: boolean = false;
  isSuccessModalVisible: boolean = false;

  ngOnInit(): void {
    if (this.chatId) {
      this.loadChatDetails(this.chatId);
    }
  }

  loadChatDetails(id: number): void {
    this.isLoading = true;
    this.collaborationsService.getReadOnlyChat(id).subscribe({
      next: (res) => {
        console.log("Chat Details Response:", res);
        this.chatData = res;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error loading chat details:", err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }


  isImageUrl(text: string): boolean {
    if (!text) return false;
    return text.startsWith('http://') || text.startsWith('https://') || text.includes('cloudinary.com');
  }

  openEndConfirmation(): void {
    this.isEndConfirmationModalVisible = true;
  }

  closeEndConfirmation(): void {
    this.isEndConfirmationModalVisible = false;
  }

  confirmEndCollaboration(): void {

    this.isEndConfirmationModalVisible = false;
    this.isSuccessModalVisible = true;
  }

  closeSuccessModal(): void {
    this.isSuccessModalVisible = false;

  }

  onBackClick(): void {
    this.backPressed.emit(); 
  }
}