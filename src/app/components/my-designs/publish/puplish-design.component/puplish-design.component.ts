import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-puplish-design',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './puplish-design.component.html',
  styleUrl: './puplish-design.component.css',
})
export class PuplishDesignComponent implements OnInit {
  publishForm!: FormGroup;
  genderOptions = ['Unisex', 'Male', 'Female'];
  selectedGender = 'Unisex';


  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.publishForm = this.fb.group({
      designName: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      targetAudience: ['', Validators.required],
      gender: ['Unisex'],
      season: ['', Validators.required],
      style: ['', Validators.required]
    });
  }

  selectGender(gender: string): void {
    this.selectedGender = gender;
    this.publishForm.patchValue({ gender: gender });
  }

  get designNameLength(): number {
    return this.publishForm.get('designName')?.value?.length || 0;
  }

  get descriptionLength(): number {
    return this.publishForm.get('description')?.value?.length || 0;
  }

  onPrevious(): void {
    this.router.navigate(['/my-designs']);
  }

  onSubmit(): void {
    if (this.publishForm.valid) {
      console.log('بيانات الخطوة الثانية جاهزة:', this.publishForm.value);

      this.router.navigate(['/publish/colors-materials']);
    } else {
      this.publishForm.markAllAsTouched();
    }
  }
}