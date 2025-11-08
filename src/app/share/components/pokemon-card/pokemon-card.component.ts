import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  styleUrls: ['./pokemon-card.component.sass'],
  host: { '(click)': 'onClick()' }
})
export class PokemonCardComponent {
  @Input() data!: PokemonCardData;
  @Output() select = new EventEmitter<PokemonCardData>();

  onClick() {
    if (this.data) {
      this.select.emit(this.data);
      console.log(this.data);
    }
  }
}
