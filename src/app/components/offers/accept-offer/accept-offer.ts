import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-accept-offer',
  imports: [],
  templateUrl: './accept-offer.html',
  styleUrl: './accept-offer.css',
})
export class AcceptOffer {
  @Input() offer: any = null; 
  
  @Input() isOpen: boolean = false; 

  isSuccessModalOpen: boolean = false;

  @Output() close = new EventEmitter<void>();

  confirmPayment() {
    this.isSuccessModalOpen = true;
  }

  closeAll() {
    this.isSuccessModalOpen = false;
    this.close.emit(); 
  }
}
