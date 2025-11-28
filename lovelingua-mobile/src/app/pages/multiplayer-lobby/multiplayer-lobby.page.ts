import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
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
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-multiplayer-lobby',
  imports: [
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
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    RouterLink
  ],
  template: `
    <ion-page>
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/dashboard"></ion-back-button>
          </ion-buttons>
          <ion-title>Multijoueur</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Salon actif</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item lines="none">
                <ion-label>Cette section affichera les parties et invitations.</ion-label>
              </ion-item>
            </ion-list>
            <ion-button expand="block">Créer une partie</ion-button>
            <ion-button expand="block" fill="outline">Rejoindre</ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  `
})
export class MultiplayerLobbyPage {}
