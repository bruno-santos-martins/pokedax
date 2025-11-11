import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokemonService, PokemonDetail } from '../../core/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent {
  count: number = 0;
  listaDeOpcoes: any[] = [];
  data: any[] = [];
  currentPage = 0;

  pageSize = 16;
  titles: string[] = ['Nome', 'Tipo'];
  modalOpen = false;
  selectedPokemon: any = null;

  constructor(private http: HttpClient, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPage(1);
    this.listAllPokemons();
  }

  loadPage(page: number, pokemon: string | null = null) {
    this.currentPage = page;
    if (pokemon) {
      this.pokemonService.getPokemon(pokemon).subscribe({
        next: (poke: PokemonDetail) => {
          this.data = [poke];
          this.count = 1;
        },
        error: (err) => console.error(err)
      });
    } else {
      const offset = (page - 1) * this.pageSize;
      this.pokemonService.getPokemonsPage(offset, this.pageSize).subscribe({
        next: (list: PokemonDetail[]) => {
          this.data = list;
          this.http.get<any>(`https://pokeapi.co/api/v2/pokemon`).subscribe({
            next: (res) => this.count = res.count,
            error: (e) => console.error(e)
          });
        },
        error: (err) => console.error(err)
      });
    }
  }

  listAllPokemons = () => {
    this.pokemonService.getAllPokemonOptions().subscribe({
      next: (options: any[]) => {
        this.listaDeOpcoes = options;
        console.log('Lista completa de Pokémons carregada:', this.listaDeOpcoes);
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
}
