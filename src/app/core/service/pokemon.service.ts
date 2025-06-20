import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pokemon, PokemonList } from "src/app/models/pokemon.model";

@Injectable({
  providedIn: "root",
})

export class PokemonService {
  private apiUrl = "https://pokeapi.co/api/v2/";

  constructor(private http: HttpClient) {}

  getAllPokemons(offset = 0, limit = 20) {
    return this.http.get<PokemonList>(`${this.apiUrl}pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}pokemon/${name}`);
  }
}
