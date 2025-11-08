import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(nameOrId: string): Observable<PokemonDetail> {
    return this.http.get<any>(`${this.baseUrl}/${nameOrId}`).pipe(
      map(poke => this.mapPokemon(poke))
    );
  }

  getPokemonsPage(offset: number, limit: number): Observable<PokemonDetail[]> {
    return this.http.get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`).pipe(
      switchMap(res => {
        const requests = res.results.map((item: any) => this.http.get<any>(item.url).pipe(map(p => this.mapPokemon(p))));
        return forkJoin<PokemonDetail[]>(requests);
      })
    );
  }

  getAllPokemonOptions(): Observable<Array<{ label: string; value: string }>> {
    return this.http
      .get<any>(`${this.baseUrl}?offset=0&limit=10000`)
      .pipe(
        map((res: any) => (res.results || []).map((item: any) => ({
          label: item.name,
          value: item.name,
        })))
      );
  }

  private mapPokemon(poke: any): PokemonDetail {
    return {
      name: poke.name,
      number: poke.id,
      type: poke.types?.[0]?.type?.name ?? 'normal',
      image: poke.sprites?.other?.['official-artwork']?.front_default ?? poke.sprites?.front_default ?? '',
      stats: poke.stats?.map((s: any) => ({ label: s.stat.name, value: s.base_stat })) ?? [],
      height: poke.height,
      weight: poke.weight,
      abilities: poke.abilities?.map((a: any) => a.ability?.name) ?? [],
      types: poke.types?.map((t: any) => t.type?.name) ?? []
    };
  }
}
