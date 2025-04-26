import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 10;
  @Input() maxPagesToShow: number = 5;

  @Output() pageChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  totalPages: number = 1;

  ngOnInit(): void {
    this.calculateTotalPages();
  }

  ngOnChanges(): void {
    this.calculateTotalPages();
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  getPages(): number[] {
    const pages: number[] = [];
    let startPage = Math.max(1, this.currentPage - Math.floor(this.maxPagesToShow / 2));
    let endPage = Math.min(this.totalPages, startPage + this.maxPagesToShow - 1);

    if (endPage - startPage + 1 < this.maxPagesToShow) {
      startPage = Math.max(1, endPage - this.maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  getEndItem(): number {
    const end = this.currentPage * this.itemsPerPage;
    return end > this.totalItems ? this.totalItems : end;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageChanged.emit(page);
    }
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage + 1);
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.calculateTotalPages();
    this.pageSizeChanged.emit(this.itemsPerPage);
  }
}