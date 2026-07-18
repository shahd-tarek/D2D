import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { PublishStateService } from '../publish/publish-state.service';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { AuthService } from '../../../services/auth.service';
import { OfferService } from '../../../services/offer.service';
import { DesignService } from '../../../services/design.service';
import { environment } from '../../../environments/environment.prod';

export interface Design {
  id: string;
  name: string;
  createdAt: string;
  publishedAt: string | null;
  status: 'draft' | 'in-progress' | 'published';
  images: string[];
  offerId?: string | null;
}

@Component({
  selector: 'app-my-designs',
  standalone: true,
  imports: [CommonModule, Header, Footer], 
  templateUrl: './my-designs.component.html',
  styleUrl: './my-designs.component.css',
})
export class MyDesignsComponent implements OnInit {
  allDesigns: Design[] = [];
  currentPage: number = 1;
  pageSize: number = 12;
  selectedStatus: 'all' | 'draft' | 'in-progress' | 'published' = 'all';
  searchQuery: string = '';

  showDeleteConfirmModal: boolean = false;
  designIdToDelete: string | null = null;

  private publishStateService = inject(PublishStateService);

  showDraftConfirmModal: boolean = false;
  designToDraft: Design | null = null;

  private router = inject(Router);
  private authService = inject(AuthService);
  private designService = inject(DesignService);
  private offerService = inject(OfferService);

  ngOnInit(): void {
    this.loadCustomerDesigns();
  }

  loadCustomerDesigns(): void {
    const customerId = this.authService.getUserId();
    if (!customerId) {
      console.warn('No active customer ID found.');
      return;
    }
    this.designService.getCustomerDesigns(customerId).subscribe({
      next: (res) => {
        this.allDesigns = res.map(item => {
          let mappedStatus: 'draft' | 'in-progress' | 'published' = 'draft';
          const stat = String(item.status || '').trim().toLowerCase();
          if (stat === 'published' || stat === 'open' || stat === '1') {
            mappedStatus = 'published';
          } else if (stat === 'draft' || stat === '0') {
            mappedStatus = 'draft';
          } else if (stat === 'in-progress' || stat === 'completed') {
            mappedStatus = 'in-progress';
          }

          const localOfferId = localStorage.getItem('offer_id_' + item.id);
          let mappedOfferId = localOfferId || (item as any).offerId || (item as any).offerID || (item as any).OfferId || (item as any).publishedDesignId || null;
          if (mappedOfferId === item.id) {
            mappedOfferId = null;
            localStorage.removeItem('offer_id_' + item.id);
          }

          return {
            id: item.id,
            name: item.name,
            createdAt: item.createdAt,
            publishedAt: item.publishedAt,
            status: mappedStatus,
            images: item.images || [],
            offerId: mappedOfferId
          };
        });

        // Ensure currentPage doesn't exceed total pages after reload
        if (this.currentPage > this.totalPages && this.currentPage > 1) {
          this.currentPage = this.totalPages;
        }
      },
      error: (err) => {
        console.error('Error loading customer designs:', err);
      }
    });
  }

  resolveImageUrl(images: string[]): string {
    if (!images || images.length === 0) {
      return 'shirt.png';
    }
    const img = images[0];
    if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
      return img;
    }
    const cleanImg = img.startsWith('/') ? img.substring(1) : img;
    return `${environment.apiUrl}/${cleanImg}`;
  }

  get countAll(): number { return this.allDesigns.length; }
  get countDraft(): number { return this.allDesigns.filter(d => d.status === 'draft').length; }
  get countInProgress(): number { return this.allDesigns.filter(d => d.status === 'in-progress').length; }
  get countPublished(): number { return this.allDesigns.filter(d => d.status === 'published').length; }

  get filteredDesigns(): Design[] {
    let designs = this.allDesigns;
    if (this.selectedStatus !== 'all') {
      designs = designs.filter(d => d.status === this.selectedStatus);
    }
    if (this.searchQuery && this.searchQuery.trim().length > 0) {
      const q = this.searchQuery.toLowerCase().trim();
      designs = designs.filter(d => {
        const nameLower = d.name.toLowerCase();
        if (nameLower.startsWith(q)) {
          return true;
        }
        const words = nameLower.split(/[\s-_]+/);
        return words.some(word => word.startsWith(q));
      });
    }
    return designs;
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value || '';
    this.currentPage = 1;
  }

  get paginatedDesigns(): Design[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredDesigns.slice(startIndex, startIndex + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredDesigns.length / this.pageSize);
  }

  get visiblePages(): (number | string)[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const visible: (number | string)[] = [];

    if (total <= 5) {
      for (let i = 1; i <= total; i++) {
        visible.push(i);
      }
      return visible;
    }

    if (current <= 3) {
      visible.push(1, 2, 3, '...', total);
    } else if (current >= total - 2) {
      visible.push(1, '...', total - 2, total - 1, total);
    } else {
      visible.push(1, '...', current - 1, current, current + 1, '...', total);
    }

    return visible;
  }

  selectStatus(status: 'all' | 'draft' | 'in-progress' | 'published'): void {
    this.selectedStatus = status;
    this.currentPage = 1;
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number') {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }

  deleteDesign(id: string): void {
    this.designIdToDelete = id;
    this.showDeleteConfirmModal = true;
  }

  confirmDelete(): void {
    if (this.designIdToDelete) {
      this.designService.deleteDesign(this.designIdToDelete).subscribe({
        next: () => {
          this.showDeleteConfirmModal = false;
          this.designIdToDelete = null;
          this.loadCustomerDesigns();
        },
        error: (err) => {
          console.error('Error deleting design:', err);
          this.showDeleteConfirmModal = false;
          this.designIdToDelete = null;
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirmModal = false;
    this.designIdToDelete = null;
  }

  changeStatus(design: Design, newStatus: 'draft' | 'in-progress' | 'published'): void {
    design.status = newStatus;
  }

  onDraftDesign(design: Design): void {
    this.designToDraft = design;
    this.showDraftConfirmModal = true;
  }

  confirmDraftConvert(): void {
    if (this.designToDraft) {
      this.designService.publishedToDrafted(this.designToDraft.id).subscribe({
        next: () => {
          this.showDraftConfirmModal = false;
          this.designToDraft = null;
          this.loadCustomerDesigns();
        },
        error: (err) => {
          console.error('Error changing published design to draft:', err);
          this.showDraftConfirmModal = false;
          this.designToDraft = null;
        }
      });
    }
  }

  cancelDraftConvert(): void {
    this.showDraftConfirmModal = false;
    this.designToDraft = null;
  }

  openPublish(designId: string): void {
    const design = this.allDesigns.find(d => d.id === designId);
    const name = design ? design.name : '';
    if (design) {
      this.publishStateService.designImageUrl = this.resolveImageUrl(design.images);
    }
    this.router.navigate(['/customer/publish/details'], { queryParams: { id: designId, name: name } });
  }

  onViewDesign(id: string): void {
    this.router.navigate(['/customer/design-view'], { queryParams: { id: id, mode: 'view' } });
  }

  onEditDesign(id: string): void {
    this.router.navigate(['/customer/design-view'], { queryParams: { id: id, mode: 'edit' } });
  }

  goToStartDesign(): void {
    this.router.navigate(['/customer/start-design']);
  }
}