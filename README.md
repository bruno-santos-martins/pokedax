<div align="center">

# Pokedax

Uma Pokédex moderna construída em Angular, com lista paginada, busca por autocomplete e modal com informações completas (About + Evolutions).

[![Angular](https://img.shields.io/badge/Angular-13.3-red?logo=angular&logoColor=white)](https://angular.io/) 
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![RxJS](https://img.shields.io/badge/RxJS-7.x-B7178C?logo=reactivex&logoColor=white)](https://rxjs.dev/) 
[![SASS](https://img.shields.io/badge/Sass-hotpink.svg?logo=sass&logoColor=white)](https://sass-lang.com/) 
[![PokéAPI](https://img.shields.io/badge/API-Pok%C3%A9API-yellow)](https://pokeapi.co/)

</div>

## ✨ Destaques

- Lista de Pokémons paginada com cards responsivos
- Busca por autocomplete integrada à PokéAPI
- Modal com abas: About (altura, peso, habilidades) e Evolution (cadeia completa)
- Cores dinâmicas por tipo (SASS + classes utilitárias)
- Layout suave e consistente, com Navbar fixa e visual “glassy”

## 🖼️ Screenshots

> Home (listagem e busca)

![Home](image-1.png)

> Card e base stats (exemplo)

![Detalhe](image-2.png)

## Acessar URL

> https://pokedax-git-main-brmartins92s-projects.vercel.app/

## 🚀 Como rodar

Pré-requisitos: Node.js LTS e npm instalados.

1. Instale as dependências
	 - npm install
2. Rode em desenvolvimento
	 - npm start
3. Acesse em
	 - http://localhost:4200/

## 🧭 Rotas

- `/` Home: listagem, busca e modal de detalhes
- `/sobre` Sobre: informações do projeto e stack utilizada

## 🧩 Principais componentes

- `share/components/navbar` – Navbar fixa com rotas para Home e Sobre
- `share/components/autocomplete` – Campo de busca com sugestões
- `share/components/table` – Tabela/lista paginada de Pokémons
- `share/components/pokemon-card` – Card com imagem, tipo, número e stats
- `share/components/modal-pokemon` – Modal com “About” (altura, peso, abilities) e “Evolution”

## 🏗️ Arquitetura em alto nível

- Angular 13 + TypeScript + RxJS
- Serviço central de dados: `core/services/pokemon.service.ts` (lista, detalhe, cadeia de evolução)
- Estilos com SASS; classes por tipo para cores/coerência visual
- Data flow enxuto: tabela → card → modal via um único objeto de dados

## 📁 Estrutura (resumo)

```
src/
	app/
		app.module.ts
		app-routing.module.ts
		pages/
			home/
				home.component.ts|html|sass
			sobre/
				sobre.component.ts|html|sass
		share/
			components/
				navbar/
				autocomplete/
				table/
				pokemon-card/
				modal-pokemon/
		core/
			services/
				pokemon.service.ts
```

## 📌 Roadmap (ideias futuras)

- Favoritar Pokémons (localStorage)
- Filtros por tipo/geração
- Animações extras na transição do modal
- Testes unitários de serviço e componentes principais

## 🤝 Contribuindo

Sinta-se à vontade para abrir issues e PRs com melhorias, correções ou novas ideias.

---

Feito com ❤️ utilizando Angular, TypeScript e a PokéAPI.


