import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon,
  IonButtons,
  IonChip,
  IonCard,
  IonCardContent,
  useIonRouter,
} from '@ionic/react';
import {
  arrowBack,
  shuffle,
  heart,
  heartOutline,
  chevronForward,
} from 'ionicons/icons';
import { useState, useMemo } from 'react';
import { conversationQuestions, themes, depths } from '../../data/conversationQuestions';
import './ConversationQuestionsIonic.css';

export function ConversationQuestionsIonic() {
  const router = useIonRouter();
  const [selectedTheme, setSelectedTheme] = useState('all');
  const [selectedDepth, setSelectedDepth] = useState('all');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [savedQuestions, setSavedQuestions] = useState<number[]>([]);

  const filteredQuestions = useMemo(() => {
    let filtered = conversationQuestions;
    
    if (selectedTheme !== 'all') {
      filtered = filtered.filter(q => q.theme === selectedTheme);
    }
    
    if (selectedDepth !== 'all') {
      filtered = filtered.filter(q => q.depth === selectedDepth);
    }
    
    return filtered;
  }, [selectedTheme, selectedDepth]);

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestionIndex(randomIndex);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const toggleSaveQuestion = () => {
    if (!currentQuestion) return;
    
    if (savedQuestions.includes(currentQuestion.id)) {
      setSavedQuestions(savedQuestions.filter(id => id !== currentQuestion.id));
    } else {
      setSavedQuestions([...savedQuestions, currentQuestion.id]);
    }
  };

  const getDepthColor = (depth: string) => {
    switch (depth) {
      case 'light': return 'primary';
      case 'medium': return 'secondary';
      case 'deep': return 'tertiary';
      default: return 'medium';
    }
  };

  const getDepthLabel = (depth: string) => {
    switch (depth) {
      case 'light': return 'Léger';
      case 'medium': return 'Moyen';
      case 'deep': return 'Profond';
      default: return depth;
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
          <IonTitle>Questions de conversation</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Stats */}
        <div className="text-center mb-4">
          <p className="text-gray-600 text-sm">
            {filteredQuestions.length} question{filteredQuestions.length > 1 ? 's' : ''} disponible{filteredQuestions.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Theme Filter */}
        <div className="mb-4">
          <h3 className="text-sm text-gray-700 mb-2 px-1">Thème</h3>
          <div className="overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex gap-2 px-1">
              {themes.map((theme) => (
                <IonChip
                  key={theme.id}
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    setCurrentQuestionIndex(0);
                  }}
                  color={selectedTheme === theme.id ? 'primary' : 'medium'}
                  outline={selectedTheme !== theme.id}
                  className="flex-shrink-0"
                >
                  <span className="mr-1">{theme.icon}</span>
                  {theme.label}
                </IonChip>
              ))}
            </div>
          </div>
        </div>

        {/* Depth Filter */}
        <div className="mb-4">
          <h3 className="text-sm text-gray-700 mb-2 px-1">Niveau de profondeur</h3>
          <div className="flex gap-2 px-1">
            {depths.map((depth) => (
              <IonChip
                key={depth.id}
                onClick={() => {
                  setSelectedDepth(depth.id);
                  setCurrentQuestionIndex(0);
                }}
                color={selectedDepth === depth.id ? 'primary' : 'medium'}
                outline={selectedDepth !== depth.id}
                className="flex-1 justify-center"
              >
                {depth.label}
              </IonChip>
            ))}
          </div>
        </div>

        {/* Question Card */}
        {currentQuestion ? (
          <IonCard className="question-card gradient-primary text-white mb-4">
            <IonCardContent className="ion-padding">
              <div className="flex items-center justify-between mb-4">
                <IonChip color={getDepthColor(currentQuestion.depth)} className="bg-white">
                  <span className="text-xs">{getDepthLabel(currentQuestion.depth)}</span>
                </IonChip>
                <IonButton fill="clear" onClick={toggleSaveQuestion} className="text-white">
                  <IonIcon
                    icon={savedQuestions.includes(currentQuestion.id) ? heart : heartOutline}
                    slot="icon-only"
                  />
                </IonButton>
              </div>
              
              <p className="text-xl leading-relaxed mb-6 text-white">
                {currentQuestion.question}
              </p>
              
              <div className="flex items-center justify-between text-white opacity-80 text-sm">
                <span>
                  {themes.find(t => t.id === currentQuestion.theme)?.icon}{' '}
                  {themes.find(t => t.id === currentQuestion.theme)?.label}
                </span>
                <span>
                  {currentQuestionIndex + 1} / {filteredQuestions.length}
                </span>
              </div>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonCard className="mb-4">
            <IonCardContent className="text-center">
              <p className="text-gray-500">Aucune question disponible avec ces filtres</p>
            </IonCardContent>
          </IonCard>
        )}

        {/* Action Buttons */}
        {currentQuestion && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <IonButton
              expand="block"
              fill="outline"
              onClick={handleRandomQuestion}
              size="large"
            >
              <IonIcon icon={shuffle} slot="start" />
              Aléatoire
            </IonButton>
            <IonButton
              expand="block"
              onClick={handleNextQuestion}
              size="large"
              color="primary"
            >
              Suivante
              <IonIcon icon={chevronForward} slot="end" />
            </IonButton>
          </div>
        )}

        {/* Saved Questions */}
        {savedQuestions.length > 0 && (
          <IonCard className="mt-6">
            <IonCardContent>
              <h3 className="mb-3 flex items-center gap-2">
                <IonIcon icon={heart} color="primary" />
                <span>Questions sauvegardées ({savedQuestions.length})</span>
              </h3>
              <div className="space-y-2">
                {savedQuestions.map(id => {
                  const q = conversationQuestions.find(question => question.id === id);
                  return q ? (
                    <div key={id} className="text-sm text-gray-700 p-3 bg-gray-50 rounded-lg">
                      {q.question}
                    </div>
                  ) : null;
                })}
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Spacer */}
        <div className="h-8" />
      </IonContent>
    </IonPage>
  );
}
