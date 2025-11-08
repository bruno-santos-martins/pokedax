# AutocompleteComponent

Campo de busca com sugestões automáticas.

## Selector
```html
<app-autocomplete [options]="listaDeOpcoes" label="Pesquisar Pokémon" (valueChange)="onSelecionaPokemon($event)"></app-autocomplete>
```

## Inputs
| Nome     | Tipo    | Descrição                                 |
|----------|---------|-------------------------------------------|
| options  | array   | Lista de opções para autocomplete         |
| label    | string  | Label do campo                            |
| inputSize| string  | Tamanho do input: 'small', 'medium', 'large'|

## Outputs
| Nome   | Tipo         | Descrição                |
|--------|--------------|--------------------------|
| valueChange | EventEmitter | Emite valor selecionado ou null |

## Uso
Ideal para buscas rápidas e seleção de opções.
