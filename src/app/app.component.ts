import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
    .pipe(
      // 1️⃣ Quando chega a lista, mapeia cada item pra uma nova requisição
      switchMap((res) => {
        this.count = res.count;
        const requests = res.results.map((item: any) => {
          const id = this.extractIdFromUrl(item.url);
          return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${item.name}`).pipe(
            map(poke => ({
              name: poke.name,
              number: id,
              type: poke.types[0].type.name,
              image: poke.sprites.other['official-artwork'].front_default,
              stats: poke.stats.map((s: any) => ({
                label: s.stat.name,
                value: s.base_stat
              }))
            }))
          );
        });
        // 2️⃣ Espera todas as requisições terminarem
              return forkJoin<any[]>(requests);
      })
    )
    // 3️⃣ Quando tudo terminar, atribui os dados
          .subscribe({
            next: (pokemons: any[]) => {
       if (Array.isArray(pokemons)) {
          this.data = pokemons;
          console.log('Pokémons carregados:', this.data);
        } else {
          console.error('Erro: pokemons não é um array', pokemons);
        }
      },
      error: (err) => console.error(err)
    });
}

  listaDeOpcoes = [
    { label: 'Bulbasaur', value: 'bulbasaur' },
    { label: 'Ivysaur', value: 'ivysaur' },
    { label: 'Venusaur', value: 'venusaur' },
    { label: 'Charmander', value: 'charmander' },
    { label: 'Charmeleon', value: 'charmeleon' },
    { label: 'Charizard', value: 'charizard' },
    { label: 'Squirtle', value: 'squirtle' },
    { label: 'Wartortle', value: 'wartortle' },
    { label: 'Blastoise', value: 'blastoise' },
    { label: 'Caterpie', value: 'caterpie' },
    { label: 'Metapod', value: 'metapod' },
    { label: 'Butterfree', value: 'butterfree' },
    { label: 'Weedle', value: 'weedle' },
    { label: 'Kakuna', value: 'kakuna' },
    { label: 'Beedrill', value: 'beedrill' },
    { label: 'Pidgey', value: 'pidgey' },
    { label: 'Pidgeotto', value: 'pidgeotto' },
    { label: 'Pidgeot', value: 'pidgeot' },
    { label: 'Rattata', value: 'rattata' },
    { label: 'Raticate', value: 'raticate' }
  ];



  onSelecionaPokemon(valor: any) {
    // valor é o value da opção selecionada
    console.log('Selecionado:', valor);
  }

  // Extrai o último número de uma URL como "https://pokeapi.co/api/v2/pokemon/14/" => 14
  extractIdFromUrl(url: string): number {
    const match = url?.match(/\/(\d+)\/?$/);
    return match ? Number(match[1]) : 0;
  }

}
