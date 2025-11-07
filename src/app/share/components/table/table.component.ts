import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  @Input() titles: string[] = [];
  @Input() data: Array<{ [key: string]: any }> = [];
  @Input() pageSize: number = 5;
  @Input() count: number = 0;
  @Input() currentPage: number = 1;
  //@Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return this.count > 0 ? Math.ceil(this.count / this.pageSize) : Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedData(): Array<{ [key: string]: any }> {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
