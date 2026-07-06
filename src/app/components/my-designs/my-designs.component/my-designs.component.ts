import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-my-designs',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './my-designs.component.html',
  styleUrl: './my-designs.component.css',
})
export class MyDesignsComponent {

  constructor(private router: Router) {}

  openPublish(): void {
 
    this.router.navigate(['/publish/details']);
  }
  onViewDesign(): void {
  this.router.navigate(['/design-view']);
}
}