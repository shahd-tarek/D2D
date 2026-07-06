import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemComponent } from '../notification-item.component/notification-item.component';


interface NotificationData {
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}

@Component({
  selector: 'app-notification.component',
  imports: [CommonModule, NotificationItemComponent], // أضفنا كارت الإشعار هنا بدلاً من الـ Dropdown لعدم تكرار الجرس
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  activeFilter: 'all' | 'unread' = 'all';

  allNotifications: NotificationData[] = [
    { title: 'New offer received', description: 'You have a new offer on your design "Classic Denim Jacket".', time: '33 mins ago', isUnread: true },
    { title: 'Deposit refunded', description: 'Your deposit has been refunded successfully.', time: '1 day ago', isUnread: false },
    { title: 'Design generated', description: 'Your design "Oversized Linen Shirt" is ready to review.', time: '1 week ago', isUnread: true },
    { title: 'Deposit payment successful', description: 'Your deposit for "Oversized Linen Shirt" has been paid successfully.', time: '1 month ago', isUnread: true },
    { title: 'New message', description: 'You received a new message from the producer about "Oversized Linen Shirt".', time: '33 mins ago', isUnread: false },
    { title: 'Balance Updated', description: 'EGP 500 has been added to your wallet.', time: '33 mins ago', isUnread: false },
    { title: 'Production started', description: 'The producer has started working on "Oversized Linen Shirt".', time: '33 mins ago', isUnread: false },
    { title: 'Production completed', description: 'Your order "Oversized Linen Shirt" is ready.', time: '33 mins ago', isUnread: false },
    { title: 'Order shipped', description: 'Your order is on the way.', time: '33 mins ago', isUnread: false },
    { title: 'Order delivered', description: 'Your order has been delivered successfully.', time: '33 mins ago', isUnread: false },
    { title: 'Welcome', description: 'Start designing your first outfit with AI.', time: '33 mins ago', isUnread: false },
    { title: 'Profile updated', description: 'Your profile information has been updated successfully.', time: '33 mins ago', isUnread: false }
  ];

  get filteredNotifications() {
    if (this.activeFilter === 'unread') {
      return this.allNotifications.filter(n => n.isUnread);
    }
    return this.allNotifications;
  }

  get unreadCount() {
    return this.allNotifications.filter(n => n.isUnread).length;
  }

  markAllAsRead() {
    this.allNotifications.forEach(n => n.isUnread = false);
  }
}