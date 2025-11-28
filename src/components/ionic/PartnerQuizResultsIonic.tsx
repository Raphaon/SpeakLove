import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonCard,
  IonCardContent,
  IonProgressBar,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { arrowBack, trophy, checkmark, close, refresh } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import './PartnerQuizResultsIonic.css';

interface PartnerQuizResultsIonicProps {
  sessionId: string;
  partnerId: string;
  onNavigate: (page: string) => void;
}

interface QuizSession {
  id: string;
  partnerAName: string;
  partnerBName: string;
  questions: any[];
  answers: any;
  score: number;
}

export function PartnerQuizResultsIonic({ sessionId, partnerId, onNavigate }: PartnerQuizResultsIonicProps) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${sessionId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setSession(data.session);
        }
      } catch (err) {
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [sessionId]);

  if (loading || !session) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <p>Chargement des résultats...</p>
        </IonContent>
      </IonPage>
    );
  }

  const totalQuestions = session.questions.length;
  const correctAnswers = session.score;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => onNavigate('dashboard')}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Résultats</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Score Card */}
        <div className="text-center mb-6 mt-4">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎉' : percentage >= 40 ? '😊' : '💪'}
          </div>
          <h1 className="text-3xl text-gray-800 mb-2">
            {percentage}%
          </h1>
          <p className="text-gray-600">
            {correctAnswers} / {totalQuestions} réponses identiques
          </p>
        </div>

        <IonProgressBar value={percentage / 100} color="primary" className="mb-6" />

        {/* Message */}
        <IonCard className="gradient-primary text-white mb-6">
          <IonCardContent className="text-center">
            <h3 className="text-white mb-2">
              {percentage >= 80
                ? 'Incroyable complicité ! 💕'
                : percentage >= 60
                ? 'Vous vous connaissez bien ! ✨'
                : percentage >= 40
                ? 'Pas mal ! Continuez à vous découvrir 🌟'
                : 'Un bon début ! Place aux surprises 💫'}
            </h3>
            <p className="text-white opacity-90 text-sm m-0">
              {session.partnerAName} & {session.partnerBName}
            </p>
          </IonCardContent>
        </IonCard>

        {/* Details */}
        <IonCard>
          <IonCardContent>
            <h3 className="mb-3 flex items-center gap-2">
              <IonIcon icon={trophy} color="warning" />
              <span>Détails des questions</span>
            </h3>
            
            <IonList className="m-0">
              {session.questions.map((question, index) => {
                const answers = session.answers[question.id];
                const isCorrect = answers?.partnerA === answers?.partnerB;
                
                return (
                  <IonItem key={question.id} lines="full">
                    <IonIcon
                      icon={isCorrect ? checkmark : close}
                      color={isCorrect ? 'success' : 'danger'}
                      slot="start"
                    />
                    <IonLabel>
                      <h3>Question {index + 1}</h3>
                      <p className="text-sm text-gray-600">{question.question}</p>
                      {!isCorrect && (
                        <p className="text-xs text-gray-500 mt-1">
                          {session.partnerAName}: {answers?.partnerA}<br />
                          {session.partnerBName}: {answers?.partnerB}
                        </p>
                      )}
                    </IonLabel>
                  </IonItem>
                );
              })}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Actions */}
        <div className="mt-6 space-y-3">
          <IonButton
            expand="block"
            size="large"
            onClick={() => onNavigate('partner-quiz')}
            color="primary"
          >
            <IonIcon icon={refresh} slot="start" />
            Nouvelle partie
          </IonButton>
          
          <IonButton
            expand="block"
            size="large"
            fill="outline"
            onClick={() => onNavigate('dashboard')}
          >
            Retour au tableau de bord
          </IonButton>
        </div>

        <div className="h-8" />
      </IonContent>
    </IonPage>
  );
}
