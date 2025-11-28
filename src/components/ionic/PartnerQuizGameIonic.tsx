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
  IonSpinner,
  IonBadge,
  useIonRouter,
} from '@ionic/react';
import { arrowBack, time, checkmark, close } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import './PartnerQuizGameIonic.css';

interface PartnerQuizGameIonicProps {
  sessionId: string;
  partnerId: string;
  partnerName: string;
  onFinish: (sessionId: string) => void;
}

interface Question {
  id: number;
  question: string;
  level: 'easy' | 'medium' | 'hard';
  category: string;
  options: string[];
}

interface QuizSession {
  id: string;
  code: string;
  partnerAId: string;
  partnerAName: string;
  partnerBId?: string;
  partnerBName?: string;
  questions: Question[];
  currentQuestionIndex: number;
  answers: {
    [questionId: string]: {
      partnerA?: string;
      partnerB?: string;
      partnerATime?: number;
      partnerBTime?: number;
    };
  };
  score: number;
  status: 'waiting' | 'playing' | 'finished';
}

export function PartnerQuizGameIonic({ sessionId, partnerId, partnerName, onFinish }: PartnerQuizGameIonicProps) {
  const router = useIonRouter();
  const [session, setSession] = useState<QuizSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timeSpent, setTimeSpent] = useState(0);
  const [bothAnswered, setBothAnswered] = useState(false);

  const currentQuestion = session?.questions[session.currentQuestionIndex];
  const isPartnerA = partnerId === session?.partnerAId;
  const currentAnswers = currentQuestion ? session?.answers[currentQuestion.id] : null;
  const myAnswer = isPartnerA ? currentAnswers?.partnerA : currentAnswers?.partnerB;
  const partnerAnswer = isPartnerA ? currentAnswers?.partnerB : currentAnswers?.partnerA;
  const otherPartnerName = isPartnerA ? session?.partnerBName : session?.partnerAName;

  const fetchSession = async () => {
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
        
        const currentQ = data.session.questions[data.session.currentQuestionIndex];
        if (currentQ) {
          const answers = data.session.answers[currentQ.id];
          const myAns = isPartnerA ? answers?.partnerA : answers?.partnerB;
          const partAns = isPartnerA ? answers?.partnerB : answers?.partnerA;
          
          if (myAns) {
            setHasAnswered(true);
            setSelectedAnswer(myAns);
          }
          
          if (myAns && partAns) {
            setBothAnswered(true);
          }
        }

        if (data.session.status === 'finished') {
          onFinish(sessionId);
          router.push('/partner-quiz-results');
        }
      }
    } catch (err) {
      console.error('Error fetching session:', err);
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async (answer: string) => {
    if (hasAnswered) return;

    setSelectedAnswer(answer);
    setHasAnswered(true);

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${sessionId}/answer`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            questionId: currentQuestion?.id,
            partnerId,
            answer,
            timeSpent,
          }),
        }
      );

      fetchSession();
    } catch (err) {
      console.error('Error submitting answer:', err);
    }
  };

  const nextQuestion = async () => {
    if (!session) return;

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${sessionId}/next`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      setHasAnswered(false);
      setSelectedAnswer('');
      setBothAnswered(false);
      setTimeLeft(30);
      setTimeSpent(0);
      
      fetchSession();
    } catch (err) {
      console.error('Error going to next question:', err);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    if (!hasAnswered && session?.status === 'playing') {
      const interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasAnswered, session?.status]);

  useEffect(() => {
    if (session?.status === 'playing') {
      const interval = setInterval(fetchSession, 2000);
      return () => clearInterval(interval);
    }
  }, [session?.status]);

  if (loading) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <div className="flex flex-col items-center justify-center h-full">
            <IonSpinner />
            <p className="mt-4">Chargement...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!session || !currentQuestion) {
    return (
      <IonPage>
        <IonContent className="ion-padding ion-text-center">
          <p>Session introuvable</p>
          <IonButton onClick={() => router.push('/partner-quiz')}>Retour</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const progress = (session.currentQuestionIndex + 1) / session.questions.length;
  const isCorrect = bothAnswered && myAnswer === partnerAnswer;

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => router.push('/partner-quiz')}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Question {session.currentQuestionIndex + 1}/{session.questions.length}</IonTitle>
        </IonToolbar>
        <IonProgressBar value={progress} color="primary" />
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Timer */}
        <div className="text-center mb-4 mt-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <IonIcon icon={time} color={timeLeft < 10 ? 'danger' : 'primary'} />
            <span className={timeLeft < 10 ? 'text-red-500 text-xl' : 'text-gray-700 text-xl'}>
              {timeLeft}s
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {hasAnswered ? 'En attente de votre partenaire...' : 'Répondez rapidement !'}
          </p>
        </div>

        {/* Question Card */}
        <IonCard className="gradient-primary text-white mb-4">
          <IonCardContent className="ion-padding">
            <IonBadge color="light" className="mb-3">
              {currentQuestion.category}
            </IonBadge>
            <h2 className="text-white text-xl mb-0">
              {currentQuestion.question}
            </h2>
          </IonCardContent>
        </IonCard>

        {/* Options */}
        <div className="space-y-3 mb-4">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isPartnerSelected = partnerAnswer === option;
            const showResult = bothAnswered;

            let color: string | undefined = undefined;
            let fill: 'solid' | 'outline' = 'outline';

            if (showResult) {
              if (isSelected && isPartnerSelected) {
                color = 'success';
                fill = 'solid';
              } else if (isSelected || isPartnerSelected) {
                color = 'danger';
                fill = 'solid';
              }
            } else if (isSelected) {
              color = 'primary';
              fill = 'solid';
            }

            return (
              <IonButton
                key={index}
                expand="block"
                size="large"
                color={color}
                fill={fill}
                onClick={() => submitAnswer(option)}
                disabled={hasAnswered}
                className="option-button"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex-1 text-left">{option}</span>
                  {showResult && (
                    <IonIcon
                      icon={isSelected && isPartnerSelected ? checkmark : close}
                      slot="end"
                    />
                  )}
                </div>
              </IonButton>
            );
          })}
        </div>

        {/* Status Messages */}
        {bothAnswered && (
          <IonCard color={isCorrect ? 'success' : 'warning'}>
            <IonCardContent className="text-center">
              <div className="text-3xl mb-2">
                {isCorrect ? '🎉' : '😅'}
              </div>
              <p className="text-white m-0">
                {isCorrect
                  ? 'Parfait ! Vous êtes sur la même longueur d\'onde !'
                  : `${otherPartnerName} a répondu : ${partnerAnswer}`}
              </p>
            </IonCardContent>
          </IonCard>
        )}

        {hasAnswered && !bothAnswered && (
          <IonCard>
            <IonCardContent className="text-center">
              <IonSpinner className="mb-2" />
              <p className="text-gray-600 m-0">
                En attente de {otherPartnerName}...
              </p>
            </IonCardContent>
          </IonCard>
        )}

        {/* Next Button */}
        {bothAnswered && (
          <div className="mt-4">
            <IonButton
              expand="block"
              size="large"
              onClick={nextQuestion}
              color="primary"
            >
              {session.currentQuestionIndex < session.questions.length - 1
                ? 'Question suivante'
                : 'Voir les résultats'}
            </IonButton>
          </div>
        )}

        {/* Score */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          Score actuel : {session.score} / {session.currentQuestionIndex}
        </div>

        <div className="h-8" />
      </IonContent>
    </IonPage>
  );
}
