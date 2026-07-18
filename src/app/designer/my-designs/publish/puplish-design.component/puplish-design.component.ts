import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router'; 
import { PublishStateService } from '../publish-state.service';
import { DesignService } from '../../../../services/design.service';

@Component({
  selector: 'app-puplish-design',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './puplish-design.component.html',
  styleUrl: './puplish-design.component.css',
})
export class PuplishDesignComponent implements OnInit {
  publishForm!: FormGroup;
  genderOptions = ['Male', 'Female'];
  selectedGender = 'Male';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private designService = inject(DesignService);
  public stateService = inject(PublishStateService);

  ngOnInit(): void {
    const saved = this.stateService.detailsData || {};
    this.selectedGender = saved.gender || 'Male';

    this.publishForm = this.fb.group({
      designName: [saved.designName || '', [Validators.required, Validators.maxLength(50)]],
      category: [saved.category || '', Validators.required],
      description: [saved.description || '', [Validators.required, Validators.maxLength(500)]],
      targetAudience: [saved.targetAudience || '', Validators.required],
      gender: [this.selectedGender]
    });
    this.stateService.detailsData = this.publishForm.value;

    this.publishForm.valueChanges.subscribe(val => {
      this.stateService.detailsData = val;
    });

    // Load designId from query params if available
    this.route.queryParams.subscribe(params => {
      const designId = params['id'];
      const name = params['name'];
      if (designId) {
        this.stateService.designId = designId;
        if (name && !this.publishForm.get('designName')?.value) {
          this.publishForm.patchValue({
            designName: name
          });
        }
      }
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
    this.stateService.showLeaveWarningModal = true;
  }


}