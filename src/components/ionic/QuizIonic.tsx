import { useState, useMemo } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonProgressBar,
  IonButtons,
  IonBadge,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonLabel,
  useIonToast,
  useIonRouter,
} from '@ionic/react';
import { checkmarkCircle, heart, arrowBack } from 'ionicons/icons';
import { quizQuestions } from '../../data/quizQuestions';
import { saveTestResult, TestResult, getUserId, getCoupleId } from '../../utils/storage';
import { loveLanguages } from '../../data/loveLanguages';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import './QuizIonic.css';

interface QuizIonicProps {
  onComplete: (results: Record<string, number>) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizIonic({ onComplete }: QuizIonicProps) {
  const router = useIonRouter();
  const [present] = useIonToast();

  const selectedQuestions = useMemo(() => {
    const shuffled = shuffleArray(quizQuestions);
    const selected = shuffled.slice(0, 15);
    
    return selected.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number>(-1);

  const progress = ((currentQuestion + 1) / selectedQuestions.length);
  const question = selectedQuestions[currentQuestion];

  const handleAnswer = async () => {
    if (selectedOption === -1) {
      present({
        message: 'Veuillez sélectionner une réponse',
        duration: 2000,
        color: 'warning',
      });
      return;
    }

    const option = question.options[selectedOption];
    const language = option.language;

    const newAnswers = { ...answers };
    newAnswers[language] = (newAnswers[language] || 0) + 1;
    setAnswers(newAnswers);

    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(-1);
    } else {
      // Quiz terminé
      const primaryLanguageId = Object.keys(newAnswers).reduce((a, b) => 
        newAnswers[a] > newAnswers[b] ? a : b
      );
      
      const primaryLangData = loveLanguages.find(l => l.id === primaryLanguageId);
      
      const testResult: TestResult = {
        id: `test_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        date: new Date().toISOString(),
        scores: newAnswers,
        primaryLanguage: primaryLangData?.name || primaryLanguageId,
        primaryLanguageId: primaryLanguageId,
      };
      
      saveTestResult(testResult);

      // Update couple link if user is in a couple
      const coupleId = getCoupleId();
      if (coupleId) {
        updateCoupleResult(coupleId, getUserId(), testResult.id, testResult);
      }

      // Add XP
      import('../../utils/progressionHelper').then(({ addXP, showXPNotification, showLevelUpNotification }) => {
        addXP('quiz_complete').then(result => {
          if (result.success) {
            showXPNotification(result.xpGained, 'quiz_complete');
            if (result.leveledUp) {
              showLevelUpNotification(0);
            }
          }
        });
      });

      onComplete(newAnswers);
      
      present({
        message: '🎉 Quiz complété ! +100 XP',
        duration: 3000,
        color: 'success',
      });

      setTimeout(() => {
        router.push('/results');
      }, 500);
    }
  };

  const updateCoupleResult = async (coupleId: string, userId: string, resultId: string, result: TestResult) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/update-result`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            resultId,
            result,
          }),
        }
      );
    } catch (error) {
      console.error('Error updating couple result:', error);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => router.push('/dashboard')}>
              <IonIcon icon={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>Quiz des 5 Langages</IonTitle>
          <IonButtons slot="end">
            <IonBadge color="primary">
              {currentQuestion + 1}/{selectedQuestions.length}
            </IonBadge>
          </IonButtons>
        </IonToolbar>
        <IonProgressBar value={progress} color="primary" />
      </IonHeader>

      <IonContent fullscreen className="ion-padding quiz-content">
        <div className="quiz-container">
          {/* Question Card */}
          <IonCard className="question-card">
            <IonCardContent>
              <div className="question-number">
                Question {currentQuestion + 1} sur {selectedQuestions.length}
              </div>
              <h2 className="question-text">{question.question}</h2>
            </IonCardContent>
          </IonCard>

          {/* Options */}
          <IonList className="options-list">
            <IonRadioGroup value={selectedOption} onIonChange={e => setSelectedOption(e.detail.value)}>
              {question.options.map((option, index) => (
                <IonItem
                  key={index}
                  className={`option-item ${selectedOption === index ? 'selected' : ''}`}
                  button
                  detail={false}
                >
                  <IonRadio slot="start" value={index} />
                  <IonLabel className="ion-text-wrap">
                    {option.text}
                  </IonLabel>
                  {selectedOption === index && (
                    <IonIcon icon={checkmarkCircle} color="primary" slot="end" />
                  )}
                </IonItem>
              ))}
            </IonRadioGroup>
          </IonList>

          {/* Submit Button */}
          <IonButton
            expand="block"
            size="large"
            onClick={handleAnswer}
            disabled={selectedOption === -1}
            className="submit-button"
          >
            {currentQuestion < selectedQuestions.length - 1 ? (
              <>
                Suivant
                <IonIcon slot="end" icon={heart} />
              </>
            ) : (
              <>
                Terminer
                <IonIcon slot="end" icon={checkmarkCircle} />
              </>
            )}
          </IonButton>

          {/* Progress Text */}
          <div className="progress-text">
            {Math.round(progress * 100)}% complété
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
