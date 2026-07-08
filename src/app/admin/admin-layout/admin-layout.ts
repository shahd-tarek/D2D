import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from "@angular/router";
import { NotificationsDropdownComponent } from "../../components/Notification/notifications-dropdown.component/notifications-dropdown.component";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, NotificationsDropdownComponent,RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  //profile

  isProfileOpen = false;
  userName = 'Ahmed';
  profileImage = 'Unknown-Person.png';

isSidebarOpen: boolean = false;
}
