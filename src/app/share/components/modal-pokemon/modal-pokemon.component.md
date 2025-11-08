# ModalPokemonComponent

Componente modal para exibir detalhes de um Pokémon em destaque, incluindo abas de informações, stats e evolução.

## Selector
```html
<app-modal-pokemon [open]="true" [pokemon]="pokemonData" (close)="onClose()"></app-modal-pokemon>
```

## Inputs
| Nome     | Tipo    | Descrição                                                        |
|----------|---------|------------------------------------------------------------------|
| `open`   | boolean | Controla a visibilidade do modal. `true` exibe, `false` oculta.   |
| `pokemon`| object  | Objeto com os dados do Pokémon a ser exibido no modal.            |

### Exemplo de objeto `pokemon`
```ts
{
  name: 'bulbasaur',
  number: 1,
  typeColor: '#78C850',
  types: ['grass', 'poison'],
  image: 'url',
  height: 0.7,
  weight: 6.9,
  abilities: ['Overgrow', 'Chlorophyll'],
  stats: [
    { label: 'hp', value: 45 },
    { label: 'attack', value: 49 },
    // ...
  ]
}
```

## Outputs
| Nome   | Tipo         | Descrição                                 |
|--------|--------------|-------------------------------------------|
| `close`| EventEmitter | Emitido ao clicar no botão de fechar modal|

## Funcionalidades
- Exibe nome, número, tipos, imagem e abas (About, Base Stats, Evolution)
- Troca de abas sem recarregar o modal
- Fecha ao clicar no botão X

## Uso
```html
<app-modal-pokemon
  [open]="modalOpen"
  [pokemon]="selectedPokemon"
  (close)="modalOpen = false">
</app-modal-pokemon>
```

## Observações
- O modal inicia sempre na aba "About" ao ser aberto.
- O componente deve ser declarado e exportado no módulo compartilhado (`ShareModule`).
