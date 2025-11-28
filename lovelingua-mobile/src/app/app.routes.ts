import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/onboarding/onboarding.page').then((m) => m.OnboardingPage)
  },
  {
    path: 'profile-setup',
    loadComponent: () => import('./pages/profile-setup/profile-setup.page').then((m) => m.ProfileSetupPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage)
  },
  {
    path: 'quiz',
    loadComponent: () => import('./pages/quiz/quiz.page').then((m) => m.QuizPage)
  },
  {
    path: 'results',
    loadComponent: () => import('./pages/results/results.page').then((m) => m.ResultsPage)
  },
  {
    path: 'couple-setup',
    loadComponent: () => import('./pages/couple-setup/couple-setup.page').then((m) => m.CoupleSetupPage)
  },
  {
    path: 'multiplayer',
    loadComponent: () =>
      import('./pages/multiplayer-lobby/multiplayer-lobby.page').then((m) => m.MultiplayerLobbyPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
