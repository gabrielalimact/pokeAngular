import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { Pokemon, PokemonList } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  pokemonList: Pokemon[] = [];
  offset: number = 0;
  limit: number = 20;

  constructor(private pokeService: PokemonService) { }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokeService.getAllPokemons(this.offset, this.limit).subscribe((data) => {
      this.pokemonList = data.results;
      console.log(data);
    });
  }

}
