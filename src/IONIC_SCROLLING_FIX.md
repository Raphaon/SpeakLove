# 📱 Ionic Scrolling - Guide de correction

## 🎯 Problèmes résolus

Le scrolling dans Ionic React nécessite une configuration spécifique pour fonctionner correctement. Voici les corrections appliquées :

## ✅ Corrections principales

### 1. Structure App.tsx
- ✅ Remplacé `<div className="min-h-screen">` par `<IonApp>`
- ✅ Ajouté imports CSS Ionic requis
- ✅ Configuré `setupIonicReact({ mode: 'ios' })`

### 2. IonContent props
- ✅ Retiré prop `scrollY` (inutile et contre-productif)
- ✅ Gardé seulement `fullscreen` et `className="ion-padding"`

### 3. CSS Global (/styles/ionic-overrides.css)

```css
/* Critical pour Ionic */
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: fixed;
  overscroll-behavior-y: none;
}

#root {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

ion-app {
  height: 100%;
  width: 100%;
}

/* Scrolling natif optimisé */
ion-content::part(scroll) {
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
  will-change: scroll-position;
  height: 100%;
}
```

### 4. globals.css
- ✅ Modifié `scroll-behavior: smooth` pour exclure ion-content
- ✅ Évite les conflits avec le scrolling natif Ionic

## 🏗️ Structure correcte d'un composant Ionic

```tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

export function MonComposant() {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Titre</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Contenu scrollable ici */}
        {/* Pas besoin de scrollY prop */}
      </IonContent>
    </IonPage>
  );
}
```

## ❌ Erreurs courantes à éviter

1. **NE PAS** ajouter `scrollY={true}` sur IonContent
2. **NE PAS** wrapper IonPage dans des divs avec height/overflow
3. **NE PAS** utiliser `min-h-screen` sur conteneur parent
4. **NE PAS** appliquer overflow:auto sur body/html (sauf overflow:hidden)
5. **NE PAS** oublier `fullscreen` sur IonContent

## 🔍 Debug checklist

Si le scrolling ne fonctionne pas :

- [ ] IonApp est bien le wrapper principal dans App.tsx
- [ ] Tous les imports CSS Ionic sont présents
- [ ] setupIonicReact() est appelé
- [ ] IonPage > IonHeader > IonContent structure respectée
- [ ] Pas de prop scrollY sur IonContent
- [ ] html/body ont overflow:hidden
- [ ] ion-content::part(scroll) a overflow-y:auto
- [ ] Pas de height:100vh ou min-h-screen sur divs parents

## 📱 Test sur appareil

```bash
# iOS
npx cap sync ios
npx cap open ios

# Android  
npx cap sync android
npx cap open android
```

## 🎨 Classes CSS sûres pour Ionic

✅ Safe :
- `className="ion-padding"`
- `className="ion-margin"`
- `className="ion-text-center"`

❌ Éviter avec Ionic :
- `className="h-screen"`
- `className="min-h-screen"`
- `className="overflow-auto"`
- `className="overflow-scroll"`

## 🚀 Performances

Pour améliorer le scrolling :
- Utiliser `virtual scrolling` pour listes longues (IonVirtualScroll)
- Activer `translucent` sur IonHeader pour effet glassmorphism
- Utiliser `IonRefresher` pour pull-to-refresh
- Éviter trop de calculs dans le rendu pendant scroll

## 📚 Ressources

- [Ionic Content Docs](https://ionicframework.com/docs/api/content)
- [Ionic Scrolling Guide](https://ionicframework.com/docs/layout/structure)
- [CSS Shadow Parts](https://ionicframework.com/docs/theming/css-shadow-parts)
