import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  @Input() amount: number = 0;
  @Output() back = new EventEmitter<void>();

  cardNumber: string = '';
  expiryDate: string = '';
  cvc: string = '';
  cardholderName: string = '';
  saveCard: boolean = true;

  isProcessing: boolean = false;
  isSuccess: boolean = false;
  currentBalance: number = 63828.00;

 
  constructor(private cdr: ChangeDetectorRef) {}

  get totalAmount(): number {
    return this.amount + 3 + (this.amount * 0.0225);
  }

  onSubmitPayment() {
    this.isProcessing = true;
    this.isSuccess = false;
    this.cdr.detectChanges(); //Loading

    setTimeout(() => {
      this.isProcessing = false;
      this.isSuccess = true;
      
      this.cdr.detectChanges(); 
    }, 2000);
  }

  goToDashboard() {
    this.isSuccess = false;
    this.cdr.detectChanges();
    this.back.emit(); 
  }

  goToPayments() {
    this.isSuccess = false;
    this.cdr.detectChanges();
    this.back.emit();
  }
}