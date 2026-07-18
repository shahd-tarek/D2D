import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PublishStateService } from '../publish-state.service';
import { OfferService } from '../../../../services/offer.service';
import { DesignService } from '../../../../services/design.service';
import { environment } from '../../../../environments/environment.prod';


@Component({
  selector: 'app-publish-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './publish-layout.component.html',
  styleUrls: ['./publish-layout.component.css']
})
export class PublishLayoutComponent implements OnInit {
  currentStep: number = 1; 

  private offerService = inject(OfferService);
  private designService = inject(DesignService);
  private route = inject(ActivatedRoute);

  constructor(private router: Router, public stateService: PublishStateService) {}

  ngOnInit(): void {
    this.updateStepNumber(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateStepNumber(event.url);
    });

    this.route.queryParams.subscribe(params => {
      const designId = params['id'];
      if (designId) {
        this.stateService.designId = designId;
        if (!this.stateService.designImageUrl) {
          this.loadDesignImageUrl(designId);
        }
      }
    });
  }

  private loadDesignImageUrl(designId: string): void {
    this.designService.getDesign(designId).subscribe({
      next: (dataStr) => {
        try {
          const design = JSON.parse(dataStr);
          if (design && design.images && design.images.length > 0) {
            const img = design.images[0];
            if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
              this.stateService.designImageUrl = img;
            } else {
              const cleanImg = img.startsWith('/') ? img.substring(1) : img;
              this.stateService.designImageUrl = `${environment.apiUrl}/${cleanImg}`;
            }
          }
        } catch (e) {
          console.error('Error parsing design JSON:', e);
        }
      },
      error: (err) => {
        console.error('Error loading design details:', err);
      }
    });
  }

  private updateStepNumber(url: string): void {
    if (url.includes('details')) this.currentStep = 1;
    else if (url.includes('colors-materials')) this.currentStep = 2;
    else if (url.includes('sizes-quantity')) this.currentStep = 3;
    else if (url.includes('review')) this.currentStep = 4;
  }

  getInstructionText(): string {
    if (this.currentStep === 1) return 'Add information about your design';
    if (this.currentStep === 2) return 'Define colors and fabric details';
    if (this.currentStep === 3) return 'Configure Sizes, Quantity & Price';
    if (this.currentStep === 4) return 'Review your design publication details';
    return '';
  }

  goBackToDashboard(): void {
    this.stateService.showLeaveWarningModal = true;
  }

  confirmLeave(): void {
    this.stateService.showLeaveWarningModal = false;
    this.stateService.reset();
    this.router.navigate(['/customer/my-designs']);
  }

  cancelLeave(): void {
    this.stateService.showLeaveWarningModal = false;
  }

  goToStep(step: number): void {
    if (step < this.currentStep) {
      if (step === 1) this.router.navigate(['/customer/publish/details'], { queryParamsHandling: 'merge' });
      else if (step === 2) this.router.navigate(['/customer/publish/colors-materials'], { queryParamsHandling: 'merge' });
      else if (step === 3) this.router.navigate(['/customer/publish/sizes-quantity'], { queryParamsHandling: 'merge' });
      else if (step === 4) this.router.navigate(['/customer/publish/review'], { queryParamsHandling: 'merge' });
    }
  }

  showSuccessModal: boolean = false;

  onPublish(): void {
    const details = this.stateService.detailsData || {};
    const colorsMaterials = this.stateService.colorsMaterialsData || {};
    const sizesQuantity = this.stateService.sizesQuantityData || {};

    let genderVal: boolean = false;
    if (details.gender === 'Female') genderVal = true;

    const params: any = {
      DesignId: this.stateService.designId || '',
      designId: this.stateService.designId || '',

      Name: details.designName || '',
      name: details.designName || '',

      Category: details.category || '',
      category: details.category || '',

      Description: details.description || '',
      description: details.description || '',

      TargetAudience: details.targetAudience || '',
      targetAudience: details.targetAudience || '',

      Gender: genderVal,
      gender: genderVal,

      Material: colorsMaterials.materials || '',
      material: colorsMaterials.materials || '',

      PrintingType: colorsMaterials.printingType || '',
      printingType: colorsMaterials.printingType || '',

      Duration: sizesQuantity.durationInDays || 0,
      duration: sizesQuantity.durationInDays || 0,

      Amount: sizesQuantity.quantity || 0,
      amount: sizesQuantity.quantity || 0,

      TargetPrice: sizesQuantity.targetPrice || 0,
      targetPrice: sizesQuantity.targetPrice || 0
    };

    if (this.stateService.selectedColors && this.stateService.selectedColors.length > 0) {
      params.Colors = this.stateService.selectedColors;
    }

    if (this.stateService.selectedSizes && this.stateService.selectedSizes.length > 0) {
      params.Sizes = this.stateService.selectedSizes;
    }

    this.offerService.publishDesign(params, this.stateService.sizesFile).subscribe({
      next: (offerId: string) => {
        console.log('Design published successfully. Offer ID:', offerId);
        const cleanOfferId = offerId.replace(/^"|"$/g, '').trim();
        if (this.stateService.designId) {
          localStorage.setItem('offer_id_' + this.stateService.designId, cleanOfferId);
        }
        this.showSuccessModal = true;
      },
      error: (err: any) => {
        console.error('Error publishing design:', err);
        let detailMsg = '';
        if (err?.error) {
          if (typeof err.error === 'string') {
            detailMsg = ': ' + err.error;
          } else if (err.error.message) {
            detailMsg = ': ' + err.error.message;
          } else if (err.error.title) {
            detailMsg = ': ' + err.error.title;
          } else if (err.error.errors) {
            detailMsg = ': ' + JSON.stringify(err.error.errors);
          } else {
            detailMsg = ': ' + JSON.stringify(err.error);
          }
        } else if (err?.message) {
          detailMsg = ': ' + err.message;
        }
        alert('Failed to publish design' + detailMsg + '\nPlease ensure all details are correct.');
      }
    });
  }

  goToMyDesigns(): void {
    this.showSuccessModal = false;
    this.stateService.reset();
    this.router.navigate(['/customer/my-designs']);
  }

  createNewDesign(): void {
    this.showSuccessModal = false;
    this.stateService.reset();
    this.router.navigate(['/customer/start-design']);
  }

  isCurrentStepValid(): boolean {
    if (this.currentStep === 1) {
      return this.stateService.isDetailsValid();
    }
    if (this.currentStep === 2) {
      return this.stateService.isColorsMaterialsValid();
    }
    if (this.currentStep === 3) {
      return this.stateService.isSizesQuantityValid();
    }
    return true;
  }

  onPreviousStep(): void {
    if (this.currentStep === 1) {
      this.stateService.showLeaveWarningModal = true;
    } else if (this.currentStep === 2) {
      this.router.navigate(['/customer/publish/details'], { queryParamsHandling: 'merge' });
    } else if (this.currentStep === 3) {
      this.router.navigate(['/customer/publish/colors-materials'], { queryParamsHandling: 'merge' });
    } else if (this.currentStep === 4) {
      this.router.navigate(['/customer/publish/sizes-quantity'], { queryParamsHandling: 'merge' });
    }
  }

  onNextStep(): void {
    if (this.currentStep === 1) {
      if (this.isCurrentStepValid()) {
        this.router.navigate(['/customer/publish/colors-materials'], { queryParamsHandling: 'merge' });
      }
    } else if (this.currentStep === 2) {
      if (this.isCurrentStepValid()) {
        this.router.navigate(['/customer/publish/sizes-quantity'], { queryParamsHandling: 'merge' });
      }
    } else if (this.currentStep === 3) {
      if (this.isCurrentStepValid()) {
        this.router.navigate(['/customer/publish/review'], { queryParamsHandling: 'merge' });
      }
    } else if (this.currentStep === 4) {
      this.onPublish();
    }
  }
}