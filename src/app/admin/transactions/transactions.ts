import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class Transactions {
  isConfirmModalOpen: boolean = false;
  isSuccessModalOpen: boolean = false;

  openConfirmModal(): void {
    this.isConfirmModalOpen = true;
  }

  closeConfirmModal(): void {
    this.isConfirmModalOpen = false;
  }

  confirmRefund(): void {
    this.isConfirmModalOpen = false; 
    this.isSuccessModalOpen = true;  
  }

  closeSuccessModal(): void {
    this.isSuccessModalOpen = false;
  }
}