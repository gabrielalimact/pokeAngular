import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    IonicStorageModule.forRoot(),
    HttpClient,
    IonicModule,
    RouterModule,
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
