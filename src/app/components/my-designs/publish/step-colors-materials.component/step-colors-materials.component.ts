import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-step-colors-materials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-colors-materials.component.html',
  styleUrls: ['./step-colors-materials.component.css']
})
export class StepColorsMaterialsComponent implements OnInit {
  colorsForm!: FormGroup;
  availableColors = ['#ffffff', '#000000', '#0f0c5d', '#e50012'];
  selectedColors: string[] = ['#ffffff']; 

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.colorsForm = this.fb.group({
      mainFabric: ['', Validators.required],
      gsm: ['', Validators.required],
      composition: ['', Validators.required],
      printingType: ['', Validators.required]
    });
  }

  toggleColor(color: string): void {
    if (this.selectedColors.includes(color)) {
      this.selectedColors = this.selectedColors.filter(c => c !== color);
    } else {
      this.selectedColors.push(color);
    }
  }

  onPrevious(): void {
    this.router.navigate(['/publish/details']);
  }

  onSubmit(): void {
    if (this.colorsForm.valid) {
      this.router.navigate(['/publish/sizes-quantity']);
    }
  }
}