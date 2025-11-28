import { Component, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import { StorageService } from '../../core/services/storage.service';
import { UserProfile } from '../../core/models/user-profile.model';

@Component({
  standalone: true,
  selector: 'app-profile-setup',
  imports: [
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    RouterLink
  ],
  providers: [StorageService],
  template: `
    <ion-page>
      <ion-header translucent>
        <ion-toolbar>
          <ion-title>Profil</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content fullscreen>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Prénom</ion-label>
            <ion-input
              placeholder="Alex"
              [value]="profile().firstName"
              (ionInput)="onNameChange($event.detail.value)"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Genre</ion-label>
            <ion-select
              interface="action-sheet"
              [value]="profile().gender"
              (ionChange)="profile.update((prev) => ({ ...prev, gender: $event.detail.value }))"
            >
              <ion-select-option value="female">Femme</ion-select-option>
              <ion-select-option value="male">Homme</ion-select-option>
              <ion-select-option value="other">Autre</ion-select-option>
            </ion-select>
          </ion-item>
          <ion-item>
            <ion-label position="stacked">Statut</ion-label>
            <ion-input
              placeholder="En couple"
              [value]="profile().relationshipStatus"
              (ionInput)="profile.update((prev) => ({ ...prev, relationshipStatus: $event.detail.value }))"
            ></ion-input>
          </ion-item>
        </ion-list>
        <div class="actions">
          <ion-button expand="block" (click)="saveProfile()">Enregistrer</ion-button>
          <ion-button fill="clear" routerLink="/dashboard">Passer</ion-button>
        </div>
      </ion-content>
    </ion-page>
  `,
  styles: [
    `
      ion-list {
        margin-top: 12px;
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
export class ProfileSetupPage {
  profile = signal<UserProfile>({
    id: '',
    firstName: '',
    birthDate: '',
    gender: 'other',
    relationshipStatus: '',
    createdAt: new Date().toISOString()
  });

  primaryLanguage = computed(() => this.profile().primaryLanguage);

  constructor(private readonly storage: StorageService, private readonly router: Router) {}

  onNameChange(value: string | null | undefined): void {
    this.profile.update((prev) => ({ ...prev, firstName: value ?? '' }));
  }

  async saveProfile(): Promise<void> {
    const current = this.profile();
    await this.storage.saveProfile({
      ...current,
      id: current.id || crypto.randomUUID(),
      primaryLanguage: this.primaryLanguage() ?? 'undetermined'
    });
    this.router.navigate(['/dashboard']);
  }
}
