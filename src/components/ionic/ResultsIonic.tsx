import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonChip,
  IonBadge,
  useIonRouter,
} from '@ionic/react';
import { 
  heart,
  share,
  trophy,
  sparkles,
  home,
  checkmarkCircle,
  arrowBack,
} from 'ionicons/icons';
import { loveLanguages } from '../../data/loveLanguages';
import './ResultsIonic.css';

interface ResultsIonicProps {
  results: Record<string, number> | null;
}

export function ResultsIonic({ results }: ResultsIonicProps) {
  const router = useIonRouter();
  if (!results) {
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => router.push('/dashboard')}>
                <IonIcon icon={arrowBack} />
              </IonButton>
            </IonButtons>
            <IonTitle>Résultats</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="ion-padding ion-text-center">
          <div className="empty-state">
            <div className="empty-icon">❓</div>
            <h2>Aucun résultat</h2>
            <p>Passez le quiz pour découvrir votre langage d'amour !</p>
            <IonButton onClick={() => router.push('/quiz')} color="primary">
              Commencer le quiz
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const totalAnswers = Object.values(results).reduce((sum, count) => sum + count, 0);
  const primaryLanguageId = Object.keys(results).reduce((a, b) => 
    results[a] > results[b] ? a : b
  );
  const primaryLanguage = loveLanguages.find(l => l.id === primaryLanguageId);
  
  const sortedResults = Object.entries(results)
    .map(([id, count]) => ({
      language: loveLanguages.find(l => l.id === id)!,
      count,
      percentage: Math.round((count / totalAnswers) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  const handleShare = async () => {
    const text = `Mon langage d'amour principal est ${primaryLanguage?.icon} ${primaryLanguage?.name} ! Découvrez le vôtre sur LoveLingua 💕`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mon Langage d\'Amour',
          text,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Résultat copié dans le presse-papiers !');
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onNavigate('dashboard')}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Vos Résultats</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleShare}>
              <IonIcon icon={share} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="results-content">
        {/* Hero Card */}
        <IonCard className="hero-card gradient-primary">
          <IonCardContent>
            <div className="hero-content">
              <div className="hero-icon">{primaryLanguage?.icon}</div>
              <h1 className="hero-title">{primaryLanguage?.name}</h1>
              <p className="hero-subtitle">Votre langage d'amour principal</p>
              <IonBadge color="light" className="hero-badge">
                {sortedResults[0].percentage}%
              </IonBadge>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Description */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="flex items-center gap-2">
                <IonIcon icon={heart} color="primary" />
                Ce que cela signifie
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="description-text">{primaryLanguage?.description}</p>
          </IonCardContent>
        </IonCard>

        {/* All Results */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="flex items-center gap-2">
                <IonIcon icon={trophy} color="primary" />
                Répartition détaillée
              </div>
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList className="results-list">
              {sortedResults.map((item, index) => (
                <IonItem key={item.language.id} lines="none" className="result-item">
                  <div className="result-rank" slot="start">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                  </div>
                  <IonLabel>
                    <h3 className="result-name">
                      <span className="result-icon">{item.language.icon}</span>
                      {item.language.name}
                    </h3>
                    <IonProgressBar
                      value={item.percentage / 100}
                      color={index === 0 ? 'primary' : index === 1 ? 'secondary' : 'tertiary'}
                      className="result-progress"
                    />
                  </IonLabel>
                  <IonBadge slot="end" color={index === 0 ? 'primary' : 'medium'}>
                    {item.percentage}%
                  </IonBadge>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Actions */}
        <div className="ion-padding">
          <IonButton
            expand="block"
            size="large"
            color="primary"
            onClick={() => router.push('/suggestions')}
            className="action-button"
          >
            <IonIcon icon={sparkles} slot="start" />
            Voir les suggestions
          </IonButton>

          <IonButton
            expand="block"
            size="large"
            fill="outline"
            color="primary"
            onClick={() => router.push('/dashboard')}
            className="action-button"
          >
            <IonIcon icon={home} slot="start" />
            Retour au tableau de bord
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            color="medium"
            onClick={() => router.push('/quiz')}
          >
            Refaire le quiz
          </IonButton>
        </div>

        {/* Info Card */}
        <IonCard color="light" className="info-card">
          <IonCardContent>
            <div className="info-content">
              <IonIcon icon={checkmarkCircle} color="success" className="info-icon" />
              <div>
                <h4 className="info-title">Résultat enregistré !</h4>
                <p className="info-text">
                  Vos résultats sont sauvegardés et disponibles dans votre profil.
                  {' '}Partagez-les avec votre partenaire pour mieux vous comprendre !
                </p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Footer */}
        <div className="results-footer">
          <p className="footer-text">
            Fait avec 💕 pour améliorer votre relation
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
