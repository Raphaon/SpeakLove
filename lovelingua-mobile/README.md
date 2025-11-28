# LoveLingua Mobile (Ionic Angular + Capacitor)

Ce dossier contient un squelette prêt à étendre pour l'application mobile LoveLingua décrite dans le cahier des charges. Il est conçu pour Android avec Ionic 7, Angular 16 (standalone components), Capacitor et SQLite côté appareil, ainsi qu'un backend Node.js/SQLite prévu pour la synchronisation.

## Structure
- `src/app/app.component.ts` : shell Ionic (`ion-app` + `ion-router-outlet`).
- `src/app/app.routes.ts` : routage Angular/Ionic avec lazy loading des pages clés.
- `src/app/pages/*` : pages principales (onboarding, profil, dashboard, quiz, résultats, couple, multijoueur).
- `src/app/core/models` : interfaces métier réutilisant les types du cahier des charges.
- `src/app/core/services` : services Angular avec API HTTP + stockage local/SQLite (stubs prêts à compléter).
- `src/app/core/data` : données statiques de démarrage (questions, suggestions) pour l'offline-first.
- `src/theme/variables.scss` et `src/global.scss` : theming Ionic et styles globaux.
- `capacitor.config.ts` / `ionic.config.json` : configuration mobile Capacitor/Ionic.

## Scripts
- `npm run start` : démarrage dev (Angular + Ionic HMR).
- `npm run build` : build de l'app pour la production web/PWA.
- `npm run android` : build + synchronisation Capacitor Android (`npx cap sync android`).
- `npm run lint` : ESLint.
- `npm run test` : tests unitaires (Jasmine/Karma placeholder, à remplacer par votre stack préférée).

## Étapes de prise en main
1. `cd lovelingua-mobile` puis `npm install` (offline-ready si le cache est disponible).
2. `npm run start` pour lancer l'UI.
3. `npm run android` pour générer/synchroniser le projet Android.
4. Connecter les services à l'API Node (voir `core/services`).

## Notes
- Les services utilisent des hooks placeholders pour SQLite via Capacitor (`@capacitor-community/sqlite`) et Ionic Storage : implémentez les appels réels selon votre plugin.
- Les pages utilisent uniquement des composants Ionic de base pour garantir la compatibilité mobile et l'accessibilité de départ.
- Le backend Node décrit dans le cahier des charges peut vivre dans un dossier séparé (`lovelingua-api`).
