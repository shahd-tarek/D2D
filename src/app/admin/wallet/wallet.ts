import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddBalanceComponent } from "./add-balance/add-balance.component";
import { CheckoutComponent } from "./checkout/checkout.component";

interface Transaction {
  id: string;
  type: 'Credit' | 'Debit';
  description: string;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, AddBalanceComponent, CheckoutComponent],
  templateUrl: './wallet.html',
  styleUrl: './wallet.css',
})
export class Wallet {
  balance: number = 12450.00;
 inputAmount!: number;
  currentPage: string = 'wallet';

  // البيانات مطابقة تماماً للموجود بالصورة
  transactions: Transaction[] = [
    { id: 'TRX-12568', type: 'Credit', description: 'Commission for "White T-Shirt"', amount: 780.00, date: 'Jun 21,2026' },
    { id: 'TRX-12568', type: 'Debit', description: 'Withdrawal to Bank *** 1234', amount: 3550.00, date: 'Apr 12,2026' },
    { id: 'TRX-12568', type: 'Credit', description: 'Commission for "White T-Shirt"', amount: 780.00, date: 'Sep 17,2025' },
    { id: 'TRX-12568', type: 'Credit', description: 'Commission for "White T-Shirt"', amount: 780.00, date: 'May 25,2024' },
    { id: 'TRX-12568', type: 'Debit', description: 'Unprofessional behavior from the Customer', amount: 3550.00, date: 'Sep 17,2025' },
    { id: 'TRX-12568', type: 'Credit', description: 'Commission for "White T-Shirt"', amount: 780.00, date: 'May 25,2024' }
  ];

onWithdraw() {
    // التحقق من أن القيمة مدخلة وصحيحة وأكبر من أو تساوي 100
    if (this.inputAmount && this.inputAmount >= 100) {
      if (this.inputAmount <= this.balance) {
        
        // الانتقال الفعلي إلى الصفحة التالية بعد نجاح الشروط
        this.currentPage = 'add-balance';
        
      } else {
        alert('Insufficient balance.');
      }
    } else {
      alert('Please enter an amount of EGP 100.00 or more.');
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