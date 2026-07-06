import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NotificationData {
  title: string;
  description: string;
  time: string;
  isUnread: boolean;
}

@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-item.component.html',
  styleUrl: './notification-item.component.css'
})
export class NotificationItemComponent {
  // استقبال بيانات الإشعار من المكون الأب
  @Input() data!: NotificationData;
}