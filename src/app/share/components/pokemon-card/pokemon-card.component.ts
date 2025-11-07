import { Component, Input } from '@angular/core';

export interface PokemonCardData {
  number: number;
  name: string;
  type: string;
  image: string;
  description?: string;
  stats?: { label: string; value: number }[];
  evolutions?: { name: string; image: string }[];
}

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.sass']
})
export class PokemonCardComponent {
  @Input() data!: PokemonCardData;
}
