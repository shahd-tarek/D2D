import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-offer-details',
  imports: [],
  templateUrl: './offer-details.html',
  styleUrl: './offer-details.css',
})
export class OfferDetails {
  @Input() offer: any;

  @Output() back = new EventEmitter<void>();
@Output() accept = new EventEmitter<any>();
  goBack() {
    this.back.emit();
  }
  onAcceptClick() {
    this.accept.emit(this.offer); 
  }
}
