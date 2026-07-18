import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AddProposal } from '../add-proposal/add-proposal';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { OfferService } from '../../services/offer.service';
import { environment } from '../../environments/environment.prod';


export interface Design {
  id: string;
  name: string;
  description: string;
  customerId: string;
  rawCustomerId: string;
  date: string;
  status: 'saved' | 'proposed' | 'none';
  price: string;
  quantity: string;
  image: string;
  rawPrice: number;
  rawQuantity: number;
  rawDate: number;
}

@Component({
  selector: 'app-browse-designs',
  imports: [Footer, Header, FormsModule, AddProposal],
  templateUrl: './browse-designs.html',
  styleUrl: './browse-designs.css',
})
export class BrowseDesigns implements OnInit {
  allDesigns: Design[] = [];
  currentPage: number = 1;
  pageSize: number = 8;

  searchQuery: string = '';
  isSortOpen: boolean = false;
  sortBy: 'newest' | 'lowest-price' | 'highest-price' | 'lowest-pieces' | 'highest-pieces' = 'newest';
  selectedDesignId: string | null = null;

  private offerService = inject(OfferService);

  get sortByLabel(): string {
    const labels = {
      'newest': 'Newest',
      'lowest-price': 'Lowest Price',
      'highest-price': 'Highest Price',
      'lowest-pieces': 'Lowest Pieces',
      'highest-pieces': 'Highest Pieces'
    };
    return labels[this.sortBy];
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadPublishedDesigns();
  }

  loadPublishedDesigns(): void {
    this.offerService.getAllPublishedDesigns().subscribe({
      next: (res) => {
        // First pass: build the cards with available data
        const mapped: Design[] = (res || []).map(item => {
          let priceText = 'EGP 0/pc';
          if (item.maxPrice) {
            priceText = `EGP ${item.maxPrice}/pc`;
          }

          let quantityText = '0 pc';
          if (item.amount) {
            quantityText = `${item.amount} pc`;
          }

          let dateStr = 'Recently';
          const targetDateStr = item.publishedAt || item.createdAt;
          if (targetDateStr) {
            const targetDate = new Date(targetDateStr);
            const now = new Date();
            const diffMs = now.getTime() - targetDate.getTime();
            const diffMins = Math.floor(diffMs / 60000);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);

            if (diffMins < 60) {
              dateStr = `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
            } else if (diffHours < 24) {
              dateStr = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            } else {
              dateStr = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
            }
          }

          const targetImages = item.designImages || item.images;
          let imgUrl = 'shirt.png';
          if (targetImages && targetImages.length > 0) {
            const img = targetImages[0];
            if (img.startsWith('http://') || img.startsWith('https://') || img.startsWith('data:')) {
              imgUrl = img;
            } else {
              const cleanImg = img.startsWith('/') ? img.substring(1) : img;
              imgUrl = `${environment.apiUrl}/${cleanImg}`;
            }
          }

          const rawDateMs = item.publishedAt ? new Date(item.publishedAt).getTime() : 0;

          return {
            id: item.publishedOfferID || item.customerPublishedOfferId || item.id || '',
            name: item.designName || item.name || 'Untitled Design',
            description: item.description || 'No description provided.',
            customerId: item.customerId ? `Customer #${item.customerId.substring(0, 6)}` : 'Customer',
            rawCustomerId: item.customerId || '',
            date: dateStr,
            status: (item.status === 'saved' || item.status === 'proposed') ? item.status : 'none',
            price: priceText,
            quantity: quantityText,
            image: imgUrl,
            rawPrice: item.maxPrice || 0,
            rawQuantity: item.amount || 0,
            rawDate: rawDateMs
          };
        });

        this.allDesigns = mapped;

        // Second pass: fetch the real designName from details for each published offer
        const detailRequests = mapped.map((design, i) =>
          design.id
            ? this.offerService.getPublishedDesignDetails(design.id, true).pipe(
              catchError(() => of(null))
            )
            : of(null)
        );

        forkJoin(detailRequests).subscribe(details => {
          details.forEach((detail, i) => {
            if (detail && (detail.designName || detail.name)) {
              this.allDesigns[i] = {
                ...this.allDesigns[i],
                name: detail.designName || detail.name || this.allDesigns[i].name
              };
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching published designs:', err);
      }
    });
  }


  get filteredDesigns(): Design[] {
    let designs = [...this.allDesigns];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      designs = designs.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.customerId.toLowerCase().includes(query)
      );
    }

    if (this.sortBy === 'newest') {
      designs.sort((a, b) => b.rawDate - a.rawDate);
    } else if (this.sortBy === 'lowest-price') {
      designs.sort((a, b) => a.rawPrice - b.rawPrice);
    } else if (this.sortBy === 'highest-price') {
      designs.sort((a, b) => b.rawPrice - a.rawPrice);
    } else if (this.sortBy === 'lowest-pieces') {
      designs.sort((a, b) => a.rawQuantity - b.rawQuantity);
    } else if (this.sortBy === 'highest-pieces') {
      designs.sort((a, b) => b.rawQuantity - a.rawQuantity);
    }

    return designs;
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

  changeSort(sortType: 'newest' | 'lowest-price' | 'highest-price' | 'lowest-pieces' | 'highest-pieces'): void {
    this.sortBy = sortType;
    this.currentPage = 1;
  }

  goToPage(page: number | string): void {
    if (typeof page === 'number') {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }



  currentView: 'list' | 'proposal' = 'list';

  selectedDesign: Design | null = null;

  onViewDesign(design: Design): void {
    this.selectedDesignId = design.id;
    this.selectedDesign = design;
    this.currentView = 'proposal';
  }

  showListAgain(): void {
    this.currentView = 'list';
  }

  toggleSortDropdown(): void {
    this.isSortOpen = !this.isSortOpen;
  }


  selectSort(sortType: 'newest' | 'lowest-price' | 'highest-price' | 'lowest-pieces' | 'highest-pieces'): void {
    this.sortBy = sortType;
    this.isSortOpen = false;
    this.currentPage = 1;

  }
}