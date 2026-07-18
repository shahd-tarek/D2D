import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, Input, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OfferService } from '../../services/offer.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../environments/environment.prod';


@Component({
  selector: 'app-add-proposal',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-proposal.html',
  styleUrl: './add-proposal.css',
})
export class AddProposal implements OnInit {
  @Input() designId!: string;
  @Input() designName: string = '';
  @Input() rawCustomerId: string = '';
  @Output() back = new EventEmitter<void>();

  isModalOpen: boolean = false;
  customerId: string = '';
  private offerService = inject(OfferService);
  private authService = inject(AuthService);

  designDetails = {
    name: '',
    category: '',
    targetAudience: '',
    gender: '',
    season: 'All seasons',
    colors: [] as string[], 
    materials: '',
    quantity: 0,
    targetPrice: '',
    sizes: '',
    printing: '',
    image: 'shirt.png',
    description: ''
  };

  // (NgModel)
  proposalForm = {
    pricePerPiece: null as number | null,
    totalPrice: null as number | null,
    deposit: null as number | null,
    deliveryTime: null as number | null
  };

  stepsList: Array<{ name: string; minDays: number | null; maxDays: number | null }> = [
    { name: 'Sourcing Material & Fabric', minDays: null, maxDays: null },
    { name: 'Pattern Making & Cutting', minDays: null, maxDays: null },
    { name: 'Sewing & Finishing', minDays: null, maxDays: null }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.customerId = this.rawCustomerId;
    this.designDetails.name = this.designName;
    if (this.designId) {
      this.loadDesignDetails();
    }
  }

  loadDesignDetails(): void {
    this.offerService.getPublishedDesignDetails(this.designId, true).subscribe({
      next: (res) => {
        if (res && res.colors) res.colors = Array.from(new Set(res.colors));
        if (res && res.sizes) res.sizes = Array.from(new Set(res.sizes));

        if (res.customerId) {
          this.customerId = res.customerId;
        }

        let genderText = 'Unisex';
        if (res.gender === false || res.gender === 'Male') genderText = 'Male';
        else if (res.gender === true || res.gender === 'Female') genderText = 'Female';

        const targetImages = res.designImages || res.images;
        let imgUrl = 'shirt.png';
        if (targetImages && targetImages.length > 0) {
          const img = targetImages[0];
          if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
            imgUrl = img;
          } else {
            const cleanImg = img.startsWith('/') ? img.substring(1) : img;
            imgUrl = `${environment.apiUrl}/${cleanImg}`;
          }
        }

        this.designDetails = {
          name: res.designName || res.name || this.designDetails.name || 'Untitled Design',
          category: res.category || 'N/A',
          targetAudience: res.targetAudience || 'N/A',
          gender: genderText,
          season: res.season || 'All seasons',
          colors: res.colors || [],
          materials: res.material || 'N/A',
          quantity: res.amount || 0,
          targetPrice: `${res.maxPrice || 0} EGP / pc`,
          sizes: (res.sizes || []).join(', ') || 'None',
          printing: res.printingType || 'None',
          image: imgUrl,
          description: res.description || 'No description provided.'
        };
      },
      error: (err) => {
        console.error('Error fetching published design details:', err);
      }
    });
  }

 
  onPriceChange(): void {
    if (this.proposalForm.pricePerPiece) {
      this.proposalForm.totalPrice = this.proposalForm.pricePerPiece * this.designDetails.quantity;
    } else {
      this.proposalForm.totalPrice = null;
    }
  }

  addStep(): void {
    this.stepsList.push({ name: '', minDays: null, maxDays: null });
  }

  removeStep(index: number): void {
    if (this.stepsList.length > 1) {
      this.stepsList.splice(index, 1);
      this.onStepsChanged();
    }
  }

  onStepsChanged(): void {
    let totalMax = 0;
    this.stepsList.forEach(s => {
      if (s.maxDays) {
        totalMax += Number(s.maxDays);
      }
    });
    if (totalMax > 0) {
      this.proposalForm.deliveryTime = totalMax;
    }
  }

  goBack(): void {
    this.back.emit();
  }

  submitProposal(): void {
    const producerId = this.authService.getUserId();
    if (!producerId) {
      alert('Producer is not authenticated. Please log in.');
      return;
    }

    if (!this.customerId) {
      alert('Could not find customer ID for this design.');
      return;
    }

    // Format the steps dictionary: Key is step name, value is { item1: min, item2: max }
    const stepsPayload: { [key: string]: { item1: number; item2: number } } = {};
    this.stepsList.forEach(step => {
      if (step.name && step.minDays !== null && step.maxDays !== null) {
        stepsPayload[step.name] = {
          item1: Number(step.minDays),
          item2: Number(step.maxDays)
        };
      }
    });

    const command = {
      customerId: this.customerId,
      producerId: producerId,
      customerPublishedOfferId: this.designId,
      price: this.proposalForm.totalPrice,
      diposit: this.proposalForm.deposit,
      deliveryTime: this.proposalForm.deliveryTime,
      steps: stepsPayload
    };

    this.offerService.sendProducerOffer(command).subscribe({
      next: (res) => {
        this.isModalOpen = true;
      },
      error: (err) => {
        console.error('Error sending producer offer:', err);
        alert(err.error?.detail || err.error?.title || 'An error occurred while submitting the offer. Please try again.');
      }
    });
  }

  //modal

  closeModal(): void {
    this.isModalOpen = false;
  }

  goToProposals(): void {
    this.closeModal();
    this.router.navigate(['/producer/proposals']);
  }

  backToBrowse(): void {
    this.closeModal();
    this.back.emit();
  }

}
