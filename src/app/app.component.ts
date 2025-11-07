import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  @Input() count: number = 0;
  @Input() currentPage: number = 1;

  data: any[] = [];

  pageSize = 30;


  titles = ['Nome', 'Tipo'];

  ngOnInit() {
    this.loadPage(1);
  }

  loadPage(page: number) {
    const offset = (page - 1) * this.pageSize;
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.pageSize}`)
      .subscribe(res => {
        this.data = res.results.map((item: any) => ({
          Nome: item.name,
          URL: item.url
        }));
        this.count = res.count;
        this.currentPage = page;
      });
  }

}
