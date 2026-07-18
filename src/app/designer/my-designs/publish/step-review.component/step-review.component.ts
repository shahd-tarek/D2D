import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PublishStateService } from '../publish-state.service';

@Component({
  selector: 'app-step-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-review.component.html',
  styleUrls: ['./step-review.component.css']
})
export class StepReviewComponent {
  constructor(public stateService: PublishStateService) {}
}