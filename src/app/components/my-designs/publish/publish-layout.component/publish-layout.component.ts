import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-publish-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publish-layout.component.html',
  styleUrls: ['./publish-layout.component.css']
})
export class PublishLayoutComponent implements OnInit {
  currentStep: number = 2; 

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateStepNumber(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateStepNumber(event.url);
    });
  }

  private updateStepNumber(url: string): void {
    if (url.includes('details')) this.currentStep = 2;
    else if (url.includes('colors-materials')) this.currentStep = 3;
    else if (url.includes('sizes-quantity')) this.currentStep = 4;
  }

  getInstructionText(): string {
    if (this.currentStep === 2) return 'Add information about your design';
    if (this.currentStep === 3) return 'Define colors and fabric details';
    if (this.currentStep === 4) return 'Configure Sizes, Quantity & Price';
    return '';
  }

  goBackToDashboard(): void {
    this.router.navigate(['/my-designs']);
  }
}