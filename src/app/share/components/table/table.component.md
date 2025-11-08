# TableComponent

Componente de tabela/grid para exibir uma lista de Pokémons em cards.

## Selector
```html
<app-table [data]="data" [titles]="titles" [count]="count" [pageSize]="pageSize" [currentPage]="currentPage" (pageChange)="loadPage($event)"></app-table>
```

## Inputs
| Nome        | Tipo    | Descrição                        |
|-------------|---------|----------------------------------|
| data        | array   | Lista de dados dos Pokémons       |
| titles      | array   | Títulos das colunas (opcional)    |
| count       | number  | Total de itens para paginação     |
| pageSize    | number  | Itens por página                  |
| currentPage | number  | Página atual                      |

## Outputs
| Nome       | Tipo         | Descrição                |
|------------|--------------|--------------------------|
| pageChange | EventEmitter | Emite número da página   |

## Uso
Ideal para exibir cards paginados e controlar navegação.
