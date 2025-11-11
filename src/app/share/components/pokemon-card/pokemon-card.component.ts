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
  host: { '(click)': 'onClick()' }
})
export class PokemonCardComponent {
  @Input() data!: PokemonCardData;
  @Output() select = new EventEmitter<PokemonCardData>();

  constructor(private pokemonService: PokemonService) {}



  onClick() {

    if (this.data) {
      console.log("card");

      this.pokemonService.getPokemonEvolutionChain(this.data.number).subscribe(evolutions => {
        const evoList = evolutions.map((evo, idx) => ({
          name: evo.name,
          image: evo.image,
          order: idx + 1
        }));
        const cardWithEvo: PokemonCardData = { ...this.data, evolutions: evoList };
        console.log('Evoluções carregadas:', cardWithEvo.evolutions);
        this.select.emit(cardWithEvo);
      });
    }
  }
}
