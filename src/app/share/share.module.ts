import { NgModule } from '@angular/core';
import { ContainerComponent } from './components/container/container.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ContainerComponent,
    InputComponent,
    TableComponent
  ],
  exports: [
    ContainerComponent,
    InputComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
  ],
})
export class ShareModule {}
