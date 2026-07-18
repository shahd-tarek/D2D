import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PublishStateService } from '../publish-state.service';

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
  selectedSizes: string[] = [];

  sizeChartFileName = '';
  sizeChartPreviewUrl: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public stateService: PublishStateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.selectedSizes = this.stateService.selectedSizes;
    this.sizeChartFileName = this.stateService.sizeChartFileName;
    this.sizeChartPreviewUrl = this.stateService.sizeChartPreviewUrl;

    const saved = this.stateService.sizesQuantityData || {};
    this.sizesForm = this.fb.group({
      quantity: [saved.quantity || '', [Validators.required, Validators.min(1), Validators.max(150)]],
      targetPrice: [saved.targetPrice || '', [Validators.required, Validators.min(1)]],
      durationValue: [saved.durationValue || '', [Validators.required, Validators.min(1)]],
      durationUnit: [saved.durationUnit || 'days', Validators.required]
    });

    this.sizesForm.valueChanges.subscribe(val => {
      let days = 0;
      if (val.durationValue && val.durationUnit) {
        const valNum = Number(val.durationValue);
        if (val.durationUnit === 'days') {
          days = valNum;
        } else if (val.durationUnit === 'weeks') {
          days = valNum * 7;
        } else if (val.durationUnit === 'months') {
          days = valNum * 30;
        }
      }
      this.stateService.sizesQuantityData = {
        ...val,
        durationInDays: days
      };
    });
  }

  onSizeToggle(size: string): void {
    if (this.selectedSizes.includes(size)) {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    } else {
      this.selectedSizes.push(size);
    }
    this.stateService.selectedSizes = this.selectedSizes;
  }

  onFileSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.sizeChartFileName = file.name;
      this.stateService.sizeChartFileName = file.name;
      this.stateService.sizesFile = file;

      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.sizeChartPreviewUrl = reader.result as string;
          this.stateService.sizeChartPreviewUrl = reader.result as string;
          this.cdr.detectChanges();
        };
        reader.readAsDataURL(file);
      } else {
        this.sizeChartPreviewUrl = null;
        this.stateService.sizeChartPreviewUrl = null;
        this.cdr.detectChanges();
      }
    }
  }

  removeFile(): void {
    this.sizeChartFileName = '';
    this.sizeChartPreviewUrl = null;
    this.stateService.sizeChartFileName = '';
    this.stateService.sizeChartPreviewUrl = null;
    this.stateService.sizesFile = null;
    this.cdr.detectChanges();
  }


}