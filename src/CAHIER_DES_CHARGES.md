# 📋 CAHIER DES CHARGES - LOVELINGUA

## 📑 TABLE DES MATIÈRES

1. [Présentation du projet](#1-présentation-du-projet)
2. [Contexte et objectifs](#2-contexte-et-objectifs)
3. [Périmètre fonctionnel](#3-périmètre-fonctionnel)
4. [Spécifications fonctionnelles détaillées](#4-spécifications-fonctionnelles-détaillées)
5. [Spécifications techniques](#5-spécifications-techniques)
6. [Spécifications design et UX](#6-spécifications-design-et-ux)
7. [Architecture technique](#7-architecture-technique)
8. [Contraintes et exigences](#8-contraintes-et-exigences)
9. [Livrables](#9-livrables)
10. [Planning et phases](#10-planning-et-phases)

---

## 1. PRÉSENTATION DU PROJET

### 1.1 Nom du projet
**LoveLingua** - Application web des 5 langages de l'amour

### 1.2 Slogan
*"Le Duolingo de l'amour - Apprenez à aimer et être aimé"*

### 1.3 Description synthétique
LoveLingua est une application web progressive (PWA) permettant aux utilisateurs de découvrir leur langage d'amour principal parmi les 5 langages théorisés par Gary Chapman, d'obtenir des conseils personnalisés, et de renforcer leur relation de couple à travers des outils gamifiés et interactifs.

### 1.4 Public cible
- **Primaire** : Couples en relation (18-45 ans)
- **Secondaire** : Célibataires souhaitant mieux se connaître
- **Tertiaire** : Personnes en thérapie de couple

### 1.5 Problématique
- Manque de communication dans les couples
- Incompréhension des besoins émotionnels du partenaire
- Absence d'outils ludiques pour renforcer la relation
- Difficultés à exprimer et recevoir l'amour

### 1.6 Solution proposée
Une plateforme interactive combinant :
- Quiz personnalisé des 5 langages d'amour
- Suggestions de gestes adaptés au profil
- Mode couple avec gamification
- Questions pour conversations profondes
- Outils de suivi et progression

---

## 2. CONTEXTE ET OBJECTIFS

### 2.1 Objectifs business

#### Objectifs principaux
1. **Acquisition** : 10,000 utilisateurs actifs en 6 mois
2. **Engagement** : Taux de rétention de 40% à 30 jours
3. **Conversion** : 15% des utilisateurs en mode couple
4. **Viralité** : 25% de partage des résultats

#### Objectifs secondaires
1. Créer une communauté engagée
2. Établir LoveLingua comme référence des 5 langages
3. Monétisation future (premium features)

### 2.2 Objectifs utilisateurs

#### Pour les célibataires
- Découvrir son langage d'amour principal
- Mieux se connaître émotionnellement
- Préparer de futures relations

#### Pour les couples
- Comprendre le langage du partenaire
- Améliorer la communication
- Renforcer la connexion émotionnelle
- Maintenir la flamme au quotidien

### 2.3 KPIs (Indicateurs de performance)

| Indicateur | Objectif | Mesure |
|------------|----------|--------|
| Taux de complétion quiz | > 80% | Analytics |
| Temps moyen session | > 5 min | Analytics |
| Partages sociaux | > 25% | Tracking partage |
| Couples créés | > 15% | Base de données |
| Quêtes complétées | > 60% | Base de données |
| Streak moyen | > 7 jours | Calcul backend |
| NPS Score | > 50 | Sondage in-app |

---

## 3. PÉRIMÈTRE FONCTIONNEL

### 3.1 Fonctionnalités CORE (MVP)

#### ✅ Module Onboarding
- Introduction aux 5 langages
- Présentation de l'application
- Création de profil utilisateur
- Skip possible

#### ✅ Module Profil
- Prénom, date de naissance, genre
- Statut relationnel
- Modification du profil
- Paramètres de compte

#### ✅ Module Quiz Principal
- 15 questions aléatoires parmi 30
- Options mélangées
- Validation manuelle par question
- Barre de progression
- Calcul du langage dominant
- Sauvegarde des résultats

#### ✅ Module Résultats
- Affichage du langage principal
- Graphique des 5 langages
- Description détaillée
- Partage des résultats
- Actions suggérées

#### ✅ Module Dashboard
- Greeting personnalisé
- Affichage du langage principal
- Navigation vers modules
- Stats utilisateur
- Events temporaires

#### ✅ Module Suggestions
- Gestes adaptés au langage
- Filtres par type de relation
- Catégories de suggestions
- Favoris et historique

#### ✅ Module Questions Conversation
- 200+ questions classées
- Filtres par thème (relationnel, personnel, profond, etc.)
- Filtres par profondeur (surface, moyenne, profonde)
- Mode aléatoire
- Favoris

### 3.2 Fonctionnalités AVANCÉES

#### ✅ Mode Couple
- Création de lien couple
- Code de partage unique
- Synchronisation des profils
- Réservoir d'amour partagé (0-100%)
- Comparaison des langages

#### ✅ Système de Quêtes
- Quêtes quotidiennes personnalisées
- Basées sur le langage du partenaire
- Validation manuelle
- Historique des quêtes
- Impact sur réservoir d'amour

#### ✅ Gamification
- Système XP et niveaux
- Streaks (jours consécutifs)
- Badges et récompenses
- Events temporels (St-Valentin, etc.)
- Multiplicateurs XP

#### ✅ Quiz Couple (Partner Quiz)
- Questions sur la connaissance du partenaire
- Mode 2 joueurs
- Scoring et résultats
- Comparaison des réponses

#### ✅ Mode Multijoueur Questions
- Lobby de création
- Code de session
- Tour par tour
- Chat intégré
- Partage de questions

### 3.3 Fonctionnalités BONUS

#### ✅ Liste d'envies partagée
- Ajout de souhaits
- Catégories
- Partage avec partenaire
- Marquage comme "offert"

#### ✅ Check-in émotionnel
- Sélection humeur du jour
- Note émotionnelle
- Tracking historique
- Visualisation tendances

#### ✅ Coupons numériques
- Création de coupons personnalisés
- Envoi au partenaire
- Utilisation et validation
- Historique

#### ✅ Mur de gratitude
- Messages de gratitude
- Partage avec partenaire
- Archive des moments
- Export possible

#### ✅ Historique
- Tous les quiz passés
- Évolution des résultats
- Statistiques globales
- Export des données

#### ✅ Page Info
- Description des 5 langages
- Conseils par langage
- Ressources externes
- À propos de Gary Chapman

---

## 4. SPÉCIFICATIONS FONCTIONNELLES DÉTAILLÉES

### 4.1 Onboarding

#### Flux utilisateur
```
Arrivée sur app → Écran 1 (Bienvenue)
               → Écran 2 (5 langages)
               → Écran 3 (Outils couple)
               → Écran 4 (Commencer)
               → Setup profil
               → Dashboard
```

#### Spécifications
- **4 écrans** avec navigation par dots
- **Bouton "Passer"** sur écrans 1-3
- **Animations** : slide, bounce, fade
- **Sauvegarde** : localStorage `hasSeenOnboarding`
- **Progressive** : impossible de repasser l'onboarding

#### Contenu écrans

**Écran 1 - Bienvenue**
- Titre : "Bienvenue sur LoveLingua"
- Emoji : 💝
- 3 features avec icônes
- Gradient : pink-500 → pink-400

**Écran 2 - 5 Langages**
- Liste des 5 langages avec emojis
- Description courte
- Gradient : pink-400 → rose-400

**Écran 3 - Outils**
- Grille 2×2 des outils
- Emoji + titre + sous-titre
- Gradient : rose-400 → pink-300

**Écran 4 - Commencer**
- 4 étapes numérotées
- Call-to-action principal
- Gradient : pink-300 → pink-100

### 4.2 Setup Profil

#### Champs requis
1. **Prénom** (text, max 50 caractères)
2. **Date de naissance** (date picker)
3. **Genre** (3 options : Femme, Homme, Autre/Non-binaire)
4. **Statut relationnel** (6 options)

#### Options statut
- Célibataire
- En couple
- Fiancé(e)
- Marié(e)
- C'est compliqué
- Préfère ne pas dire

#### Validation
- Tous les champs obligatoires
- Date de naissance : max aujourd'hui
- Prénom : pas de caractères spéciaux
- Toast de confirmation

#### Sauvegarde
```javascript
{
  firstName: string,
  birthDate: string (ISO),
  gender: string,
  relationshipStatus: string,
  createdAt: string (ISO)
}
```

### 4.3 Quiz Principal

#### Structure
- **Pool** : 30 questions disponibles
- **Sélection** : 15 questions aléatoires
- **Mélange** : Questions et options
- **Durée** : ~5 minutes

#### Questions
Chaque question contient :
```javascript
{
  id: string,
  question: string,
  options: [
    { text: string, language: 'words' | 'time' | 'gifts' | 'acts' | 'touch' }
  ]
}
```

#### Mécanisme de réponse
1. Utilisateur sélectionne une option
2. Option s'illumine (border pink + bg pink-50)
3. Checkmark apparaît
4. Bouton "Suivant" activé
5. Clic sur "Suivant" → question suivante
6. Dernière question → "Terminer"

#### Calcul du résultat
```javascript
// Comptage par langage
scores = {
  words: count,
  time: count,
  gifts: count,
  acts: count,
  touch: count
}

// Langage dominant
primaryLanguage = max(scores)

// Pourcentages
percentages = scores / totalAnswers * 100
```

#### Sauvegarde
```javascript
{
  id: string,
  date: ISO string,
  scores: { [language]: count },
  primaryLanguage: string,
  primaryLanguageId: string
}
```

#### XP gagnée
- **Quiz complet** : +100 XP
- **Avec multiplicateur event** : +200-300 XP

### 4.4 Résultats

#### Affichage
1. **Hero card** : Emoji + nom langage + pourcentage
2. **Celebration** : Message de félicitations
3. **Description** : Texte détaillé du langage
4. **Tous résultats** : Graphiques des 5 langages
5. **Actions** : Suggestions et comparaison couple
6. **Bouton retour** : Dashboard

#### Partage
- **Web Share API** si disponible
- **Clipboard** sinon
- **Message** : "Mon langage d'amour principal est [emoji] [nom] !"
- **Toast** de confirmation

#### Graphiques
```
Langage 1 ████████████████░░░░ 80% (Principal)
Langage 2 ████████████░░░░░░░░ 60%
Langage 3 ██████░░░░░░░░░░░░░░ 30%
Langage 4 ████░░░░░░░░░░░░░░░░ 20%
Langage 5 ██░░░░░░░░░░░░░░░░░░ 10%
```

### 4.5 Dashboard

#### Sections

**1. Header**
- Logo LoveLingua
- Emoji 💕
- Icône profil (Trophy)
- Icône settings

**2. Greeting**
- "Bonjour/Bon après-midi/Bonsoir, [Prénom] ✨"
- Langage principal ou CTA quiz

**3. Event banner** (si actif)
- Nom de l'event
- Description
- Multiplicateur XP
- Emoji

**4. Progression utilisateur**
- Niveau actuel
- Barre XP (current/next)
- Streak jours consécutifs

**5. Stats couple** (si lié)
- Réservoir d'amour (%)
- Quêtes du jour (complétées/total)

**6. CTA Quiz** (si pas fait)
- Grande carte gradient
- "Découvrez votre langage d'amour"
- Bouton commencer

**7. Grille navigation** (2-3 colonnes)
- Quiz Couple
- Questions
- Mon Quiz (si déjà fait)
- Suggestions
- Mode Couple
- En savoir plus

### 4.6 Suggestions

#### Structure
```javascript
{
  id: string,
  language: string,
  category: string,
  relationshipType: string[],
  title: string,
  description: string,
  difficulty: 'facile' | 'moyen' | 'difficile',
  time: string
}
```

#### Filtres
1. **Par langage** : Tous, Words, Time, Gifts, Acts, Touch
2. **Par relation** : Tous, Couple, Amitié, Famille
3. **Par difficulté** : Toutes, Facile, Moyen, Difficile

#### Affichage
- **Cartes** : Titre + description + tags
- **Icône langage** : Emoji
- **Badge difficulté** : Couleur + texte
- **Temps estimé** : Badge secondaire

#### Actions
- **Favoris** : ❤️ (sauvegarde localStorage)
- **Partage** : Share API
- **Copie** : Clipboard

### 4.7 Questions Conversation

#### Pool
- **200+ questions** classées

#### Thèmes (9)
1. Relationnel
2. Personnel
3. Profond
4. Drôle
5. Rêves
6. Passé
7. Valeurs
8. Intimité
9. Futur

#### Profondeur (3)
1. **Surface** : Questions légères
2. **Moyenne** : Questions intéressantes
3. **Profonde** : Questions existentielles

#### Fonctionnalités
- **Filtres multiples** : Thème + profondeur
- **Mode aléatoire** : Question surprise
- **Favoris** : Sauvegarde
- **Historique** : Déjà vues
- **Partage** : Via Share API

### 4.8 Mode Couple

#### Création de lien
1. **Utilisateur A** crée le couple
   - Génère code unique (6 caractères)
   - Entre nom du partenaire
   - Partage le code

2. **Utilisateur B** rejoint
   - Entre le code
   - Confirme l'identité
   - Lien établi

#### Données couple
```javascript
{
  id: string,
  user1Id: string,
  user1Name: string,
  user2Id: string,
  user2Name: string,
  status: 'waiting' | 'linked',
  loveReservoir: number (0-100),
  dailyQuests: Quest[],
  createdAt: string
}
```

#### Réservoir d'amour
- **Initial** : 50%
- **Quête complétée** : +5 à +15%
- **Décroissance** : -2% par jour sans activité
- **Min/Max** : 0% - 100%
- **Couleurs** :
  - 80-100% : Vert (excellent)
  - 50-79% : Jaune (bien)
  - 0-49% : Rouge (attention)

#### Quêtes quotidiennes
- **Génération** : Chaque jour à minuit
- **Nombre** : 3 quêtes par personne
- **Basées sur** : Langage du PARTENAIRE
- **Validation** : Manuelle par utilisateur
- **Expiration** : 24h

**Exemples de quêtes** :
```
Langage Words :
- "Envoyez un message d'amour sincère"
- "Faites 3 compliments authentiques"
- "Écrivez une lettre de gratitude"

Langage Time :
- "Passez 30min de qualité ensemble"
- "Organisez une soirée sans écrans"
- "Faites une activité commune"

Langage Gifts :
- "Offrez un petit cadeau surprise"
- "Préparez leur plat préféré"
- "Achetez leur snack favori"

Langage Acts :
- "Faites une tâche à leur place"
- "Préparez leur café du matin"
- "Nettoyez un espace sans demande"

Langage Touch :
- "Faites un câlin de 30 secondes"
- "Massage de 10 minutes"
- "Tenez-vous la main pendant 15min"
```

### 4.9 Gamification

#### Système XP

**Actions et gains** :
| Action | XP de base | Avec event |
|--------|------------|------------|
| Quiz complété | 100 XP | 200 XP |
| Quête complétée | 20 XP | 40 XP |
| Streak 7 jours | 50 XP | 100 XP |
| Check-in quotidien | 10 XP | 20 XP |
| Question répondue | 5 XP | 10 XP |

#### Niveaux
```javascript
Level 1:  0 - 100 XP
Level 2:  100 - 250 XP
Level 3:  250 - 500 XP
Level 4:  500 - 1000 XP
Level 5:  1000 - 2000 XP
Level 6:  2000 - 3500 XP
Level 7:  3500 - 5500 XP
Level 8:  5500 - 8000 XP
Level 9:  8000 - 11000 XP
Level 10: 11000 - 15000 XP
Level 11+: +5000 XP par niveau
```

#### Streaks
- **Décompte** : Jours consécutifs avec activité
- **Activité** : Connexion + action (quête, quiz, etc.)
- **Reset** : Si 0 activité pendant 24h
- **Bonus** :
  - 7 jours : +50 XP
  - 30 jours : +200 XP + Badge
  - 100 jours : +500 XP + Badge spécial

#### Events temporels
```javascript
{
  id: 'valentine',
  name: 'Saint-Valentin',
  emoji: '💝',
  description: 'Gagnez le double de XP !',
  xpMultiplier: 2,
  startDate: '2024-02-10',
  endDate: '2024-02-15'
}
```

**Events** :
- Saint-Valentin (14 fév) : ×2 XP
- Noël (20-26 déc) : ×1.5 XP
- Anniversaire app : ×2 XP
- Weekend : ×1.2 XP (samedi-dimanche)

### 4.10 Quiz Couple (Partner Quiz)

#### Concept
Test de connaissance mutuelle du partenaire

#### Flux
1. **Lobby** : Création ou rejoindre session
2. **Waiting** : Attente du partenaire
3. **Game** : Questions alternées
4. **Results** : Score et comparaison

#### Questions
```javascript
{
  id: string,
  question: "Quelle est la couleur préférée de votre partenaire ?",
  type: 'text' | 'choice' | 'scale',
  options?: string[], // si type = choice
  category: string
}
```

**Catégories** :
- Préférences personnelles
- Histoire commune
- Connaissances intimes
- Rêves et ambitions
- Famille et amis

#### Scoring
- **Bonne réponse** : +10 points
- **Proche** : +5 points (si scale)
- **Fausse** : 0 point
- **Score parfait** : 100 points

#### Résultats
```
Score < 30%  : "À mieux se connaître 😅"
Score 30-60% : "Bien, mais peut mieux faire 😊"
Score 60-80% : "Excellente connaissance ! 💕"
Score > 80%  : "Couple fusionnel ! 🔥"
```

### 4.11 Multijoueur Questions

#### Architecture
- **Lobby** : Création + code partage
- **Session temps réel** : Polling toutes les 2s
- **Tour par tour** : Alternance joueurs
- **Chat** : Messages instantanés

#### Flux
1. **Joueur A** crée session → Code généré
2. **Joueur B** rejoint avec code
3. **Questions alternées** : A → B → A → B
4. **Chat** : Communication libre
5. **Fin** : Bouton quitter

#### Structure session
```javascript
{
  id: string,
  players: [
    { id: string, name: string },
    { id: string, name: string }
  ],
  questions: Question[],
  currentTurn: 0 | 1,
  messages: Message[],
  status: 'waiting' | 'active' | 'ended'
}
```

---

## 5. SPÉCIFICATIONS TECHNIQUES

### 5.1 Stack technique

#### Frontend
- **Framework** : React 18.x
- **Build Tool** : Vite 5.x
- **Language** : TypeScript 5.x
- **Routing** : React Router v6
- **Styling** : Tailwind CSS v4.0
- **Icons** : Lucide React
- **Notifications** : Sonner 2.0.3

#### Backend
- **Runtime** : Supabase Edge Functions (Deno)
- **Framework** : Hono.js
- **Database** : PostgreSQL (Supabase)
- **Storage** : Supabase Storage
- **Auth** : Supabase Auth (optionnel)

#### Infrastructure
- **Hosting** : Figma Make / Vercel / Netlify
- **CDN** : Automatique (hosting provider)
- **Database** : Supabase Cloud
- **Monitoring** : Supabase Dashboard

### 5.2 Architecture technique

#### Three-tier architecture
```
┌─────────────────┐
│    FRONTEND     │  React + Vite
│   (Navigateur)  │  
└────────┬────────┘
         │ HTTPS
         │
┌────────▼────────┐
│     SERVER      │  Hono + Deno
│  (Edge Function)│  
└────────┬────────┘
         │ SQL
         │
┌────────▼────────┐
│    DATABASE     │  PostgreSQL
│   (Supabase)    │  
└─────────────────┘
```

#### Frontend → Server
```javascript
fetch(`https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/route`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${publicAnonKey}`
  },
  body: JSON.stringify(data)
})
```

#### Server → Database
```javascript
import * as kv from './kv_store.tsx'

// Get
const value = await kv.get('key')

// Set
await kv.set('key', value)

// Multiple get
const values = await kv.mget(['key1', 'key2'])

// Get by prefix
const results = await kv.getByPrefix('couple_')
```

### 5.3 Base de données

#### Table principale : `kv_store_b0056f59`
```sql
CREATE TABLE kv_store_b0056f59 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Structure des clés
```javascript
// Users
user_{userId} → UserProfile

// Test results
test_{testId} → TestResult

// Couples
couple_{coupleId} → CoupleData

// User progress
progress_{userId} → UserProgress

// Quests
quest_{coupleId}_{date} → Quest[]

// Sessions (multiplayer)
session_{sessionId} → Session

// Partner quiz
partnerquiz_{sessionId} → PartnerQuizSession
```

### 5.4 Types TypeScript

#### UserProfile
```typescript
interface UserProfile {
  id: string;
  firstName: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  relationshipStatus: string;
  createdAt: string;
  coupleId?: string;
}
```

#### TestResult
```typescript
interface TestResult {
  id: string;
  date: string;
  scores: Record<string, number>;
  primaryLanguage: string;
  primaryLanguageId: string;
}
```

#### CoupleData
```typescript
interface CoupleData {
  id: string;
  user1Id: string;
  user1Name: string;
  user2Id?: string;
  user2Name?: string;
  status: 'waiting' | 'linked';
  loveReservoir: number;
  dailyQuests?: Quest[];
  createdAt: string;
}
```

#### UserProgress
```typescript
interface UserProgress {
  userId: string;
  level: number;
  currentLevelXP: number;
  nextLevelXP: number;
  totalXP: number;
  stats: {
    quizCompleted: number;
    questsCompleted: number;
    daysStreak: number;
    lastActivity: string;
  };
}
```

### 5.5 Routes API

#### Server routes (`/supabase/functions/server/index.tsx`)

**Prefix** : `/make-server-b0056f59`

**Routes** :
```javascript
// Couples
POST   /couple/create              → Créer couple
GET    /couple/:coupleId            → Récupérer couple
POST   /couple/:coupleId/join       → Rejoindre couple
POST   /couple/:coupleId/update-result → Update résultat quiz
POST   /couple/:coupleId/complete-quest → Valider quête

// User progress
GET    /progress/:userId            → Récupérer progression
POST   /progress/:userId/add-xp     → Ajouter XP

// Multiplayer
POST   /multiplayer/create          → Créer session
GET    /multiplayer/:sessionId      → Récupérer session
POST   /multiplayer/:sessionId/join → Rejoindre session
POST   /multiplayer/:sessionId/question → Ajouter question
POST   /multiplayer/:sessionId/message → Envoyer message

// Partner Quiz
POST   /partner-quiz/create         → Créer session
GET    /partner-quiz/:sessionId     → Récupérer session
POST   /partner-quiz/:sessionId/join → Rejoindre
POST   /partner-quiz/:sessionId/answer → Répondre
```

### 5.6 LocalStorage

#### Clés utilisées
```javascript
// Onboarding
'hasSeenOnboarding': 'true' | null

// User
'user_id': string
'user_profile': JSON(UserProfile)
'test_results': JSON(TestResult[])

// Couple
'couple_id': string | null
'cached_couple_data': JSON(CoupleData)

// Progress
'user_progress': JSON(UserProgress)
'cached_user_progress': JSON(UserProgress)

// Favorites
'favorite_suggestions': JSON(string[])
'favorite_questions': JSON(string[])
```

### 5.7 Performance

#### Cibles
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s
- **Lighthouse Score** : > 90
- **Bundle Size** : < 200KB (gzipped)

#### Optimisations
- **Code splitting** : React.lazy()
- **Tree shaking** : Vite automatique
- **Minification** : Production build
- **Caching** : Service Worker (PWA)
- **Images** : WebP + lazy loading
- **Fonts** : System fonts (pas de custom fonts)

---

## 6. SPÉCIFICATIONS DESIGN ET UX

### 6.1 Charte graphique

#### Couleurs primaires
```css
--pink-500: #E91E63   /* Principal CTA */
--rose-400: #FB7185   /* Secondaire */
--pink-50:  #FFF5F7   /* Background */
--pink-100: #FFE4E8   /* Cards hover */
```

#### Couleurs secondaires
```css
--gray-900: #111827   /* Texte principal */
--gray-600: #4B5563   /* Texte secondaire */
--gray-400: #9CA3AF   /* Texte disabled */
--gray-100: #F3F4F6   /* Borders */
```

#### Couleurs sémantiques
```css
--green-500: #10B981  /* Succès, bon niveau */
--yellow-500: #F59E0B /* Attention, moyen */
--red-500: #EF4444    /* Erreur, bas niveau */
--blue-500: #3B82F6   /* Info */
--purple-500: #8B5CF6 /* Mode couple */
--orange-500: #F97316 /* Streak */
```

#### Gradients
```css
/* Principal */
background: linear-gradient(to right, #E91E63, #FB7185);

/* Background */
background: linear-gradient(to bottom right, #FFF5F7, #FFE4E8);

/* Cards hover */
background: linear-gradient(to bottom right, #E91E63, #FB7185);
```

### 6.2 Typographie

#### Font stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
             'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
             'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
             sans-serif;
```

#### Échelle (Desktop)
```css
.text-xs:   12px / 1.5
.text-sm:   14px / 1.5
.text-base: 16px / 1.5
.text-lg:   18px / 1.5
.text-xl:   20px / 1.5
.text-2xl:  24px / 1.3
.text-3xl:  30px / 1.3
.text-4xl:  36px / 1.2
.text-5xl:  48px / 1.2
```

#### Échelle (Mobile iPhone SE)
```css
.text-xs:   10-12px
.text-sm:   12-14px
.text-base: 14-16px
.text-lg:   16-18px
.text-xl:   18-20px
.text-2xl:  20-24px
.text-3xl:  24-30px
```

#### Poids
```css
.font-normal:   400
.font-medium:   500
.font-semibold: 600
.font-bold:     700
```

### 6.3 Espacements

#### Mobile (< 640px)
```css
padding: 12px (p-3)
gap: 8px (gap-2)
margin: 12px (m-3)
```

#### Desktop (≥ 640px)
```css
padding: 24px (p-6)
gap: 16px (gap-4)
margin: 24px (m-6)
```

### 6.4 Composants UI

#### Boutons

**Primary** :
```css
background: linear-gradient(to right, #E91E63, #FB7185);
color: white;
padding: 12px 24px;
border-radius: 12px;
font-weight: 600;
transition: all 0.2s;

hover: scale(1.02) + shadow-xl
active: scale(0.98)
```

**Secondary** :
```css
background: white;
color: #E91E63;
border: 2px solid #E91E63;
padding: 12px 24px;
border-radius: 12px;
font-weight: 600;
```

**Ghost** :
```css
background: transparent;
color: #E91E63;
padding: 12px 24px;
hover: background #FFE4E8;
```

#### Cards
```css
background: white;
border-radius: 16px;
padding: 24px;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
transition: all 0.2s;

hover: box-shadow 0 8px 24px rgba(0,0,0,0.15);
```

#### Inputs
```css
background: #FFF5F7;
border: 2px solid transparent;
border-radius: 12px;
padding: 12px 16px;

focus: border-color #E91E63;
```

#### Progress bars
```css
background: #FFE4E8;
height: 8px;
border-radius: 999px;

fill: linear-gradient(to right, #E91E63, #FB7185);
```

### 6.5 Iconographie

#### Bibliothèque
**Lucide React** - Icons minimalistes et cohérents

#### Taille
- **Small** : 16px (w-4 h-4)
- **Medium** : 20px (w-5 h-5)
- **Large** : 24px (w-6 h-6)
- **XLarge** : 48px+ (hero sections)

#### Usage
```tsx
import { Heart, Sparkles, Users } from 'lucide-react';

<Heart className="w-5 h-5 text-pink-500" />
```

### 6.6 Animations

#### Transitions
```css
transition: all 200ms ease-in-out;
```

#### Hover effects
```css
hover:scale-[1.02]
hover:shadow-xl
```

#### Active effects
```css
active:scale-[0.98]
```

#### Animations keyframes
- **bounce** : Emojis onboarding
- **pulse** : Backgrounds
- **slide-in** : Cards apparition
- **fade-in** : Contenus

### 6.7 Responsive Design

#### Breakpoints Tailwind
```css
sm:  640px  (Small tablets)
md:  768px  (Tablets)
lg:  1024px (Desktop)
xl:  1280px (Large desktop)
2xl: 1536px (Extra large)
```

#### Stratégie Mobile-First
```tsx
// Base = Mobile (320-640px)
className="text-sm"

// Tablet et plus
className="text-sm md:text-base"

// Desktop
className="text-sm md:text-base lg:text-lg"
```

#### Grid responsive
```tsx
// Mobile: 1 colonne
// Tablet: 2 colonnes  
// Desktop: 3 colonnes
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

### 6.8 Accessibilité

#### Contraste
- **AA WCAG 2.1** : Ratio minimum 4.5:1
- Texte principal sur fond clair : ✅ 13.5:1
- Boutons gradient : ✅ 4.8:1

#### Touch targets
- **Minimum** : 44px × 44px
- Boutons : 48px hauteur minimum
- Gap entre zones cliquables : 8px minimum

#### Navigation clavier
- **Tab** : Navigation entre éléments
- **Enter** : Activation
- **Escape** : Fermeture modals
- **Arrows** : Navigation dans listes

#### ARIA
```tsx
<button aria-label="Retour au dashboard">
  <ArrowLeft />
</button>

<div role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
```

#### Focus visible
```css
focus:outline-2
focus:outline-pink-500
focus:outline-offset-2
```

---

## 7. ARCHITECTURE TECHNIQUE

### 7.1 Structure des dossiers

```
lovelingua/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx
│   │   ├── Quiz.tsx
│   │   ├── Results.tsx
│   │   ├── Onboarding.tsx
│   │   ├── ProfileSetup.tsx
│   │   ├── Suggestions.tsx
│   │   ├── ConversationQuestions.tsx
│   │   ├── InfoPage.tsx
│   │   ├── CoupleSetup.tsx
│   │   ├── CoupleComparison.tsx
│   │   ├── LoveLingua.tsx
│   │   ├── QuestHistory.tsx
│   │   ├── MultiplayerLobby.tsx
│   │   ├── MultiplayerGame.tsx
│   │   ├── PartnerQuizLobby.tsx
│   │   ├── PartnerQuizGame.tsx
│   │   ├── PartnerQuizResults.tsx
│   │   ├── UserProfile.tsx
│   │   ├── ProfileSettings.tsx
│   │   ├── SharedWishlist.tsx
│   │   ├── EmotionalCheckIn.tsx
│   │   ├── DigitalCoupons.tsx
│   │   ├── GratitudeWall.tsx
│   │   └── HistoryPage.tsx
│   ├── data/
│   │   ├── quizQuestions.ts
│   │   ├── loveLanguages.ts
│   │   ├── suggestions.ts
│   │   ├── conversationQuestions.ts
│   │   └── progressionSystem.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   ├── progressionHelper.ts
│   │   └── supabase/
│   │       └── info.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── mobile-se.css
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx
│           └── kv_store.tsx (protected)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### 7.2 Flow de données

#### Quiz flow
```
User → Quiz component
     → Sélectionne option
     → Clique "Suivant"
     → État local updated
     → Dernière question
     → Calcul résultat
     → saveTestResult() → localStorage
     → updateCoupleResult() → Supabase (si couple)
     → addXP() → Supabase
     → navigate('/results')
```

#### Couple flow
```
User A → CoupleSetup
       → Crée couple
       → POST /couple/create
       → Reçoit code (ABC123)
       → Partage code

User B → CoupleSetup
       → Entre code
       → POST /couple/:id/join
       → Couple linked ✅

Both → Dashboard affiche stats couple
    → Quêtes quotidiennes visibles
    → Réservoir d'amour sync
```

### 7.3 Gestion d'état

#### Local state (useState)
- Formulaires
- UI temporaire
- Modals
- Sélections

#### LocalStorage
- Profil utilisateur
- Résultats quiz
- Favoris
- Préférences

#### Server state (fetch)
- Couple data
- User progress
- Quêtes
- Sessions multiplayer

#### Pattern
```tsx
// 1. État local + cache
const [data, setData] = useState(() => {
  const cached = localStorage.getItem('key');
  return cached ? JSON.parse(cached) : null;
});

// 2. Fetch serveur
useEffect(() => {
  loadData();
}, []);

async function loadData() {
  const response = await fetch(url);
  const result = await response.json();
  setData(result);
  localStorage.setItem('key', JSON.stringify(result));
}
```

### 7.4 Sécurité

#### Frontend
- **Validation** : Tous les inputs
- **Sanitization** : Texte utilisateur
- **HTTPS** : Obligatoire
- **No sensitive data** : Pas de mots de passe stockés

#### Backend
- **CORS** : Headers ouverts mais contrôlés
- **Rate limiting** : À implémenter si besoin
- **Input validation** : Côté serveur aussi
- **Service role key** : Jamais exposé au frontend

#### Database
- **Parameterized queries** : Via KV store
- **No SQL injection** : Abstraction complète
- **Backup** : Automatique Supabase

---

## 8. CONTRAINTES ET EXIGENCES

### 8.1 Contraintes techniques

#### Navigateurs supportés
- **Chrome** : Version 90+
- **Safari** : Version 14+
- **Firefox** : Version 88+
- **Edge** : Version 90+
- **Mobile** : iOS 14+, Android 10+

#### Résolutions
- **Mobile** : 320px - 480px
- **Phablet** : 480px - 768px
- **Tablet** : 768px - 1024px
- **Desktop** : 1024px - 1920px+

#### Performance
- **Load time** : < 3s (3G)
- **FCP** : < 1.5s
- **TTI** : < 3s
- **CLS** : < 0.1

### 8.2 Contraintes fonctionnelles

#### Données utilisateur
- **Profil** : Max 500 bytes
- **Résultats quiz** : Max 50 résultats stockés
- **Favoris** : Max 100 items

#### Limitations backend
- **KV Store only** : Pas de tables custom
- **File operations** : /tmp directory only
- **No migrations** : Pas de DDL statements
- **Edge Functions** : Deno runtime seulement

### 8.3 Contraintes légales

#### RGPD
- **Consentement** : Explicite pour cookies
- **Données minimales** : Prénom + date naissance
- **Droit à l'oubli** : Export + suppression
- **Transparence** : Page confidentialité

#### Propriété intellectuelle
- **Concept 5 langages** : Gary Chapman (libre d'usage éducatif)
- **Design** : Original LoveLingua
- **Code** : Open source potentiel

### 8.4 Contraintes UX

#### Temps de complétion
- **Onboarding** : < 1 min
- **Setup profil** : < 2 min
- **Quiz** : ~5 min
- **Création couple** : < 1 min

#### Clarté
- **Pas de jargon** : Langage simple
- **Feedback immédiat** : Toasts, animations
- **Aide contextuelle** : Tooltips si besoin

---

## 9. LIVRABLES

### 9.1 Code source

#### Repository Git
- ✅ Code React + TypeScript
- ✅ Code Supabase Edge Functions
- ✅ Configuration Vite
- ✅ README.md
- ✅ .gitignore

#### Documentation
- ✅ Cahier des charges (ce fichier)
- ✅ Guide conversion React Vite
- ✅ Guide optimisation iPhone SE
- ✅ Guide progression system
- ✅ Guide backend

### 9.2 Application déployée

#### URLs
- **Production** : À définir
- **Preview** : Figma Make environment
- **Staging** : À définir

#### Services
- **Supabase Project** : Configuré
- **Edge Functions** : Déployées
- **Database** : Peuplée

### 9.3 Documentation utilisateur

#### Guides
- [ ] Comment créer un compte
- [ ] Comment passer le quiz
- [ ] Comment créer un couple
- [ ] Comment compléter des quêtes
- [ ] FAQ

#### Vidéos (optionnel)
- [ ] Demo rapide (1 min)
- [ ] Tutorial complet (5 min)

---

## 10. PLANNING ET PHASES

### 10.1 Phase 1 : MVP (TERMINÉE ✅)

**Durée** : 2-3 semaines

#### Livrables
- [x] Onboarding
- [x] Setup profil
- [x] Quiz principal
- [x] Résultats
- [x] Dashboard
- [x] Suggestions basiques
- [x] Page Info

**Status** : ✅ COMPLÉTÉ

### 10.2 Phase 2 : Mode Couple (TERMINÉE ✅)

**Durée** : 2 semaines

#### Livrables
- [x] Création/jointure couple
- [x] Réservoir d'amour
- [x] Quêtes quotidiennes
- [x] Comparaison langages
- [x] Historique quêtes

**Status** : ✅ COMPLÉTÉ

### 10.3 Phase 3 : Gamification (TERMINÉE ✅)

**Durée** : 1-2 semaines

#### Livrables
- [x] Système XP
- [x] Niveaux
- [x] Streaks
- [x] Events temporels
- [x] Profil utilisateur

**Status** : ✅ COMPLÉTÉ

### 10.4 Phase 4 : Social (TERMINÉE ✅)

**Durée** : 2 semaines

#### Livrables
- [x] Questions conversation
- [x] Mode multijoueur
- [x] Partner quiz
- [x] Chat intégré

**Status** : ✅ COMPLÉTÉ

### 10.5 Phase 5 : Bonus Features (TERMINÉE ✅)

**Durée** : 2 semaines

#### Livrables
- [x] Liste d'envies
- [x] Check-in émotionnel
- [x] Coupons numériques
- [x] Mur de gratitude
- [x] Historique complet

**Status** : ✅ COMPLÉTÉ

### 10.6 Phase 6 : Polish & Optimisation (EN COURS 🔄)

**Durée** : 1-2 semaines

#### Livrables
- [x] Conversion React Vite
- [x] Optimisation iPhone SE
- [x] Corrections bugs
- [x] Performance optimisation
- [ ] Tests navigateurs
- [ ] PWA setup
- [ ] SEO optimisation

**Status** : 🔄 EN COURS (90% complété)

### 10.7 Phase 7 : Déploiement (À VENIR)

**Durée** : 1 semaine

#### Livrables
- [ ] Setup domaine
- [ ] Déploiement production
- [ ] Monitoring setup
- [ ] Analytics setup
- [ ] Social media assets
- [ ] Landing page

**Status** : ⏳ À VENIR

### 10.8 Phase 8 : Post-Launch (À VENIR)

**Durée** : Continue

#### Actions
- [ ] Feedback utilisateurs
- [ ] Corrections bugs
- [ ] Nouvelles features
- [ ] A/B testing
- [ ] Marketing
- [ ] Community management

---

## 11. MÉTRIQUES DE SUCCÈS

### 11.1 KPIs Acquisition

| Métrique | Objectif 1 mois | Objectif 3 mois | Objectif 6 mois |
|----------|-----------------|-----------------|-----------------|
| Utilisateurs uniques | 500 | 3,000 | 10,000 |
| Quiz complétés | 400 | 2,400 | 8,000 |
| Couples créés | 50 | 400 | 1,500 |
| Taux de conversion | 10% | 13% | 15% |

### 11.2 KPIs Engagement

| Métrique | Objectif |
|----------|----------|
| Rétention J1 | > 60% |
| Rétention J7 | > 40% |
| Rétention J30 | > 25% |
| Sessions/utilisateur/semaine | > 3 |
| Temps moyen session | > 5 min |
| Quêtes complétées/couple/semaine | > 15 |

### 11.3 KPIs Qualité

| Métrique | Objectif |
|----------|----------|
| Taux de complétion quiz | > 85% |
| Score NPS | > 50 |
| Bugs critiques | 0 |
| Lighthouse Performance | > 90 |
| Temps de chargement | < 2s |

### 11.4 KPIs Technique

| Métrique | Objectif |
|----------|----------|
| Uptime | > 99.9% |
| Error rate | < 0.1% |
| API response time | < 200ms |
| Bundle size | < 200KB |
| Mobile usability | 100/100 |

---

## 12. ÉVOLUTIONS FUTURES

### 12.1 V2.0 Features (6-12 mois)

#### Premium features
- [ ] **Mode Premium** : 4.99€/mois
  - Quêtes illimitées
  - Questions personnalisées
  - Statistiques avancées
  - Pas de publicité

#### Social features
- [ ] **Communauté** : Forum couples
- [ ] **Témoignages** : Histoires de réussite
- [ ] **Classements** : Couples les plus actifs

#### IA Integration
- [ ] **Suggestions IA** : Personnalisées par ML
- [ ] **Chatbot conseil** : Assistant relationnel
- [ ] **Analyse sentiment** : Dans messages

### 12.2 V3.0 Features (12-24 mois)

#### Mobile native
- [ ] **App iOS** : Swift/SwiftUI
- [ ] **App Android** : Kotlin/Compose
- [ ] **Notifications push** : Rappels quêtes
- [ ] **Widget** : Réservoir d'amour

#### Therapist integration
- [ ] **Module pro** : Pour thérapeutes
- [ ] **Suivi patients** : Dashboard pro
- [ ] **Ressources** : Bibliothèque conseils

#### Internationalization
- [ ] **Multi-langue** : EN, ES, DE, IT
- [ ] **Localisation** : Cultures différentes
- [ ] **Support** : Multilingue

---

## 13. ANNEXES

### 13.1 Glossaire

| Terme | Définition |
|-------|------------|
| **Langage d'amour** | Façon préférée de donner/recevoir de l'amour |
| **Réservoir d'amour** | Jauge 0-100% de la connexion couple |
| **Quête** | Action quotidienne pour le partenaire |
| **Streak** | Jours consécutifs d'activité |
| **XP** | Points d'expérience pour gamification |
| **KV Store** | Base de données clé-valeur Supabase |
| **Edge Function** | Fonction serverless Supabase/Deno |

### 13.2 Références

#### Théorique
- **Gary Chapman** - "The 5 Love Languages" (1992)
- **John Gottman** - "The Seven Principles for Making Marriage Work"

#### Technique
- **React Docs** : https://react.dev
- **Tailwind CSS** : https://tailwindcss.com
- **Supabase Docs** : https://supabase.com/docs
- **Vite** : https://vitejs.dev

#### Design
- **Lucide Icons** : https://lucide.dev
- **Tailwind UI** : https://tailwindui.com
- **Dribbble** : Inspiration design

### 13.3 Contact et support

#### Équipe projet
- **Chef de projet** : À définir
- **Lead dev** : À définir
- **Designer** : À définir

#### Support technique
- **Documentation** : README.md
- **Issues** : GitHub Issues
- **Email** : support@lovelingua.app (à créer)

---

## 14. VALIDATION ET SIGNATURES

### 14.1 Validation technique
- [ ] Architecture validée
- [ ] Stack technique approuvée
- [ ] Performance targets acceptables

### 14.2 Validation fonctionnelle
- [x] Features MVP définies
- [x] User flows validés
- [x] Design system établi

### 14.3 Validation business
- [ ] Modèle économique défini
- [ ] KPIs établis
- [ ] Roadmap approuvée

---

**Version** : 1.0
**Date** : 28 novembre 2024
**Status** : ✅ DOCUMENT COMPLET

**Ce cahier des charges représente l'état actuel du projet LoveLingua avec toutes les fonctionnalités implémentées et la roadmap future.**

---

*LoveLingua - Fait avec 💕 pour les relations épanouies*
