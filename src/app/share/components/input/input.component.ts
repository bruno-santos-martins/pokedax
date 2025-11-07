import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent {
  @Input() type: 'text' | 'search' = 'text';
  @Input() label: string = '';
  @Input() labelSize: string = '1rem';
  @Input() inputSize: string = '100%';
}
