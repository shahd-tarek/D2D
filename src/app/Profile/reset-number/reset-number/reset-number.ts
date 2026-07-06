import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-reset-number',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-number.html',
  styleUrl: './reset-number.css',
})
export class ResetNumber {

@Output() onClose = new EventEmitter<void>();
  
  // إدارة خطوت الـ بوب اب: 1 -> إدخال الرقم، 2 -> كود التفعيل، 3 -> النجاح التام
  currentStep: number = 1;

  phoneForm: FormGroup;
  otpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // المرحلة الأولى: التحقق من الهاتف ويقبل أرقام ورموز مثل (+20)
    this.phoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(10)]]
    });

    // المرحلة الثانية: كود التحقق (بدون قيود ليقبل الحروف والأرقام بناءً على رغبتكِ)
    this.otpForm = this.fb.group({
      code1: ['', Validators.required],
      code2: ['', Validators.required],
      code3: ['', Validators.required],
      code4: ['', Validators.required],
      code5: ['', Validators.required],
      code6: ['', Validators.required]
    });
  }

  sendCode() {
    if (this.phoneForm.valid) {
      this.currentStep = 2; // الانتقال لكود التفعيل
    } else {
      this.phoneForm.markAllAsTouched();
    }
  }

  confirmCode() {
    if (this.otpForm.valid) {
      this.currentStep = 3; // الانتقال لشاشة النجاح
    } else {
      this.otpForm.markAllAsTouched();
    }
  }

  close() {
    this.onClose.emit();
  }

  // الانتقال التلقائي للخانة التالية عند الكتابة
  onOtpInput(event: any, nextInput?: HTMLInputElement) {
    if (event.target.value.length === 1 && nextInput) {
      nextInput.focus();
    }
  }
}
