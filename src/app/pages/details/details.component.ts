import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PokemonService } from 'src/app/core/service/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon.model';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButtons, IonBackButton,  } from '@ionic/angular/standalone';


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
    IonBackButton
  ],
})
export class DetailsComponent  implements OnInit {
  pokemon: Pokemon | null = null;
  constructor(private route: ActivatedRoute, private pokeService: PokemonService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name')!;

    this.pokeService.getPokemonByName(name).subscribe(res => (this.pokemon = res));

  }

}
