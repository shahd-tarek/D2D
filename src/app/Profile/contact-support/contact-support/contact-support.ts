import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-contact-support',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact-support.html',
  styleUrl: './contact-support.css',
})
export class ContactSupport {
supportForm: FormGroup;
  maxLength: number = 500;
  isSubmitted: boolean = false;

  complaintTypes = [
    { id: 'order', title: 'Order Issue', desc: 'Problems related to my order', icon: 'box' },
    { id: 'producer', title: 'Producer Issue', desc: 'Issue with a producer', icon: 'user' },
    { id: 'payment', title: 'Payment Issue', desc: 'Problems with payments or refunds', icon: 'card' },
    { id: 'product', title: 'Product/ Quality Issue', desc: 'Problems with the received product', icon: 'shirt' },
    { id: 'communication', title: 'Communication Issue', desc: 'Issues with messaging or replies', icon: 'message' },
    { id: 'other', title: 'Other', desc: 'Other issues', icon: 'more' }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.supportForm = this.fb.group({
      complaintType: ['', Validators.required], 
      description: ['', [Validators.required, Validators.maxLength(this.maxLength)]]
    });
  }

  get charCount(): number {
    return this.supportForm.get('description')?.value?.length || 0;
  }

  onSubmit() {
    if (this.supportForm.valid) {
      console.log('Sending request to backend...', this.supportForm.value);
      this.isSubmitted = true;
    } else {
      this.supportForm.markAllAsTouched();
    }
  }


  goBackToProfile() {
    this.router.navigate(['/profile']);
  }
}