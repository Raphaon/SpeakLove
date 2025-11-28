
  # Love Languages App / LoveLingua Monorepo

  Ce dépôt contient :
  - l'app web React/Vite (racine) utilisée pour les premières expérimentations,
  - un squelette mobile **Ionic/Angular** dans `lovelingua-mobile` (conforme au cahier des charges Android/Capacitor),
  - un squelette **API Node.js + SQLite** dans `lovelingua-api`.

  ## App web (racine)
  - `npm install` puis `npm run dev` pour démarrer Vite.
  - `npm run build` pour générer le bundle (sortie `build/`).

  ## Mobile Ionic/Angular
  1. `cd lovelingua-mobile && npm install`.
  2. Configurez `src/environments/environment.ts` (`apiBaseUrl`) pour le backend local.
  3. `npm run start` pour lancer l'app ; `npm run android` pour synchroniser le projet Capacitor.

  ## API Node.js / SQLite
  1. `cd lovelingua-api && npm install`.
  2. Démarrez en dev avec `npm run dev` (ts-node-dev) ou générez via `npm run build` puis `npm start`.
  3. Ajoutez un fichier `.env` (voir `lovelingua-api/.env.example`) pour définir le port et le chemin SQLite.
  