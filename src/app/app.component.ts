import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  constructor(private http: HttpClient) {}

  count: number = 0;
  listaDeOpcoes: any[] = [];
  data: any[] = [];
  currentPage = 0;

  pageSize = 16;
  titles: string[] = ['Nome', 'Tipo'];
  modalOpen = false;
  selectedPokemon: any = null;

  ngOnInit() {
    this.loadPage(1);
    this.listAllPokemons();
  }

  loadPage(page: number, pokemon: string | null = null) {
    this.currentPage = page;

    let source$: Observable<any[]>;

    if (pokemon) {
      // 🔍 Busca de um único Pokémon
      source$ = this.http
        .get<any>(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .pipe(
          map((poke) => {
            // você pode usar poke.id direto ou manter seu extractIdFromUrl se quiser
            const id = poke.id;

            const mapped = {
              name: poke.name,
              number: id,
              type: poke.types[0].type.name,
              image: poke.sprites.other['official-artwork'].front_default,
              stats: poke.stats.map((s: any) => ({
                label: s.stat.name,
                value: s.base_stat,
              })),
            };

            // 🔁 importante: retornar ARRAY pra bater com o fluxo original
            return [mapped];
          })
        );
      // opcional: ajustar o count quando for busca
      this.count = 1;
    } else {
      // 📄 Paginação normal
      const offset = (page - 1) * this.pageSize;

      source$ = this.http
        .get<any>(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${this.pageSize}`
        )
        .pipe(
          switchMap((res) => {
            this.count = res.count;

            const requests = res.results.map((item: any) => {
              const id = this.extractIdFromUrl(item.url);

              return this.http
                .get<any>(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
                .pipe(
                  map((poke) => ({
                    name: poke.name,
                    number: id,
                    type: poke.types[0].type.name,
                    image: poke.sprites.other['official-artwork'].front_default,
                    stats: poke.stats.map((s: any) => ({
                      label: s.stat.name,
                      value: s.base_stat,
                    })),
                  }))
                );
            });

            return forkJoin<any[]>(requests);
          })
        );
    }

    source$.subscribe({
      next: (pokemons: any[]) => {
        if (Array.isArray(pokemons)) {
          this.data = pokemons;
        } else {
          console.error('Erro: pokemons não é um array', pokemons);
        }
      },
      error: (err: any) => console.error(err),
    });
  }

  listAllPokemons = () => {
    this.http
      .get<any>('https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000')
      .pipe(
        map((res) =>
          res.results.map((item: any) => ({
            label: item.name,
            value: item.name,
          }))
        )
      )
      .subscribe({
        next: (options) => {
          this.listaDeOpcoes = options;
          console.log(
            'Lista completa de Pokémons carregada:',
            this.listaDeOpcoes
          );
        },
        error: (err) => console.error(err),
      });
  };

  onSelecionaPokemon(valor: any) {
    if (valor) {
      this.loadPage(1, valor);
    } else {
      this.loadPage(1);
    }
  }

  onPokemonSelected(card: any) {
    this.selectedPokemon = card;
    this.modalOpen = true;
  }

  // Extrai o último número de uma URL como "https://pokeapi.co/api/v2/pokemon/14/" => 14
  extractIdFromUrl(url: string): number {
    const match = url?.match(/\/(\d+)\/?$/);
    return match ? Number(match[1]) : 0;
  }
}
