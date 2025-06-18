import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonThumbnail, IonRow, IonCol, IonCardContent, IonGrid} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonThumbnail,
    RouterModule, CommonModule, IonRow, IonCol, IonCardContent, IonGrid
  ],
})
export class HomeComponent  implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;

  constructor(private pokeService: PokemonService) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokeService.getAllPokemons(this.offset, this.limit).subscribe(res => {
      const calls = res.results.map((p: any) =>
        this.pokeService.getPokemonByName(p.name)
      );

      forkJoin(calls).subscribe(data => {
        this.pokemons.push(...data);
        console.log('Pokémons carregados até agora:', this.pokemons);
        if (event) event.target.complete();
        this.offset += this.limit;
      });
    });
  }
}
