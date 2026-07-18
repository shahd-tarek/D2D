import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { environment } from '../../../environments/environment.prod';
import { OfferService } from '../../../services/offer.service';


@Component({
  selector: 'app-design-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, Header, Footer],
  templateUrl: './design-view.component.html',
  styleUrls: ['./design-view.component.css']
})
export class DesignViewComponent implements OnInit {
  activeTab: 'details' | 'specs' = 'details';
  id: string | null = null;
  mode: 'view' | 'edit' = 'view';
  designDetails: any = null;
  isLoading = true;

  editForm!: FormGroup;
  genderOptions = ['Male', 'Female'];
  categoryOptions = ['top', 'bottom', 'outerwear', 'dresses', 'activewear', 'accessories', 'other'];

  resolveImageUrl(images: string[] | undefined): string {
    const targetImages = images || this.designDetails?.designImages || this.designDetails?.images;
    if (!targetImages || targetImages.length === 0) {
      return 'shirt.png';
    }
    const img = targetImages[0];
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
      return img;
    }
    const cleanImg = img.startsWith('/') ? img.substring(1) : img;
    return `${environment.apiUrl}/${cleanImg}`;
  }
  printingTypeOptions = ['Screen Print', 'DTF Print', 'DTG Print', 'Sublimation', 'Heat Transfer', 'Embroidery', 'None', 'Not Sure'];
  allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

  selectedColors: string[] = [];
  selectedSizes: string[] = [];
  availableColors: string[] = ['#ffffff', '#000000', '#0f0c5d', '#e50012', '#808080', '#008000', '#ffa500', '#ffff00', '#ffc0cb', '#800080', '#a52a2a'];
  showColorPopover = false;
  customColorPicked = '#808080';
  presetColors = ['#FF5733', '#FFC300', '#DAF7A6', '#33FF57', '#33FFBD', '#3380FF', '#5733FF', '#C70039', '#900C3F', '#581845'];

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private offerService = inject(OfferService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || null;
      this.mode = (params['mode'] === 'edit') ? 'edit' : 'view';

      if (this.id) {
        this.loadDesignDetails();
      } else {
        this.isLoading = false;
      }
    });

    this.initForm();
  }

  initForm(): void {
    this.editForm = this.fb.group({
      designName: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      targetAudience: ['', Validators.required],
      gender: ['Unisex'],
      materials: ['', Validators.required],
      printingType: ['', Validators.required],
      quantity: [150, [Validators.required, Validators.min(1), Validators.max(150)]],
      targetPrice: [100, [Validators.required, Validators.min(1)]],
      durationValue: [1, [Validators.required, Validators.min(1)]],
      durationUnit: ['days', Validators.required]
    });
  }

  loadDesignDetails(): void {
    this.isLoading = true;
    this.offerService.getPublishedDesignDetails(this.id!).subscribe({
      next: (res) => {
        if (res && res.colors) res.colors = Array.from(new Set(res.colors));
        if (res && res.sizes) res.sizes = Array.from(new Set(res.sizes));

        this.designDetails = res;
        this.isLoading = false;

        if (res) {
          // Pre-populate variables
          this.selectedColors = res.colors || [];
          this.selectedColors.forEach(color => {
            if (!this.availableColors.includes(color)) {
              this.availableColors.push(color);
            }
          });
          this.selectedSizes = res.sizes || [];

          // Map durationInDays to value and unit for form display
          let dVal = res.duration || 1;
          let dUnit = 'days';
          if (dVal % 30 === 0) {
            dVal = dVal / 30;
            dUnit = 'months';
          } else if (dVal % 7 === 0) {
            dVal = dVal / 7;
            dUnit = 'weeks';
          }

          let mappedGender = 'Male';
          const gStr = String(res.gender || '').trim().toLowerCase();
          if (gStr === 'female' || res.gender === true) {
            mappedGender = 'Female';
          } else if (gStr === 'male' || res.gender === false) {
            mappedGender = 'Male';
          }

          this.editForm.patchValue({
            designName: res.name || '',
            category: res.category || '',
            description: res.description || '',
            targetAudience: res.targetAudience || '',
            gender: mappedGender,
            materials: res.material || '',
            printingType: res.printingType || '',
            quantity: res.amount || 150,
            targetPrice: res.maxPrice || 100,
            durationValue: dVal,
            durationUnit: dUnit
          });
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading published design details:', err);
        this.isLoading = false;
      }
    });
  }

  switchTab(tab: 'details' | 'specs'): void {
    this.activeTab = tab;
  }

  goBack(): void {
    this.router.navigate(['/customer/my-designs']);
  }

  toggleColor(color: string): void {
    if (this.selectedColors.includes(color)) {
      this.selectedColors = this.selectedColors.filter(c => c !== color);
    } else {
      this.selectedColors.push(color);
    }
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
    this.showColorPopover = false;
  }

  toggleSize(size: string): void {
    if (this.selectedSizes.includes(size)) {
      this.selectedSizes = this.selectedSizes.filter(s => s !== size);
    } else {
      this.selectedSizes.push(size);
    }
  }

  get designNameLength(): number {
    return this.editForm.get('designName')?.value?.length || 0;
  }

  get descriptionLength(): number {
    return this.editForm.get('description')?.value?.length || 0;
  }

  onSaveEdit(): void {
    if (this.editForm.valid && this.selectedColors.length > 0 && this.selectedSizes.length > 0) {
      const fVal = this.editForm.value;

      // Calculate duration in days
      let days = Number(fVal.durationValue);
      if (fVal.durationUnit === 'weeks') {
        days = days * 7;
      } else if (fVal.durationUnit === 'months') {
        days = days * 30;
      }

      let genderVal: boolean = false;
      if (fVal.gender === 'Female') genderVal = true;

      // Build JSON patch operations list (exact PascalCase matching backend property names)
      const patchOps: any[] = [
        { op: 'replace', path: '/Name', value: fVal.designName },
        { op: 'replace', path: '/Category', value: fVal.category },
        { op: 'replace', path: '/Description', value: fVal.description },
        { op: 'replace', path: '/TargetAudience', value: fVal.targetAudience },
        { op: 'replace', path: '/Gender', value: genderVal },
        { op: 'replace', path: '/Material', value: fVal.materials },
        { op: 'replace', path: '/PrintingType', value: fVal.printingType },
        { op: 'replace', path: '/Amount', value: Number(fVal.quantity) },
        { op: 'replace', path: '/MaxPrice', value: Number(fVal.targetPrice) },
        { op: 'replace', path: '/Duration', value: days },
        { op: 'replace', path: '/Colors', value: this.selectedColors },
        { op: 'replace', path: '/Sizes', value: this.selectedSizes }
      ];

      let publishId = '';
      if (this.designDetails) {
        if (typeof this.designDetails === 'string') {
          publishId = this.designDetails;
        } else {
          publishId = this.designDetails.customerPublishedOfferId ||
            this.designDetails.publishedOfferId ||
            this.designDetails.id;
        }
      }
      if (!publishId) {
        publishId = localStorage.getItem('offer_id_' + this.id) || this.id!;
      }

      this.offerService.editPublishedDesign(publishId, patchOps).subscribe({
        next: () => {
          this.goBack();
        },
        error: (err) => {
          console.error('Error saving edited design details:', err);
          alert('Failed to save design updates. Please try again.');
        }
      });
    } else {
      this.editForm.markAllAsTouched();
      if (this.selectedColors.length === 0) alert('Please select at least one color.');
      if (this.selectedSizes.length === 0) alert('Please select at least one size.');
    }
  }
}