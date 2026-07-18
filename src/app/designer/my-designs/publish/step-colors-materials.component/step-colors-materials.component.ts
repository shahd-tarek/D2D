import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PublishStateService } from '../publish-state.service';

@Component({
  selector: 'app-step-colors-materials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './step-colors-materials.component.html',
  styleUrls: ['./step-colors-materials.component.css']
})
export class StepColorsMaterialsComponent implements OnInit {
  colorsForm!: FormGroup;
  availableColors: string[] = [];
  selectedColors: string[] = []; 

  showColorPopover = false;
  customColorPicked = '#808080';
  presetColors = ['#FF5733', '#FFC300', '#DAF7A6', '#33FF57', '#33FFBD', '#3380FF', '#5733FF', '#C70039', '#900C3F', '#581845'];

  constructor(private fb: FormBuilder, private router: Router, public stateService: PublishStateService) {}

  ngOnInit(): void {
    this.availableColors = this.stateService.availableColors;
    this.selectedColors = this.stateService.selectedColors;

    const saved = this.stateService.colorsMaterialsData || {};
    this.colorsForm = this.fb.group({
      materials: [saved.materials || '', Validators.required],
      printingType: [saved.printingType || '', Validators.required]
    });

    this.colorsForm.valueChanges.subscribe(val => {
      this.stateService.colorsMaterialsData = val;
    });
  }

  toggleColor(color: string): void {
    if (this.selectedColors.includes(color)) {
      this.selectedColors = this.selectedColors.filter(c => c !== color);
    } else {
      this.selectedColors.push(color);
    }
    this.stateService.selectedColors = this.selectedColors;
  }

  toggleColorPopover(): void {
    this.showColorPopover = !this.showColorPopover;
  }

  presetClicked(color: string): void {
    this.customColorPicked = color;
  }

  confirmCustomColor(): void {
    const color = this.customColorPicked;
    if (!this.availableColors.includes(color)) {
      this.availableColors.push(color);
    }
    if (!this.selectedColors.includes(color)) {
      this.selectedColors.push(color);
    }
    this.stateService.availableColors = this.availableColors;
    this.stateService.selectedColors = this.selectedColors;
    this.showColorPopover = false;
  }


}