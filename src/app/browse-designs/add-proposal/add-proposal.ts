import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-proposal',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-proposal.html',
  styleUrl: './add-proposal.css',
})
export class AddProposal {
  isModalOpen: boolean = false;
  designDetails = {
    name: 'Oversized Hoodie',
    category: 'Casual/ Streetwear',
    targetAudience: 'Young Adults',
    gender: 'Unisex',
    season: 'All seasons',
    colors: ['#ffffff', '#1a1063'], 
    materials: 'French Terry, 320 GSM, 100% Cotton',
    quantity: 175,
    targetPrice: '300 EGP / pc',
    sizes: 'S, M, L, XL',
    printing: 'None',
    image: 'shirt.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  };

  // (NgModel)
  proposalForm = {
    bio: '',
    manufacturingApproach: '',
    materialSuggestion: '',
    pricePerPiece: null as number | null,
    totalPrice: null as number | null,
    deliveryTime: '',
    services: [
      { text: 'Premium quality fabric', checked: true },
      { text: 'Perfect stitching & finishing', checked: true }
    ]
  };

  newServiceText: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void { }

 
  onPriceChange(): void {
    if (this.proposalForm.pricePerPiece) {
      this.proposalForm.totalPrice = this.proposalForm.pricePerPiece * this.designDetails.quantity;
    } else {
      this.proposalForm.totalPrice = null;
    }
  }

  // إضافة خدمة جديدة في قسم Services Included عند الضغط على Enter
  addService(): void {
    if (this.newServiceText.trim() && this.proposalForm.services.length < 50) {
      this.proposalForm.services.push({
        text: this.newServiceText.trim(),
        checked: false
      });
      this.newServiceText = '';
    }
  }

  goBack(): void {
    this.router.navigate(['/browse-designs']); 
  }

  submitProposal(): void {
    this.isModalOpen = true; 
  }

  //modal

  closeModal(): void {
    this.isModalOpen = false;
  }

  goToProposals(): void {
    this.closeModal();
  }

  backToBrowse(): void {
    this.closeModal();
  }

}
