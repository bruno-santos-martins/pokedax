# InputComponent

Componente de input customizado para formulários.

## Selector
```html
<app-input [label]="'Nome'" [(ngModel)]="nome"></app-input>
```

## Inputs
| Nome   | Tipo    | Descrição                |
|--------|---------|--------------------------|
| label  | string  | Label do campo           |
| type   | string  | Tipo do input (opcional) |
| value  | any     | Valor do input           |

## Outputs
| Nome   | Tipo         | Descrição                |
|--------|--------------|--------------------------|
| valueChange | EventEmitter | Emite novo valor      |

## Uso
Ideal para formulários reativos ou template-driven.
