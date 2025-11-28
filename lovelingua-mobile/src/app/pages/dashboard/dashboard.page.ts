import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
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
import { StorageService } from '../../core/services/storage.service';
import { UserProfile } from '../../core/models/user-profile.model';
import { UserProgress } from '../../core/models/user-progress.model';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    RouterLink
  ],
  providers: [StorageService],
  template: `
    <ion-page>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Dashboard</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Profil</ion-card-subtitle>
            <ion-card-title>{{ profile()?.firstName || 'Incomplet' }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Langage principal : {{ profile()?.primaryLanguage || 'À déterminer' }}</p>
            <ion-button size="small" routerLink="/profile-setup">Mettre à jour</ion-button>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-subtitle>Progression</ion-card-subtitle>
            <ion-card-title>Niveau {{ progress()?.level ?? 1 }}</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>XP total : {{ progress()?.totalXp ?? 0 }}</p>
            <ion-button size="small" routerLink="/quiz">Lancer un quiz</ion-button>
          </ion-card-content>
        </ion-card>

        <div class="actions">
          <ion-button routerLink="/couple-setup" expand="block">Mode couple</ion-button>
          <ion-button routerLink="/multiplayer" expand="block" fill="outline">Multijoueur</ion-button>
        </div>
      </ion-content>
    </ion-page>
  `,
  styles: [
    `
      ion-card {
        margin: 12px;
      }
      .actions {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `
  ]
})
export class DashboardPage implements OnInit {
  profile = signal<UserProfile | null>(null);
  progress = signal<UserProgress | null>(null);

  constructor(private readonly storage: StorageService) {}

  async ngOnInit(): Promise<void> {
    this.profile.set(await this.storage.loadProfile());
    this.progress.set((await this.storage.loadProgress()) ?? {
      userId: this.profile()?.id ?? '',
      level: 1,
      currentLevelXp: 0,
      nextLevelXp: 100,
      totalXp: 0,
      stats: { quizCompleted: 0, questsCompleted: 0, daysStreak: 0, lastActivity: new Date().toISOString() }
    });
  }
}
