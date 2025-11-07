import { NgModule } from '@angular/core';
import { ContainerComponent } from './components/container/container.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    ContainerComponent,
    InputComponent,
    TableComponent,
    AutocompleteComponent
  ],
  exports: [
    ContainerComponent,
    InputComponent,
    TableComponent,
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
})
export class ShareModule {}
