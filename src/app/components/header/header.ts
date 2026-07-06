import { Component } from '@angular/core';
import { NotificationsDropdownComponent } from '../Notification/notifications-dropdown.component/notifications-dropdown.component';

@Component({
  selector: 'app-header',
  imports: [NotificationsDropdownComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
