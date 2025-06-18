import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  goToFavorites() {
    this.router.navigate(['/favorites']);
  }

  goToDetails(name: string) {
    this.router.navigate(['/details', name]);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
