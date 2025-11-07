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

  pokemonData = {
    number: 25,
    name: 'Pikachu',
    type: 'electric',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    description: 'Pikachu armazena eletricidade nas bochechas e libera em ataques.',
    stats: [
      { label: 'HP', value: 35 },
      { label: 'Ataque', value: 55 },
      { label: 'Defesa', value: 40 }
    ],
    evolutions: [
      { name: 'Pichu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/172.png' },
      { name: 'Pikachu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png' },
      { name: 'Raichu', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/26.png' }
    ]
  };

  onSelecionaPokemon(valor: any) {
    // valor é o value da opção selecionada
    console.log('Selecionado:', valor);
  }

}
