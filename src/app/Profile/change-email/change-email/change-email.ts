import { Component ,Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-change-email',
  imports: [ReactiveFormsModule],
  templateUrl: './change-email.html',
  styleUrl: './change-email.css',
})
export class ChangeEmail {
 @Output() onClose = new EventEmitter<void>();
  
  // التحكم بالخطوات من 1 إلى 5
  currentStep: number = 1;

  currentEmailForm: FormGroup;
  otpForm1: FormGroup;
  newEmailForm: FormGroup;
  otpForm2: FormGroup;

  constructor(private fb: FormBuilder) {
    // خطوة 1
    this.currentEmailForm = this.fb.group({
      currentEmail: ['', [Validators.required, Validators.email]]
    });

    // خطوة 2 (تقبل حروف وأرقام)
    this.otpForm1 = this.fb.group({
      c1: ['', Validators.required], c2: ['', Validators.required], c3: ['', Validators.required],
      c4: ['', Validators.required], c5: ['', Validators.required], c6: ['', Validators.required]
    });

    // خطوة 3
    this.newEmailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]]
    });

    // خطوة 4 (تقبل حروف وأرقام)
    this.otpForm2 = this.fb.group({
      c1: ['', Validators.required], c2: ['', Validators.required], c3: ['', Validators.required],
      c4: ['', Validators.required], c5: ['', Validators.required], c6: ['', Validators.required]
    });
  }

  nextToStep2() {
    if (this.currentEmailForm.valid) { this.currentStep = 2; } 
    else { this.currentEmailForm.markAllAsTouched(); }
  }

  nextToStep3() {
    if (this.otpForm1.valid) { this.currentStep = 3; } 
    else { this.otpForm1.markAllAsTouched(); }
  }

  nextToStep4() {
    if (this.newEmailForm.valid) { this.currentStep = 4; } 
    else { this.newEmailForm.markAllAsTouched(); }
  }

  nextToStep5() {
    if (this.otpForm2.valid) { this.currentStep = 5; } 
    else { this.otpForm2.markAllAsTouched(); }
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