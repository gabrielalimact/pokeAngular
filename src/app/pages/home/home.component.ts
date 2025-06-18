import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonInfiniteScroll, IonInfiniteScrollContent, IonRow, IonCol, IonCardContent, IonGrid, IonButtons, IonButton, IonIcon, IonItem, IonList, IonPopover } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menuOutline, heartOutline, heart } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Pokemon, PokemonList } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    IonContent,
    IonIcon,
    IonButtons,
    IonButton,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    RouterModule,
    CommonModule,
    IonRow,
    IonCol,
    IonCardContent,
    IonGrid,
    IonItem,
    IonList,
    IonPopover,
  ],
})
export class HomeComponent  implements OnInit {
  pokemons: Pokemon[] = [];
  offset = 0;
  limit = 20;

  constructor(private pokeService: PokemonService) {
    addIcons({
      menuOutline: menuOutline,
      heartOutline: heartOutline,
      heart: heart,
    });
  }

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    this.pokeService.getAllPokemons(this.offset, this.limit).subscribe((res: PokemonList) => {
      const calls = res.results.map((p: any) =>
        this.pokeService.getPokemonByName(p.name)
      );

      forkJoin<Pokemon[]>(calls).subscribe((data) => {
        this.pokemons.push(...data);
        this.offset += this.limit;
        if (event) event.target.complete();
      });
    });
  }

  goToFavorites() {
    console.log('Navigating to favorites');
    // Implement navigation to favorites page
    // this.router.navigate(['/favorites']);
  }
}
