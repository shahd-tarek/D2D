import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { AddNewAddress } from '../add-new-address/add-new-address';

interface Address {
  id: number;
  tag: string;
  text: string;
    default?: boolean;
}

@Component({
  selector: 'app-addresses-modal',
  imports: [CommonModule,AddNewAddress],
  templateUrl: './addresses-modal.html',
  styleUrl: './addresses-modal.css',
})
export class AddressesModal {
 @Output() onClose = new EventEmitter<void>();


  addresses: Address[] = [
    {
      id: 1,
      tag: 'Home',
      text: '123 El-Tahrir Street, Dokki, Giza, Egypt'
    },
    {
      id: 2,
      tag: 'Work',
      text: 'Building 45, Smart Village, KM 28 Cairo-Alex Desert Road, Egypt'
    }
  ];

  close() {
    this.onClose.emit();
  }

  deleteAddress(id: number) {
 
    this.addresses = this.addresses.filter(address => address.id !== id);
  }
   showAddNewAddressModal: boolean = false; 

  openAddNewAddressModal() {
    this.showAddNewAddressModal = true;
  }


  closeAddNewAddressModal() {
    this.showAddNewAddressModal = false;
  }
}
