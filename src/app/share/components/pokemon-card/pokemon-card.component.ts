import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PokemonService } from 'src/app/core/services/pokemon.service';

export interface PokemonCardData {
  number: number;
  name: string;
  type: string;
  image: string;
  description?: string;
  stats?: { label: string; value: number }[];
  evolutions?: { name: string; image: string }[];
  height?: number;
  weight?: number;
  abilities?: string[];
  types?: string[];
}

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.sass'],
  host: { '(click)': 'onClick()' },
})
export class PokemonCardComponent {
  @Input() data!: PokemonCardData;
  @Output() select = new EventEmitter<PokemonCardData>();

  constructor(private pokemonService: PokemonService) {}

  onClick() {
    if (this.data) {
      console.log('card');

      this.pokemonService
        .getPokemonEvolutionChain(this.data.number)
        .subscribe((evolutions) => {
          const evoList = evolutions.map((evo, idx) => ({
            name: evo.name,
            image: evo.image,
            order: idx + 1,
          }));

          this.pokemonService
            .getPokemon(this.data.number)
            .subscribe((pokemonDetail) => {
              // Suporte para array de objetos ou strings
              const abilities: string[] = Array.isArray(pokemonDetail.abilities)
                ? (pokemonDetail.abilities as any[]).map((ab) =>
                    typeof ab === 'string'
                      ? ab
                      : ab.ability?.name || ab.name || ''
                  )
                : [];
              const height = pokemonDetail.height ? pokemonDetail.height  : 0;
              const weight = pokemonDetail.weight ? pokemonDetail.weight : 0;
              const types: string[] = Array.isArray(pokemonDetail.types)
                ? (pokemonDetail.types as any[]).map((t) =>
                    typeof t === 'string' ? t : t.type?.name || t.name || ''
                  )
                : [];
              // type (singular) para compatibilidade com classe dinâmica
              const type = types.length > 0 ? types[0] : '';
              const cardWithEvo: PokemonCardData = {
                ...this.data,
                evolutions: evoList,
                abilities,
                types,
                type,
                height,
                weight,
              };

              this.select.emit(cardWithEvo);
            });
        });
    }
  }
}
