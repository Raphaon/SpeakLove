import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
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
import { StorageService } from '../../core/services/storage.service';
import { computeResult, SAMPLE_QUESTIONS } from '../../core/data/questions';

@Component({
  standalone: true,
  selector: 'app-quiz',
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
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    RouterLink
  ],
  providers: [StorageService],
  template: `
    <ion-page>
      <ion-header translucent>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-back-button defaultHref="/dashboard"></ion-back-button>
          </ion-buttons>
          <ion-title>Quiz</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-card>
          <ion-card-header>
            <ion-card-title>Vos réponses</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item *ngFor="let question of questions; let i = index">
                <ion-label>
                  <h3>{{ question.text }}</h3>
                  <p>Intensité : {{ answers[question.languageId] ?? 0 }}</p>
                </ion-label>
                <ion-button size="small" (click)="increment(question.languageId)">+1</ion-button>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
        <div class="actions">
          <ion-button expand="block" (click)="completeQuiz()">Valider</ion-button>
          <ion-button fill="clear" routerLink="/dashboard">Retour</ion-button>
        </div>
      </ion-content>
    </ion-page>
  `,
  styles: [
    `
      .actions {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
    `
  ]
})
export class QuizPage {
  questions = SAMPLE_QUESTIONS;
  answers: Record<string, number> = {};

  constructor(private readonly storage: StorageService, private readonly router: Router) {}

  increment(languageId: string): void {
    this.answers = { ...this.answers, [languageId]: (this.answers[languageId] ?? 0) + 1 };
  }

  async completeQuiz(): Promise<void> {
    const result = computeResult(this.answers);
    await this.storage.saveResult(result);
    await this.storage.saveProgress({
      userId: result.userId,
      level: 1,
      currentLevelXp: 10,
      nextLevelXp: 100,
      totalXp: 10,
      stats: { quizCompleted: 1, questsCompleted: 0, daysStreak: 1, lastActivity: new Date().toISOString() }
    });
    this.router.navigate(['/results'], { state: { result } });
  }
}
