import { Component ,Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

@Output() onClose = new EventEmitter<void>();
  
  currentStep: number = 1; 

  emailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;

  showCurrentPass = false;
  showNewPass = false;
  showConfirmPass = false;

  constructor(private fb: FormBuilder) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });


this.otpForm = this.fb.group({
  code1: ['', [Validators.required]], 
  code2: ['', [Validators.required]],
  code3: ['', [Validators.required]],
  code4: ['', [Validators.required]],
  code5: ['', [Validators.required]],
  code6: ['', [Validators.required]]
});

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  sendCode() {
    if (this.emailForm.valid) {
      this.currentStep = 2; 
    } else {
      this.emailForm.markAllAsTouched();
    }
  }

  verifyCode() {
    if (this.otpForm.valid) {
      this.currentStep = 3;
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  updatePassword() {
    if (this.passwordForm.valid) {
      this.currentStep = 4; 
    } else {
      this.passwordForm.markAllAsTouched();
    }
  }

  close() {
    this.onClose.emit();
  }

  onOtpInput(event: any, nextInput?: HTMLInputElement) {
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }
}