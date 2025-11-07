import { NgModule } from '@angular/core';
import { ContainerComponent } from './components/container/container.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

@NgModule({
  declarations: [
    ContainerComponent,
    InputComponent,
    TableComponent,
    AutocompleteComponent,
    PokemonCardComponent
  ],
  exports: [
    ContainerComponent,
    InputComponent,
    TableComponent,
    AutocompleteComponent,
    PokemonCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class ShareModule {}
