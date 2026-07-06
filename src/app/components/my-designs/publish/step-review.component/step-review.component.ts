import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-review.component.html',
  styleUrls: ['./step-review.component.css']
})
export class StepReviewComponent {
  showSuccessModal: boolean = false;

  constructor(private router: Router) {}

  onPrevious(): void {
    this.router.navigate(['/publish/sizes-quantity']);
  }

 onPublish(): void {

  this.showSuccessModal = true;
  }

  goToMyDesigns(): void {
    this.showSuccessModal = false;
    this.router.navigate(['/my-designs']);
  }

  createNewDesign(): void {
    this.showSuccessModal = false;

    this.router.navigate(['/publish/upload']);
  }
  
  closeModal(): void {
    this.showSuccessModal = false;
  }
}