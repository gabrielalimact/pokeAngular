import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heartOutline } from 'ionicons/icons';
import { FavoritesService } from 'src/app/core/service/favorites.service';
import { NavigationService } from 'src/app/core/service/navigation.service';

@Component({
  standalone: true,
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonLabel,
    RouterModule,
    CommonModule,
    IonButtons,
    IonBackButton,
    IonIcon,
    IonButton,
  ],
})
export class DetailsComponent  implements OnInit {
  pokemon: Pokemon | null = null;
  favoriteMap: { [key: string]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokemonService,
    private favoritesService: FavoritesService,
    public navigationService: NavigationService
  ) {
    addIcons({
      heartOutline: heartOutline,
    });
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.pokeService.getPokemonByName(name).subscribe(async (res) => {
      this.pokemon = res;

      const isFav = await this.favoritesService.isFavorite(res.name);
      this.favoriteMap[res.name] = isFav;
    });
  }

  async toggleFavorites(pokemon: Pokemon) {
    const isFav = await this.favoritesService.isFavorite(pokemon.name);
    if (isFav) {
      await this.favoritesService.remove(pokemon.name);
      this.favoriteMap[pokemon.name] = false;
    } else {
      await this.favoritesService.add(pokemon);
      this.favoriteMap[pokemon.name] = true;
    }
  }
}
