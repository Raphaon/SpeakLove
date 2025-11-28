/**
 * Template pour créer un nouveau composant Ionic
 * 
 * Instructions:
 * 1. Copier ce fichier et renommer en [NomComposant]Ionic.tsx
 * 2. Remplacer tous les "Template" par le nom du composant
 * 3. Ajouter les props nécessaires à l'interface
 * 4. Implémenter la logique dans le composant
 * 5. Créer le fichier CSS associé [NomComposant]Ionic.css
 * 6. Ajouter la route dans App_Ionic.tsx
 */

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  useIonToast,
  useIonLoading,
} from '@ionic/react';
import {
  heart,
  arrowBack,
  settings,
  // Ajouter d'autres icons depuis ionicons/icons
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './TemplateIonic.css';

// ========== INTERFACES ==========

interface TemplateIonicProps {
  // Définir les props ici
  // Ex: userId?: string;
  // Ex: onComplete?: () => void;
}

// ========== COMPOSANT ==========

export function TemplateIonic({ /* props */ }: TemplateIonicProps) {
  const history = useHistory();
  const [presentToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  // ========== STATE ==========
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ========== EFFECTS ==========
  useEffect(() => {
    loadData();
  }, []);

  // ========== FUNCTIONS ==========
  
  const loadData = async () => {
    setLoading(true);
    try {
      // Implémenter la logique de chargement
      // const response = await fetch(...);
      // setData(response.data);
    } catch (error) {
      console.error('Error loading data:', error);
      presentToast({
        message: 'Erreur lors du chargement',
        duration: 2000,
        color: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadData();
    event.detail.complete();
  };

  const handleAction = async () => {
    await presentLoading({ message: 'Traitement...' });
    
    try {
      // Implémenter l'action
      
      presentToast({
        message: 'Action réussie !',
        duration: 2000,
        color: 'success',
      });
    } catch (error) {
      console.error('Error:', error);
      presentToast({
        message: 'Erreur lors de l\'action',
        duration: 2000,
        color: 'danger',
      });
    } finally {
      await dismissLoading();
    }
  };

  // ========== RENDER ==========
  
  return (
    <IonPage>
      {/* ========== HEADER ========== */}
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Titre de la Page</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => history.push('/settings')}>
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* ========== CONTENT ========== */}
      <IonContent fullscreen className="template-content">
        {/* Pull to Refresh */}
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Main Content */}
        <div className="ion-padding">
          {/* Header Section */}
          <div className="text-center mb-6">
            <h1 className="page-title">Titre Principal</h1>
            <p className="page-subtitle">Sous-titre ou description</p>
          </div>

          {/* Content Card */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>
                <div className="flex items-center gap-2">
                  <IonIcon icon={heart} color="primary" />
                  Titre de la carte
                </div>
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Contenu de la carte</p>
            </IonCardContent>
          </IonCard>

          {/* Action Button */}
          <IonButton
            expand="block"
            size="large"
            color="primary"
            onClick={handleAction}
            className="mt-4"
          >
            <IonIcon icon={heart} slot="start" />
            Action Principale
          </IonButton>

          {/* Secondary Button */}
          <IonButton
            expand="block"
            fill="outline"
            color="primary"
            onClick={() => history.push('/dashboard')}
            className="mt-2"
          >
            Retour
          </IonButton>
        </div>

        {/* Footer */}
        <div className="template-footer">
          <p className="footer-text">Fait avec 💕 pour votre relation</p>
        </div>
      </IonContent>
    </IonPage>
  );
}

// ========== EXPORT ==========
export default TemplateIonic;
