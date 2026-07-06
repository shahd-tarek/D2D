import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from '../checkout/checkout.component/checkout.component';
import { AddBalanceComponent } from '../add-balance/add-balance.component/add-balance.component';

interface Transaction {
  type: 'payment' | 'refund';
  title: string;
  date: string;
  amount: number;
}
@Component({
  selector: 'app-balance',
  imports: [CommonModule, FormsModule,CheckoutComponent,AddBalanceComponent],
  templateUrl: './balance.html',
  styleUrl: './balance.css',
})
export class Balance {
  balance: number = 12450.00;
inputAmount: number = 50000;
  currentPage: string = 'wallet';

  transactions: Transaction[] = [
    { type: 'payment', title: 'Order Payment', date: 'May 25, 2025', amount: -3550.00 },
    { type: 'refund', title: 'Refund Received', date: 'May 25, 2025', amount: 780.00 },
    { type: 'payment', title: 'Order Payment', date: 'May 25, 2025', amount: -3550.00 },
    { type: 'payment', title: 'Order Payment', date: 'May 25, 2025', amount: -3550.00 },
    { type: 'refund', title: 'Refund Received', date: 'May 25, 2025', amount: 780.00 },
    { type: 'payment', title: 'Order Payment', date: 'May 25, 2025', amount: -3550.00 },
    { type: 'refund', title: 'Refund Received', date: 'May 25, 2025', amount: 780.00 },
    { type: 'payment', title: 'Order Payment', date: 'May 25, 2025', amount: -780.00 },
    { type: 'payment', title: 'Order Payment', date: 'May 25, 2025', amount: -780.00 },
  ];

  onAddBalance() {
    if (this.inputAmount && this.inputAmount > 0) {
      alert(`سيتم توجيهك لبوابة الدفع لشحن مبلغ: ${this.inputAmount} EGP`);
      // Payment Gateway 
      
    }
  }
  navigateTo(page: string) {
    if (page === 'add-balance' && (!this.inputAmount || this.inputAmount <= 0)) {
      alert('Please enter a valid amount first');
      return;
    }
    this.currentPage = page;
  }

}
