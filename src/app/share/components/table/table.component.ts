import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonCardData } from '../pokemon-card/pokemon-card.component';
import { PokemonService } from 'src/app/core/services/pokemon.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent {
  @Input() titles: string[] = [];
  @Input() data: Array<{ [key: string]: any }> = [];
  @Input() pageSize: number = 1;
  @Input() count: number = 0;
  @Input() currentPage: number = 1;
  @Input() cardAdapter?: (row: any) => PokemonCardData;
  @Output() pageChange = new EventEmitter<number>();
  @Output() selectPokemon = new EventEmitter<PokemonCardData>();

  constructor(private pokemonService: PokemonService) {}

  get totalPages(): number {
    return this.count > 0 ? Math.ceil(this.count / this.pageSize) : Math.ceil(this.data.length / this.pageSize);
  }

  get paginatedData(): Array<{ [key: string]: any }> {
    // Para paginação vinda do servidor (data já é apenas a página atual),
    // não aplicar slice para não esvaziar a lista quando currentPage > 1
    if (this.count > 0 && this.data.length <= this.pageSize) {
      return this.data;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    return this.data.slice(start, start + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  toCard(row: any): PokemonCardData {
    if (this.cardAdapter) {
      return this.cardAdapter(row);
    }
    // Mapeamento padrão para dados no formato da PokeAPI, com fallbacks simples
    const number = row.number ?? row.id ?? 0;
    const name = row.name ?? row.title ?? '';
    const type = row.type ?? row.types?.[0]?.type?.name ?? 'normal';
    const image = row.image
      ?? row.sprites?.other?.['official-artwork']?.front_default
      ?? row.sprites?.front_default
      ?? '';
    const description = row.description ?? '';

    const stats: PokemonCardData['stats'] = Array.isArray(row.stats)
      ? row.stats.map((s: any) => {
          const label = s.label ?? s.stat?.name ?? '';
          const value = s.value ?? s.base_stat ?? 0;
          return { label, value };
        })
      : undefined;


    const evolutions: PokemonCardData['evolutions'] = Array.isArray(row.evolutions)
      ? row.evolutions.map((e: any) => ({
          name: e.name ?? '',
          image:
            e.image ?? e.sprites?.other?.['official-artwork']?.front_default ?? e.sprites?.front_default ?? ''
        }))
      : undefined;

    return { number, name, type, image, description, stats, evolutions } as PokemonCardData;
  }

  onCardSelected(card: PokemonCardData) {
    this.selectPokemon.emit(card);
  }
}
