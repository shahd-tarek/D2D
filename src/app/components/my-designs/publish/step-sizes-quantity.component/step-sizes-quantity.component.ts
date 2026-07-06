import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-sizes-quantity',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-sizes-quantity.component.html',
  styleUrls: ['./step-sizes-quantity.component.css']
})
export class StepSizesQuantityComponent implements OnInit {
  sizesForm!: FormGroup;
  allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];
  selectedSizes: string[] = ['S', 'M', 'L', 'XL'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.sizesForm = this.fb.group({
      quantity: ['', [Validators.required, Validators.min(150)]],
      targetPrice: ['', Validators.required]
    });
  }

  onSizeToggle(size: string): void {
    if (this.selectedSizes.includes(size)) {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    } else {
      this.selectedSizes.push(size);
    }
  }

  onPrevious(): void {
    this.router.navigate(['/publish/colors-materials']);
  }

  onSubmit(): void {
    if (this.sizesForm.valid && this.selectedSizes.length > 0) {
      this.router.navigate(['/publish/review']);
    }
  }
}