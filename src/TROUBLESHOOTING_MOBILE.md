# 🔧 Guide de Résolution - Problèmes Mobile

## 📱 Problèmes d'Interface Mobile

### 1. ❌ Le contenu ne scroll pas

#### Symptômes
- Contenu bloqué, impossible de faire défiler
- Boutons en bas de page inaccessibles
- Sensation d'interface "figée"

#### Causes possibles
```css
/* ❌ MAUVAIS - Layout qui empêche le scroll */
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
```

#### Solutions

**Solution 1: Utiliser IonContent avec fullscreen**
```tsx
<IonContent fullscreen className="ion-padding">
  {/* Contenu scrollable ici */}
</IonContent>
```

**Solution 2: Conteneur scrollable explicite**
```css
.scrollable-container {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch; /* Important pour iOS */
}
```

**Solution 3: Supprimer contraintes de hauteur**
```css
/* ❌ Éviter */
height: 100vh;
min-height: 100vh;

/* ✅ Préférer */
flex: 1;
/* ou */
height: auto;
```

---

### 2. ❌ Bouton fixe cache le contenu

#### Symptômes
- Derniers éléments cachés sous les boutons
- Impossible de cliquer sur derniers items
- Footer recouvre le contenu

#### Causes
- Footer fixe sans padding-bottom sur content
- Pas de spacer avant le footer

#### Solutions

**Solution 1: IonFooter (recommandé)**
```tsx
<IonContent>
  {/* Contenu */}
  <div style={{ height: '100px' }} /> {/* Spacer */}
</IonContent>

<IonFooter>
  <IonToolbar>
    <IonButton>Action</IonButton>
  </IonToolbar>
</IonFooter>
```

**Solution 2: Padding bottom**
```css
.content-with-footer {
  padding-bottom: calc(80px + var(--ion-safe-area-bottom));
}
```

**Solution 3: Spacer div**
```tsx
<div className="content">
  {/* Contenu normal */}
  
  {/* Spacer à la fin */}
  <div style={{ height: '120px' }} />
</div>
```

---

### 3. ❌ Notch iPhone cache le header

#### Symptômes
- Texte/icônes coupés en haut sur iPhone X+
- Header trop près du bord
- Éléments non cliquables

#### Solution: Safe Area

**CSS automatique avec Ionic**
```tsx
<IonHeader translucent>
  <IonToolbar>
    {/* Safe area automatique */}
  </IonToolbar>
</IonHeader>
```

**CSS manuel si nécessaire**
```css
.custom-header {
  padding-top: max(1rem, env(safe-area-inset-top));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

@supports (padding: max(0px)) {
  .custom-header {
    padding-top: max(1rem, env(safe-area-inset-top));
  }
}
```

---

### 4. ❌ Boutons difficiles à cliquer

#### Symptômes
- Clics ratés
- Nécessité de cliquer plusieurs fois
- Mauvaise UX tactile

#### Causes
- Touch targets < 44px
- Padding insuffisant
- Z-index conflicts

#### Solutions

**Taille minimale 44x44px**
```css
.touch-button {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 20px;
}
```

**Ionic Button (déjà optimisé)**
```tsx
<IonButton size="large" expand="block">
  {/* Automatiquement 44px+ */}
</IonButton>
```

**Zone cliquable étendue**
```css
.clickable {
  position: relative;
}

.clickable::before {
  content: '';
  position: absolute;
  top: -10px;
  right: -10px;
  bottom: -10px;
  left: -10px;
}
```

---

### 5. ❌ Performance lente / Lag

#### Symptômes
- Animations saccadées
- Scroll pas fluide
- App qui rame

#### Solutions

**1. Activer GPU acceleration**
```css
.animated-element {
  transform: translateZ(0);
  will-change: transform;
}
```

**2. Smooth scrolling iOS**
```css
.scroll-container {
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
}
```

**3. Limiter animations**
```css
/* ❌ Éviter trop d'animations simultanées */
@keyframes complex {
  /* 20+ propriétés animées */
}

/* ✅ Préférer */
@keyframes simple {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

**4. Lazy loading**
```tsx
// Images
<img loading="lazy" src="..." />

// Routes
const Component = lazy(() => import('./Component'));
```

---

### 6. ❌ Clavier cache les inputs

#### Symptômes
- Input caché quand clavier ouvert
- Impossible de voir ce qu'on tape
- Form coupé

#### Solutions

**1. ScrollIntoView automatique**
```tsx
<IonInput
  onIonFocus={(e) => {
    setTimeout(() => {
      e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
  }}
/>
```

**2. Ionic Keyboard plugin**
```bash
npm install @capacitor/keyboard
```

```tsx
import { Keyboard } from '@capacitor/keyboard';

// Ajuster layout automatiquement
Keyboard.setResizeMode({ mode: 'native' });
```

**3. Padding dynamique**
```tsx
const [keyboardHeight, setKeyboardHeight] = useState(0);

useEffect(() => {
  Keyboard.addListener('keyboardWillShow', (info) => {
    setKeyboardHeight(info.keyboardHeight);
  });
  
  Keyboard.addListener('keyboardWillHide', () => {
    setKeyboardHeight(0);
  });
}, []);

<div style={{ paddingBottom: keyboardHeight }}>
  {/* Form */}
</div>
```

---

## 🐛 Problèmes de Navigation

### 7. ❌ Navigation ne fonctionne pas

#### Symptômes
- Clics sur liens sans effet
- Page ne change pas
- Erreurs console

#### Solutions

**1. Utiliser useHistory**
```tsx
import { useHistory } from 'react-router-dom';

const history = useHistory();

// ✅ Correct
<IonButton onClick={() => history.push('/page')}>
  Aller
</IonButton>

// ❌ Éviter
<IonButton onClick={() => window.location.href = '/page'}>
```

**2. Vérifier IonReactRouter**
```tsx
// App.tsx
<IonReactRouter>
  <IonRouterOutlet>
    <Route path="/page" component={Page} />
  </IonRouterOutlet>
</IonReactRouter>
```

**3. routerLink pour liens simples**
```tsx
<IonButton routerLink="/page">
  Aller
</IonButton>
```

---

### 8. ❌ Swipe-back ne marche pas (iOS)

#### Symptômes
- Impossible de swiper pour revenir
- Navigation iOS cassée

#### Solution

**Activer dans setupIonicReact**
```tsx
setupIonicReact({
  mode: 'ios',
  swipeBackEnabled: true, // Important !
});
```

**Vérifier IonBackButton**
```tsx
<IonHeader>
  <IonToolbar>
    <IonButtons slot="start">
      <IonBackButton defaultHref="/dashboard" />
    </IonButtons>
  </IonToolbar>
</IonHeader>
```

---

## 🎨 Problèmes de Style

### 9. ❌ Styles Ionic ne s'appliquent pas

#### Symptômes
- Composants sans style
- Couleurs par défaut (bleu)
- Pas de thème

#### Solutions

**1. Importer CSS Ionic**
```tsx
// App.tsx
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
```

**2. Importer thème custom**
```tsx
import './styles/ionic-overrides.css';
```

**3. Vérifier variables CSS**
```css
:root {
  --ion-color-primary: #E91E63;
  /* ... */
}
```

---

### 10. ❌ Tailwind et Ionic conflits

#### Symptômes
- Styles cassés
- Classes ne fonctionnent pas
- Conflits de CSS

#### Solution

**Séparer Tailwind et Ionic**
```tsx
// ❌ Éviter de mélanger
<IonCard className="bg-white p-6 rounded-3xl">

// ✅ Préférer
<IonCard className="custom-card">
```

**CSS séparé**
```css
/* custom.css */
.custom-card {
  background: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
}
```

---

## 📱 Problèmes de Build

### 11. ❌ Build iOS échoue

#### Solutions

**1. Vérifier Xcode**
```bash
xcode-select --install
```

**2. Sync Capacitor**
```bash
npx cap sync ios
```

**3. Clean build folder**
```bash
cd ios/App
rm -rf DerivedData
```

**4. Vérifier Bundle ID**
```json
// capacitor.config.json
{
  "appId": "com.lovelingua.app" // Valide
}
```

---

### 12. ❌ Build Android échoue

#### Solutions

**1. Vérifier Android Studio**
```bash
which android
```

**2. Sync Gradle**
```bash
cd android
./gradlew clean
./gradlew build
```

**3. Vérifier Java version**
```bash
java -version
# Doit être 11 ou 17
```

---

## 🔍 Debugging

### Outils essentiels

**Chrome DevTools (Android)**
```
1. Connecter appareil USB
2. Activer debug USB
3. chrome://inspect
4. Inspecter l'app
```

**Safari DevTools (iOS)**
```
1. Connecter iPhone
2. Safari > Develop > [iPhone]
3. Inspecter l'app
```

**Console logs**
```tsx
// Logs visibles dans DevTools
console.log('Debug:', data);
console.error('Error:', error);
```

**Toast pour debug rapide**
```tsx
import { useIonToast } from '@ionic/react';

const [present] = useIonToast();

// Debug visuel
present({
  message: `Value: ${someValue}`,
  duration: 3000,
});
```

---

## ✅ Checklist Avant Déploiement

### Interface
- [ ] Scroll fonctionne partout
- [ ] Boutons accessibles (44px+)
- [ ] Safe area respectée
- [ ] Pas de contenu caché
- [ ] Animations fluides

### Navigation
- [ ] Tous les liens fonctionnent
- [ ] Swipe-back iOS OK
- [ ] Back button Android OK
- [ ] Deep linking testé

### Performance
- [ ] Lighthouse > 90
- [ ] Animations 60 FPS
- [ ] Images optimisées
- [ ] Bundle < 500KB

### Tests
- [ ] iPhone SE (petit)
- [ ] iPhone 14 Pro (notch)
- [ ] iPad
- [ ] Android 360x640
- [ ] Android 412x915

---

## 📚 Ressources

- [Ionic Docs](https://ionicframework.com/docs)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Apple HIG](https://developer.apple.com/design/)
- [Material Design](https://material.io/design)

---

**Besoin d'aide ?** Consulter `MIGRATION_GUIDE.md` ou `IONIC_SUMMARY.md`
