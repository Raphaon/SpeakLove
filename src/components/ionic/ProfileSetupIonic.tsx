import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonItem,
  IonList,
  IonCard,
  IonCardContent,
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonSelectOption,
  useIonToast,
} from '@ionic/react';
import { heart, personCircle, calendar, male, female, transgender } from 'ionicons/icons';
import { saveUserProfile, UserProfile } from '../../utils/storage';
import './ProfileSetupIonic.css';

interface ProfileSetupIonicProps {
  onComplete?: () => void;
}

export function ProfileSetupIonic({ onComplete }: ProfileSetupIonicProps) {
  const [present] = useIonToast();
  
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    firstName: '',
    birthDate: '',
    gender: '',
    relationshipStatus: '',
  });

  const handleSubmit = () => {
    if (!profile.firstName || !profile.birthDate || !profile.gender || !profile.relationshipStatus) {
      present({
        message: 'Veuillez remplir tous les champs',
        duration: 2000,
        color: 'warning',
      });
      return;
    }

    const userProfile: Partial<UserProfile> = {
      firstName: profile.firstName,
      birthDate: profile.birthDate,
      gender: profile.gender,
      relationshipStatus: profile.relationshipStatus,
      createdAt: new Date().toISOString(),
    };

    saveUserProfile(userProfile);

    present({
      message: '✨ Profil créé avec succès !',
      duration: 1500,
      color: 'success',
    });

    // Call onComplete callback instead of reloading
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 300);
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center gap-2">
              <span>Créer mon profil</span>
              <span>✨</span>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="profile-setup-content">
        <div className="profile-setup-container">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="profile-icon">
              <IonIcon icon={personCircle} color="primary" />
            </div>
            <h1 className="profile-title">Bienvenue sur LoveLingua 💕</h1>
            <p className="profile-subtitle">Créons ton profil pour commencer</p>
          </div>

          {/* Form Card */}
          <IonCard className="form-card">
            <IonCardContent>
              <IonList className="form-list">
                {/* Prénom */}
                <IonItem className="form-item">
                  <IonLabel position="stacked" color="primary">
                    <strong>Prénom</strong>
                  </IonLabel>
                  <IonInput
                    value={profile.firstName}
                    onIonInput={(e: any) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                    placeholder="Ton prénom"
                    className="form-input"
                  />
                </IonItem>

                {/* Date de naissance */}
                <IonItem className="form-item">
                  <IonLabel position="stacked" color="primary">
                    <strong>Date de naissance</strong>
                  </IonLabel>
                  <IonInput
                    type="date"
                    value={profile.birthDate}
                    onIonInput={(e: any) =>
                      setProfile({ ...profile, birthDate: e.target.value })
                    }
                    className="form-input"
                  />
                </IonItem>

                {/* Genre */}
                <IonItem className="form-item" lines="none">
                  <IonLabel position="stacked" color="primary">
                    <strong>Genre</strong>
                  </IonLabel>
                </IonItem>
                
                <IonRadioGroup
                  value={profile.gender}
                  onIonChange={(e) => setProfile({ ...profile, gender: e.detail.value })}
                >
                  <IonItem className="radio-item">
                    <IonIcon icon={female} slot="start" color="primary" />
                    <IonLabel>Femme</IonLabel>
                    <IonRadio slot="end" value="female" />
                  </IonItem>
                  <IonItem className="radio-item">
                    <IonIcon icon={male} slot="start" color="primary" />
                    <IonLabel>Homme</IonLabel>
                    <IonRadio slot="end" value="male" />
                  </IonItem>
                  <IonItem className="radio-item">
                    <IonIcon icon={transgender} slot="start" color="primary" />
                    <IonLabel>Autre / Non-binaire</IonLabel>
                    <IonRadio slot="end" value="other" />
                  </IonItem>
                </IonRadioGroup>

                {/* Statut relationnel */}
                <IonItem className="form-item">
                  <IonLabel position="stacked" color="primary">
                    <strong>Statut relationnel</strong>
                  </IonLabel>
                  <IonSelect
                    value={profile.relationshipStatus}
                    onIonChange={(e) =>
                      setProfile({ ...profile, relationshipStatus: e.detail.value })
                    }
                    placeholder="Sélectionner"
                    interface="action-sheet"
                    className="form-select"
                  >
                    <IonSelectOption value="single">Célibataire</IonSelectOption>
                    <IonSelectOption value="dating">En couple</IonSelectOption>
                    <IonSelectOption value="engaged">Fiancé(e)</IonSelectOption>
                    <IonSelectOption value="married">Marié(e)</IonSelectOption>
                    <IonSelectOption value="complicated">C'est compliqué</IonSelectOption>
                    <IonSelectOption value="prefer-not-say">Préfère ne pas dire</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonList>
            </IonCardContent>
          </IonCard>

          {/* Info Card */}
          <IonCard color="light" className="info-card">
            <IonCardContent>
              <div className="flex items-start gap-3">
                <IonIcon icon={heart} color="primary" className="info-icon" />
                <div className="info-text">
                  <p className="text-sm">
                    <strong>Confidentialité :</strong> Tes informations restent privées et ne sont utilisées que pour personnaliser ton expérience.
                  </p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Submit Button */}
          <IonButton
            expand="block"
            size="large"
            color="primary"
            onClick={handleSubmit}
            className="submit-button"
          >
            <IonIcon icon={heart} slot="start" />
            Créer mon profil
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ProfileSetupIonic;
