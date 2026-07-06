import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-design-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './design-view.component.html',
  styleUrls: ['./design-view.component.css']
})
export class DesignViewComponent {
  // التبويب النشط حالياً (إما 'details' أو 'specs')
  activeTab: 'details' | 'specs' = 'details';

  constructor(private router: Router) {}

  switchTab(tab: 'details' | 'specs'): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/my-designs']);
  }

  goToEdit(): void {
    // يمكن ربطها لاحقاً بصفحة التعديل
    console.log('Go to edit design');
  }
}