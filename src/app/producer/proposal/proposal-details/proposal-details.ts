import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-proposal-details',
  imports: [],
  templateUrl: './proposal-details.html',
  styleUrl: './proposal-details.css',
})
export class ProposalDetails {
  @Input() offer: any;
  @Output() decline = new EventEmitter<any>();
  @Output() back = new EventEmitter<void>();
  goBack() {
    this.back.emit();
  }
  onDeclineClick() {
    this.decline.emit(this.offer);
  }
}
