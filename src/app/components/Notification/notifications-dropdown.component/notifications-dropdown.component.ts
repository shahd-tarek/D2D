import { Component, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface NotificationItem {
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}
@Component({
  selector: 'app-notifications-dropdown',
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications-dropdown.component.html',
  styleUrl: './notifications-dropdown.component.css',
})
export class NotificationsDropdownComponent {

isOpen: boolean = false;

  // بيانات تجريبية مطابقة للتصميم الخاص بكِ
  notifications: NotificationItem[] = [
    {
      title: 'New offer received',
      description: 'You have a new offer on your design "Classic Denim Jacket".',
      time: '33 mins ago',
      isUnread: true
    },
    {
      title: 'Deposit refunded',
      description: 'Your deposit has been refunded successfully.',
      time: '33 mins ago',
      isUnread: false
    },
    {
      title: 'Design generated',
      description: 'Your design "Oversized Linen Shirt" is ready to review.',
      time: '33 mins ago',
      isUnread: true
    },
    {
      title: 'Deposit payment successful',
      description: 'Your deposit for "Oversized Linen Shirt" has been paid successfully.',
      time: '33 mins ago',
      isUnread: true
    },
    {
      title: 'New message',
      description: 'You received a new message from the producer about "Oversized Linen Shirt".',
      time: '33 mins ago',
      isUnread: false
    },
    {
      title: 'Balance Updated',
      description: 'EGP 500 has been added to your wallet.',
      time: '33 mins ago',
      isUnread: false
    }
  ];

  constructor(private elementRef: ElementRef) {}

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.isUnread = false);
  }

  // إغلاق القائمة تلقائياً إذا ضغط المستخدم في أي مكان خارجها
  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}