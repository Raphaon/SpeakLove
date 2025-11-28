# LoveLingua API (Node.js + SQLite)

API REST Express + SQLite conforme au cahier des charges : sécurisée par Helmet/CORS, validation Zod et persistance concrète des couples et de la progression utilisateur.

## Scripts
- `npm run dev` : démarrage en développement (ts-node-dev).
- `npm run build` : compilation TypeScript.
- `npm start` : exécution du build.

## Configuration
- Copiez `.env.example` en `.env` et ajustez :
  - `PORT` : port HTTP (par défaut 3000)
  - `SQLITE_PATH` : chemin du fichier SQLite (création automatique)
  - `CORS_ORIGIN` : origine autorisée pour l'app mobile/web (séparées par virgule si plusieurs)
  
Le schéma SQLite est initialisé au démarrage (`couples`, `user_progress`).

## Points d'entrée
- `src/server.ts` : bootstrap Express + middlewares (Helmet, CORS, JSON, logs) et initialisation SQLite.
- `src/db.ts` : helpers SQLite (connexion, création de tables, helpers async).
- `src/routes/couples.routes.ts` : création/rejoindre un couple avec persistance SQLite et lecture d'un couple.
- `src/routes/progress.routes.ts` : lecture et mise à jour d'XP persistante (niveau calculé + stats).

## TODO
- Ajouter l'authentification device-id décrite dans le cahier des charges.
- Couvrir les autres routes (multijoueur, partner-quiz) sur le même pattern.
