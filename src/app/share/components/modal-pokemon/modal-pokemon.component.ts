
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal-pokemon',
  templateUrl: './modal-pokemon.component.html',
  styleUrls: ['./modal-pokemon.component.sass']
})
export class ModalPokemonComponent implements OnChanges {
  @Input() pokemon: any;
  @Input() open: boolean = false;
  @Output() close = new EventEmitter<void>();

  activeTab: 'about' | 'base' | 'evo' = 'about';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open'] && this.open) {
      this.activeTab = 'about';
    }
  }

  onClose() {
    this.close.emit();
  }
}
