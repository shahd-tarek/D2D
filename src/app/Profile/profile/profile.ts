import { Component } from '@angular/core';
import { Footer } from "../../components/footer/footer";
import { Header } from "../../components/header/header";
import { RouterLink, RouterOutlet } from '@angular/router';
import { AddressesModal } from '../addresses/addresses-modal/addresses-modal';
import { AddNewAddress } from '../addresses/add-new-address/add-new-address';
import { ResetPassword } from '../reset-password/reset-password/reset-password';
import { ResetNumber } from '../reset-number/reset-number/reset-number';
import { ChangeEmail } from '../change-email/change-email/change-email';

@Component({
  selector: 'app-profile',
  imports: [ RouterLink, AddressesModal,AddNewAddress ,ResetPassword,ResetNumber,ChangeEmail],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {

 showAddressesModal: boolean = false;

  showAddNewAddressModal: boolean = false; 

  activeTab: string = 'personal'; 
  
//show addresses
  openAddressesModal(event: Event) {
    event.preventDefault();
    this.showAddressesModal = true;
  }

  closeAddressesModal() {
    this.showAddressesModal = false;
  }

//add new address
  openAddNewAddressModal() {
    this.showAddNewAddressModal = true;
  }

  closeAddNewAddressModal() {
    this.showAddNewAddressModal = false;
  }

  changeTab(tabName: string) {
    this.activeTab = tabName;
  }
  //change password modal
  showResetPasswordModal: boolean = false;

  openResetPassword() {
    this.showResetPasswordModal = true;
  }

  closeResetPassword() {
    this.showResetPasswordModal = false;
  }

  //change number 
  showResetNumberModal: boolean = false;

  openResetNumberModal() {
    this.showResetNumberModal = true;
  }

  closeResetNumberModal() {
    this.showResetNumberModal = false;
  }
  //change email 
  showChangeEmailModal: boolean = false;

  openChangeEmailModal() {
    this.showChangeEmailModal = true;
  }

  closeChangeEmailModal() {
    this.showChangeEmailModal = false;
  }

}
