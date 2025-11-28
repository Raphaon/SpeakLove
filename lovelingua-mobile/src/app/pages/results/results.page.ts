import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { TestResult } from '../../core/models/test-result.model';

@Component({
  standalone: true,
  selector: 'app-results',
  imports: [
    CommonModule,
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
    IonCardSubtitle,
    IonCardContent,
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
          <ion-title>Résultat</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Langage principal</ion-card-subtitle>
            <ion-card-title>{{ result?.primaryLanguage || 'À définir' }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Scores : {{ result?.scores | json }}</p>
            <ion-button expand="block" routerLink="/dashboard">Continuer</ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  `
})
export class ResultsPage implements OnInit {
  result: TestResult | undefined;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    this.result = (nav?.extras?.state as { result?: TestResult } | undefined)?.result;
  }
}
