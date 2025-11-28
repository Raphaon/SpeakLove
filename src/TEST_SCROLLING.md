# 🧪 Test du Scrolling - Checklist

## ✅ Tests à effectuer

### 1. Dashboard (Page d'accueil)
- [ ] La page se charge correctement
- [ ] Le contenu défile de haut en bas
- [ ] Le pull-to-refresh fonctionne (tirer vers le bas)
- [ ] Les cartes de navigation sont cliquables
- [ ] Le header reste fixe en haut lors du scroll
- [ ] Le scroll est fluide sans saccades

### 2. Quiz (QuizIonic)
- [ ] Les questions s'affichent correctement
- [ ] On peut scroller jusqu'au bouton "Suivant"
- [ ] Les options radio sont cliquables
- [ ] La progress bar en haut est visible
- [ ] Le scroll ne cache aucun contenu

### 3. Résultats (ResultsIonic)
- [ ] L'histogramme s'affiche complètement
- [ ] On peut scroller pour voir toutes les sections
- [ ] Le bouton "Retour au Dashboard" est accessible
- [ ] Les cartes de suggestions sont visibles
- [ ] Le footer est bien en bas

### 4. Questions de conversation (ConversationQuestionsIonic)
- [ ] Les filtres (thèmes) sont accessibles
- [ ] La carte de question s'affiche
- [ ] On peut scroller pour voir les questions sauvegardées
- [ ] Les boutons d'action sont visibles
- [ ] Le scroll horizontal des chips fonctionne

### 5. Onboarding
- [ ] Chaque étape s'affiche correctement
- [ ] Le contenu long (étapes 2, 4) défile
- [ ] Les boutons en bas restent fixes
- [ ] La progress bar est visible
- [ ] Le bouton "Passer" fonctionne

### 6. Profile Setup (ProfileSetupIonic)
- [ ] Le formulaire est accessible
- [ ] On peut scroller pour voir tous les champs
- [ ] Les boutons sont accessibles
- [ ] Le header reste en haut
- [ ] Les inputs sont utilisables

### 7. Quiz Partenaire (PartnerQuizLobbyIonic, PartnerQuizGameIonic)
- [ ] Le lobby s'affiche correctement
- [ ] Les codes de session sont visibles
- [ ] Le jeu défile correctement
- [ ] Les résultats sont entièrement visibles
- [ ] Le chat (si présent) est utilisable

## 🔍 Tests spécifiques mobile

### iOS (Safari/App native)
- [ ] Momentum scrolling fonctionne (scroll avec inertie)
- [ ] Le bounce effect fonctionne (overscroll)
- [ ] Pas de scroll bloqué sous le header
- [ ] Safe area respectée (pas de contenu sous la notch)
- [ ] Pull-to-refresh natif fonctionne

### Android (Chrome/App native)
- [ ] Scroll fluide sans lag
- [ ] Pas de double scroll
- [ ] Ripple effect sur les boutons
- [ ] Bouton retour système fonctionne
- [ ] Keyboard ne cache pas les inputs

## 🐛 Problèmes courants et solutions

### ❌ Le contenu ne défile pas
**Solution:** Vérifier que IonContent n'a pas de hauteur fixe dans le CSS

### ❌ Double scroll (2 barres de défilement)
**Solution:** Retirer overflow-y sur les divs à l'intérieur d'IonContent

### ❌ Scroll saccadé
**Solution:** Vérifier qu'il n'y a pas de `scroll-behavior: smooth` sur ion-content

### ❌ Contenu caché sous le header
**Solution:** Ajouter `fullscreen` prop sur IonContent

### ❌ Boutons en bas non accessibles
**Solution:** Ajouter padding-bottom ou utiliser IonFooter

## 📱 Outils de test

### DevTools Chrome
```javascript
// Dans la console, tester le scroll programmatiquement
document.querySelector('ion-content').scrollToTop(300);
document.querySelector('ion-content').scrollToBottom(300);
```

### Responsive Mode
1. Ouvrir DevTools (F12)
2. Cliquer sur l'icône mobile (Ctrl+Shift+M)
3. Tester différentes tailles:
   - iPhone 14 Pro (393x852)
   - iPhone SE (375x667)
   - Galaxy S20 (360x800)
   - iPad Pro (1024x1366)

## ✨ Critères de réussite

Le scrolling est considéré comme **parfaitement fonctionnel** si:
- ✅ Aucun contenu n'est caché ou inaccessible
- ✅ Le scroll est fluide à 60fps minimum
- ✅ Le momentum scrolling fonctionne (iOS)
- ✅ Pull-to-refresh fonctionne où implémenté
- ✅ Aucun scroll bloqué
- ✅ Les headers/footers restent en position fixe
- ✅ Safe area respectée sur tous les appareils
- ✅ Pas de conflit entre scrolls (horizontal/vertical)

## 🚀 Test rapide (1 minute)

1. **Ouvrir l'app**
2. **Scroller sur Dashboard** → doit être fluide
3. **Ouvrir Quiz** → scroller jusqu'en bas → doit voir le bouton
4. **Ouvrir Questions** → filtres horizontaux → doivent scroller
5. **Retour Dashboard** → pull-to-refresh → doit fonctionner

Si ces 5 tests passent, le scrolling est probablement OK ✅

## 📝 Rapport de bugs

Si un problème persiste:
1. Noter la page exacte
2. Noter l'appareil/navigateur
3. Faire une capture d'écran
4. Vérifier la console (F12) pour erreurs
5. Consulter `/IONIC_SCROLLING_FIX.md` pour solutions
