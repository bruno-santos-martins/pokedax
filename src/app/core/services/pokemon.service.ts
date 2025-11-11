import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { POKEAPI_BASE_URL } from '../infrastructure/pokeapi.constants';

export interface PokemonDetail {
  name: string;
  number: number;
  type: string;
  image: string;
  stats: { label: string; value: number }[];
  height?: number;
  weight?: number;
  abilities?: string[];
  types?: string[];
  evolutions?: { name: string; image: string; number?: number }[];
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private baseUrl = POKEAPI_BASE_URL;

  constructor(private http: HttpClient) {}

  getPokemon(nameOrId: string | number): Observable<PokemonDetail> {
    return this.http
      .get<any>(`${this.baseUrl}/pokemon/${nameOrId}`)
      .pipe(map((poke) => this.mapPokemon(poke)));
  }

  getPokemonsPage(offset: number, limit: number): Observable<PokemonDetail[]> {
    return this.http
      .get<any>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`)
      .pipe(
        switchMap((res) => {
          const requests = res.results.map((item: any) =>
            this.http.get<any>(item.url).pipe(map((p) => this.mapPokemon(p)))
          );
          return forkJoin<PokemonDetail[]>(requests);
        })
      );
  }

  getAllPokemonOptions(): Observable<Array<{ label: string; value: string }>> {
    return this.http
      .get<any>(`${this.baseUrl}/pokemon?offset=0&limit=10000`)
      .pipe(
        map((res: any) =>
          (res.results || []).map((item: any) => ({
            label: item.name,
            value: item.name,
          }))
        )
      );
  }

  // Retorna toda a cadeia de evoluções (base -> estágios seguintes) a partir do Pokémon informado (nome ou id)
  getPokemonEvolutionChain(nameOrId: string | number): Observable<PokemonDetail[]> {
    // 1) species para descobrir a URL da cadeia
    return this.http.get<any>(`${this.baseUrl}/pokemon-species/${nameOrId}`).pipe(
      switchMap((species: any) => this.http.get<any>(species.evolution_chain.url)),
      switchMap((chainRes: any): Observable<PokemonDetail[]> => {
        const speciesNames: string[] = [];

        const traverse = (node: any) => {
          if (!node) return;
          if (node.species?.name) speciesNames.push(node.species.name);
          if (Array.isArray(node.evolves_to)) node.evolves_to.forEach(traverse);
        };
        traverse(chainRes.chain);

        if (speciesNames.length === 0) {
          return new Observable<PokemonDetail[]>((observer) => {
            observer.next([]);
            observer.complete();
          });
        }

        const requests = speciesNames.map((nm) =>
          this.http.get<any>(`${this.baseUrl}/pokemon/${nm}`).pipe(map((p) => this.mapPokemon(p)))
        );
        return forkJoin<PokemonDetail[]>(requests);
      })
    );
  }

  private mapPokemon(poke: any): PokemonDetail {
    return {
      name: poke.name,
      number: poke.id,
      type: poke.types?.[0]?.type?.name ?? 'normal',
      image:
        poke.sprites?.other?.['official-artwork']?.front_default ??
        poke.sprites?.front_default ??
        '',
      stats:
        poke.stats?.map((s: any) => ({
          label: s.stat.name,
          value: s.base_stat,
        })) ?? [],
      height: poke.height,
      weight: poke.weight,
      abilities: poke.abilities?.map((a: any) => a.ability?.name) ?? [],
      types: poke.types?.map((t: any) => t.type?.name) ?? [],
      // evolutions preenchidas sob demanda (ex.: ao clicar no card)
    };
  }
}
