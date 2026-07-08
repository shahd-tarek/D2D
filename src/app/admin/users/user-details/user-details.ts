import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminUsersService, CustomerProfileDetails } from '../../../services/admin-users.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {
  userId: string | null = null;
  user!: CustomerProfileDetails;

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminUsersService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProfile(id);
    }
  }

  loadProfile(id: string): void {

    this.adminService.getCustomerProfile(id).subscribe({
      next: (res) => {
        if (res && res.id) {
          this.user = res;
          this.cdr.detectChanges();
        } else {
          this.loadProducer(id);
        }
      },
      error: (err) => {

        console.warn("Not a customer, fetching producer profile...");
        this.loadProducer(id);
      }
    });
  }

  private loadProducer(id: string): void {
    this.adminService.getProducerProfile(id).subscribe({
      next: (res) => {
        this.user = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Failed to load profile for both customer and producer", err);
      }
    });
  }
}