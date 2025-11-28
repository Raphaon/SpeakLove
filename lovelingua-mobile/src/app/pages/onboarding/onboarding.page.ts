import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-onboarding',
  imports: [IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonText, RouterLink],
  template: `
    <ion-page>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>LoveLingua</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <div class="content">
          <ion-text>
            <h1>Bienvenue</h1>
            <p>Découvrez votre langage de l'amour et progressez hors ligne.</p>
          </ion-text>
          <ion-button expand="block" routerLink="/profile-setup">Commencer</ion-button>
          <ion-button fill="clear" routerLink="/dashboard">Accéder au tableau de bord</ion-button>
        </div>
      </ion-content>
    </ion-page>
  `,
  styles: [
    `
      .content {
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    `
  ]
})
export class OnboardingPage {
  constructor(private readonly router: Router) {}

  continue(): void {
    this.router.navigate(['/profile-setup']);
  }
}
