import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface AutocompleteOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.sass']
})
export class AutocompleteComponent {
  @Input() options: AutocompleteOption[] = [];
  @Input() label: string = '';
  @Input() inputSize: 'small' | 'medium' | 'large' = 'medium';
  @Output() valueChange = new EventEmitter<any>();

  searchText: string = '';
  filteredOptions: AutocompleteOption[] = [];
  showDropdown: boolean = false;

  ngOnInit() {
    this.filteredOptions = this.options;
  }

  onInputChange() {
    const text = this.searchText.toLowerCase();
    this.filteredOptions = this.options.filter(opt => opt.label.toLowerCase().includes(text));
    this.showDropdown = !!text && this.filteredOptions.length > 0;
  }

  selectOption(option: AutocompleteOption) {
    this.searchText = option.label;
    this.valueChange.emit(option.value);
    this.showDropdown = false;
  }

  onBlur() {
    setTimeout(() => this.showDropdown = false, 200);
  }
}
