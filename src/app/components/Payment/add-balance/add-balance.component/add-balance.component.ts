import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-balance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.css']
})
export class AddBalanceComponent {
  @Input() balance: number = 0;
  @Input() amount: number = 0;
  
  @Output() back = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();

  selectedMethod: string = 'meeza';

  get gatewayFees(): number {
    return 3 + (this.amount * 0.0225);
  }

  get totalAmount(): number {
    return this.amount + this.gatewayFees;
  }
}