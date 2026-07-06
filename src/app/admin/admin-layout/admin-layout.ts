import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  //profile

  isProfileOpen = false;
  userName = 'Ahmed';
  profileImage = 'avatar.jpg';

isSidebarOpen: boolean = false;
}
