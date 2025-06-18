import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Pokemon } from '../../models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private _storage: Storage | null = null;
  private readonly key = 'favorites';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = this._storage ?? await this.storage.create(); // previne duplo create
  }

  async get(): Promise<Pokemon[]> {
    return (await this._storage?.get(this.key)) || [];
  }

  async add(pokemon: Pokemon) {
    const list = await this.get();
    list.push(pokemon);
    await this._storage?.set(this.key, list);
  }

  async remove(name: string) {
    const list = (await this.get()).filter(p => p.name !== name);
    await this._storage?.set(this.key, list);
  }

  async isFavorite(name: string): Promise<boolean> {
    const list = await this.get();
    return list.some(p => p.name === name);
  }
}
