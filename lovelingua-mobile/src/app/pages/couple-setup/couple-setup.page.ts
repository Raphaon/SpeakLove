import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { ApiService } from '../../core/services/api.service';

@Component({
  standalone: true,
  selector: 'app-couple-setup',
  imports: [
    FormsModule,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    RouterLink
  ],
  providers: [ApiService],
  template: `
    <ion-page>
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/dashboard"></ion-back-button>
          </ion-buttons>
          <ion-title>Mode couple</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Créer un couple</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Code couple (optionnel)</ion-label>
              <ion-input placeholder="LL-1234" [(ngModel)]="coupleCode"></ion-input>
            </ion-item>
            <ion-button expand="block" (click)="create()">Créer</ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>Rejoindre</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="stacked">Code couple</ion-label>
              <ion-input placeholder="LL-1234" [(ngModel)]="coupleCode"></ion-input>
            </ion-item>
            <ion-button expand="block" (click)="join()">Rejoindre</ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  `
})
export class CoupleSetupPage {
  coupleCode = '';

  constructor(private readonly api: ApiService) {}

  create(): void {
    // À implémenter : appel API createCouple
    void this.api;
  }

  join(): void {
    // À implémenter : appel API joinCouple
    void this.api;
  }
}
