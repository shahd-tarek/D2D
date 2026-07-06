import { Component, OnInit } from '@angular/core';
import { Footer } from "../../../components/footer/footer";
import { Header } from "../../../components/header/header";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AddProposal } from "../../../browse-designs/add-proposal/add-proposal";

export interface Design {
  id: number;
  name: string;
  description: string;
  customerId: string;
  date: string;
  status: 'saved' | 'proposed' | 'none'; 
  price: string;
  quantity: string;
  image: string;
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
  pageSize: number = 6; 

  selectedStatus: 'all' | 'saved' | 'proposed' = 'all';
  searchQuery: string = '';
  isSortOpen: boolean = false;
  sortBy: 'newest' | 'lowest-price' | 'highest-price' | 'lowest-pieces' | 'highest-pieces' = 'newest';
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

    for (let i = 1; i <= 24; i++) {

      let currentStatus: 'saved' | 'proposed' | 'none' = 'none';
      if (i % 5 === 0) currentStatus = 'saved';
      else if (i % 7 === 0) currentStatus = 'proposed';

      this.allDesigns.push({
        id: i,
        name: 'Oversized Sweatshirt',
        description: "I'm Looking for a manufacturer who can create this oversized sweatshirt with heigh-quality fabric and perfect finishing.",
        customerId: 'Customer #1036',
        date: '2 days ago',
        status: currentStatus,
        price: 'EGP 400/pc',
        quantity: '175 pc',
        image: 'shirt.png' 
      });
    }
  }


  get countAll(): number {
    return this.allDesigns.length;
  }
  get countSaved(): number {
    return this.allDesigns.filter(d => d.status === 'saved').length;
  }
  get countProposed(): number {
    return this.allDesigns.filter(d => d.status === 'proposed').length;
  }


  get filteredDesigns(): Design[] {
    let designs = [...this.allDesigns];


    if (this.selectedStatus !== 'all') {
      designs = designs.filter(d => d.status === this.selectedStatus);
    }


    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      designs = designs.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query) ||
        d.customerId.toLowerCase().includes(query)
      );
    }

    if (this.sortBy === 'newest') {
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

  selectStatus(status: 'all' | 'saved' | 'proposed'): void {
    this.selectedStatus = status;
    this.currentPage = 1; 
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

  // (Bookmark) 
  toggleSaveDesign(design: Design): void {
    design.status = design.status === 'saved' ? 'none' : 'saved';
  }

  currentView: 'list' | 'proposal' = 'list';

  onViewDesign(): void {
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