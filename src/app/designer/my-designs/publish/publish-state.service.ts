import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublishStateService {
  designId: string | null = null;
  designImageUrl: string | null = null;

  // Step 1: Details
  detailsData: any = null;

  // Step 2: Colors & Materials
  colorsMaterialsData: any = null;
  selectedColors: string[] = [];
  availableColors: string[] = ['#ffffff', '#000000', '#0f0c5d', '#e50012', '#808080', '#008000', '#ffa500', '#ffff00', '#ffc0cb', '#800080', '#a52a2a'];

  // Step 3: Sizes & Quantity
  sizesQuantityData: any = null;
  selectedSizes: string[] = [];
  sizeChartFileName: string = '';
  sizeChartPreviewUrl: string | null = null;
  sizesFile: File | null = null;

  // Warning Modal State
  showLeaveWarningModal: boolean = false;

  reset(): void {
    this.designId = null;
    this.designImageUrl = null;
    this.detailsData = null;
    this.colorsMaterialsData = null;
    this.selectedColors = [];
    this.availableColors = ['#ffffff', '#000000', '#0f0c5d', '#e50012', '#808080', '#008000', '#ffa500', '#ffff00', '#ffc0cb', '#800080', '#a52a2a'];
    this.sizesQuantityData = null;
    this.selectedSizes = [];
    this.sizeChartFileName = '';
    this.sizeChartPreviewUrl = null;
    this.sizesFile = null;
    this.showLeaveWarningModal = false;
  }

  isDetailsValid(): boolean {
    const d = this.detailsData;
    if (!d) return false;
    return !!(d.designName && d.designName.trim().length > 0 && d.designName.length <= 50 &&
              d.category &&
              d.description && d.description.trim().length > 0 && d.description.length <= 500 &&
              d.targetAudience);
  }

  isColorsMaterialsValid(): boolean {
    const c = this.colorsMaterialsData;
    if (!c) return false;
    return !!(this.selectedColors && this.selectedColors.length > 0 &&
              c.materials && c.materials.trim().length > 0 &&
              c.printingType);
  }

  isSizesQuantityValid(): boolean {
    const s = this.sizesQuantityData;
    if (!s) return false;
    return !!(this.selectedSizes && this.selectedSizes.length > 0 &&
              s.quantity >= 1 && s.quantity <= 150 &&
              s.targetPrice >= 1 &&
              s.durationValue >= 1 &&
              s.durationUnit);
  }
}
