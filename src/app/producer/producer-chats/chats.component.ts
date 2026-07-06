import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer } from "../../components/footer/footer";
import { Header } from '../../components/header/header';

interface MessageItem {
  sender: 'user' | 'producer';
  text: string;
  time: string;
}

interface ChatItem {
  id: string;
  title: string;
  customer: string;
  timestamp: string;
  lastMessage: string;
  avatar: string;
  unread: boolean;
  status: string;
  messages: MessageItem[];
}

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [CommonModule, FormsModule, Header, Footer],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent {
  searchQuery = '';
  activeFilter: 'all' | 'unread' | 'completed' = 'all';
  activeChatId: string | null = null;

  showPopover = false;
  activeModal: 'collab' | 'close' | 'confirmStatus' | 'statusSuccess' | null = null; ratingValue = 0;
  newMessageText = '';
  currentStatus: string = 'Update Status';
  pendingStatus: string = '';

  chats: ChatItem[] = [
    {
      id: 'chat-1',
      title: 'Denim Jeans',
      customer: 'Customer #1024',
      timestamp: '33 mins ago',
      lastMessage: 'We are confident in our ability to bring your design to life with product that ref...',
      avatar: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=120&q=80',
      unread: true,
      status: '',
      messages: [
        { sender: 'user', text: 'Hello, is my denim design feasible?', time: '12:10 AM' },
        { sender: 'producer', text: 'Yes, absolutely! We are confident in our ability to bring your design to life with product that refines the stitch patterns.', time: '33 mins ago' }
      ]
    },
    {
      id: 'chat-2',
      title: 'Denim Jeans',
      customer: 'Customer #1024',
      timestamp: 'yesterday',
      lastMessage: 'We are confident in our ability to bring your design to life with product...',
      avatar: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=120&q=80',
      unread: false,
      status: '',
      messages: [
        { sender: 'producer', text: 'Here is a quick question about fabric density.', time: 'Yesterday 3:00 PM' },
        { sender: 'user', text: 'We are confident in our ability to bring your design to life with product...', time: 'Yesterday 3:15 PM' }
      ]
    },
    {
      id: 'chat-3',
      title: 'Denim Jeans',
      customer: 'Customer #1024',
      timestamp: '1 day ago',
      lastMessage: 'We are confident in our ability to bring your design to life with product that ref...',
      avatar: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=120&q=80',
      unread: false,
      status: 'Materials Prepared',
      messages: [
        { sender: 'producer', text: 'Materials are all prepared and layout is set!', time: '1 day ago' }
      ]
    },
    {
      id: 'chat-4',
      title: 'Denim Jeans',
      customer: 'Customer #1024',
      timestamp: '1 day ago',
      lastMessage: 'We are confident in our ability to bring your design to life with product that ref...',
      avatar: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=120&q=80',
      unread: false,
      status: 'Materials Prepared',
      messages: [
        { sender: 'producer', text: 'Looking forward to starting.', time: '1 day ago' }
      ]
    },
    {
      id: 'chat-5',
      title: 'Denim Jeans',
      customer: 'Customer #1024',
      timestamp: '1 day ago',
      lastMessage: 'We are confident in our ability to bring your design to life with product that ref...',
      avatar: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=120&q=80',
      unread: false,
      status: 'Materials Prepared',
      messages: [
        { sender: 'producer', text: 'Let me know your thoughts.', time: '1 day ago' }
      ]
    }
  ];

  get activeChat(): ChatItem | null {
    return this.chats.find(c => c.id === this.activeChatId) || null;
  }

  selectChat(chatId: string): void {
    this.activeChatId = chatId;
    const chat = this.chats.find(c => c.id === chatId);
    if (chat) {
      chat.unread = false;
      this.currentStatus = chat.status ? chat.status : 'Update Status';
    }
    this.showPopover = false;
  }

  setFilter(filter: 'all' | 'unread' | 'completed'): void {
    this.activeFilter = filter;
  }

  filteredChats(): ChatItem[] {
    return this.chats.filter(chat => {
      const matchesSearch = chat.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        chat.customer.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesFilter = this.activeFilter === 'all' ||
        (this.activeFilter === 'unread' && chat.unread) ||
        (this.activeFilter === 'completed' && chat.status === 'Materials Prepared'); // treating completed as status prepared for demo

      return matchesSearch && matchesFilter;
    });
  }

  sendMessage(): void {
    if (!this.newMessageText.trim() || !this.activeChatId) return;

    const chat = this.chats.find(c => c.id === this.activeChatId);
    if (chat) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      chat.messages.push({
        sender: 'user',
        text: this.newMessageText.trim(),
        time: timeStr
      });
      chat.lastMessage = 'You : ' + this.newMessageText.trim();
      chat.timestamp = 'Just now';

      this.newMessageText = '';
    }
  }

  togglePopover(event: Event): void {
    event.stopPropagation();
    this.showPopover = !this.showPopover;
  }

  closePopover(): void {
    this.showPopover = false;
  }

  openModal(type: 'collab' | 'close'): void {
    this.showPopover = false;
    this.activeModal = type;
  }

  closeAllModals(): void {
    this.activeModal = null;
    this.ratingValue = 0;
    this.pendingStatus = '';
  }

  submitCollabEnd(): void {
    if (this.activeChatId) {
      this.chats = this.chats.filter(c => c.id !== this.activeChatId);
      this.activeChatId = null;
    }
    this.closeAllModals();
  }

  submitRatingFeedback(): void {
    if (this.activeChatId) {
      this.chats = this.chats.filter(c => c.id !== this.activeChatId);
      this.activeChatId = null;
    }
    this.closeAllModals();
  }

  setRating(val: number): void {
    this.ratingValue = val;
  }

  goBackMobile(): void {
    this.activeChatId = null;
  }
  showStatusPopover: boolean = false;

  toggleStatusPopover(event: Event) {
    event.stopPropagation();
    this.showStatusPopover = !this.showStatusPopover;
    if (this.showStatusPopover) {
      this.showPopover = false;
    }
  }


  updateStatus(status: string) {
    this.currentStatus = status;
    this.showStatusPopover = false;
    this.pendingStatus = status;
    this.activeModal = 'confirmStatus'; 
  }
  confirmStatusUpdate() {
    this.currentStatus = this.pendingStatus; 


    if (this.activeChat) {
      this.activeChat.status = this.pendingStatus;
    }


    this.activeModal = 'statusSuccess';

  }
}
