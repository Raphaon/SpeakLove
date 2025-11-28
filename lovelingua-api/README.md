# LoveLingua API (Node.js + SQLite)

Squelette d'API REST conforme au cahier des charges : Express, SQLite, validation Zod et endpoints `/api/couples` et `/api/progress` de base.

## Scripts
- `npm run dev` : démarrage en développement (ts-node-dev).
- `npm run build` : compilation TypeScript.
- `npm start` : exécution du build.

## Points d'entrée
- `src/server.ts` : bootstrap Express + middlewares (Helmet, CORS, JSON, logs).
- `src/routes/couples.routes.ts` : création/rejoindre un couple (stubs SQLite à compléter).
- `src/routes/progress.routes.ts` : lecture et mise à jour d'XP (stubs).

## TODO
- Connecter une base SQLite via un DAO/ORM.
- Ajouter l'authentification device-id décrite dans le cahier des charges.
- Couvrir les autres routes (multijoueur, partner-quiz) sur le même pattern.
