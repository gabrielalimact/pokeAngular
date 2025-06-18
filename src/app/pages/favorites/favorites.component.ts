import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonItem, IonList, IonItemSliding, IonThumbnail, IonText, IonItemOption, IonItemOptions, IonLabel, IonBackButton } from '@ionic/angular/standalone';
import { FavoritesService } from 'src/app/core/service/favorites.service';
import { NavigationService } from 'src/app/core/service/navigation.service';
import { Pokemon } from 'src/app/models/pokemon.model';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonItem,
    IonList,
    IonLabel,
    IonItemSliding,
    IonThumbnail,
    IonItemOption,
    IonItemOptions,
  ],
})
export class FavoritesComponent implements OnInit {
  favorites: Pokemon[] = [];

  constructor(private favService: FavoritesService, public navigationService: NavigationService) {}

  async ngOnInit() {
    this.favorites = await this.favService.get();
  }

  async ionViewWillEnter() {
    this.favorites = await this.favService.get(); // garante atualização ao voltar à aba
  }

  async removeFromFavorites(name: string) {
    await this.favService.remove(name);
    this.favorites = await this.favService.get();
  }
}
