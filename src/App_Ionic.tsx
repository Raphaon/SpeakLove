import { useState, useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Custom styles */
import './styles/globals.css';
import './styles/ionic-overrides.css';

/* Pages */
import { DashboardIonic } from './components/ionic/DashboardIonic';
import { QuizIonic } from './components/ionic/QuizIonic';
import { ResultsIonic } from './components/ionic/ResultsIonic';
import { ProfileSetupIonic } from './components/ionic/ProfileSetupIonic';
import { ConversationQuestionsIonic } from './components/ionic/ConversationQuestionsIonic';
import { PartnerQuizLobbyIonic } from './components/ionic/PartnerQuizLobbyIonic';
import { PartnerQuizGameIonic } from './components/ionic/PartnerQuizGameIonic';
import { PartnerQuizResultsIonic } from './components/ionic/PartnerQuizResultsIonic';
import { UserProfileIonic } from './components/ionic/UserProfileIonic';
import { LoveLinguaIonic } from './components/ionic/LoveLinguaIonic';
import { OnboardingIonic } from './components/ionic/OnboardingIonic';
import { getCoupleId, hasUserProfile } from './utils/storage';

setupIonicReact({
  mode: 'ios', // Force iOS mode for consistent design
  rippleEffect: true,
  swipeBackEnabled: true,
});

export default function App() {
  const [quizResults, setQuizResults] = useState<Record<string, number> | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [coupleId, setCoupleId] = useState<string>('');
  
  // Partner quiz state
  const [partnerQuizSessionId, setPartnerQuizSessionId] = useState<string>('');
  const [partnerQuizPartnerId, setPartnerQuizPartnerId] = useState<string>('');
  const [partnerQuizPartnerName, setPartnerQuizPartnerName] = useState<string>('');

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
      setIsInitialized(true);
      return;
    }
    
    // Load coupleId from localStorage on mount
    const savedCoupleId = getCoupleId();
    if (savedCoupleId) {
      setCoupleId(savedCoupleId);
    }
    
    setIsInitialized(true);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setShowOnboarding(false);
  };

  const handleQuizComplete = (results: Record<string, number>) => {
    setQuizResults(results);
  };

  const handlePartnerQuizStart = (sessionId: string, partnerId: string, partnerName: string) => {
    setPartnerQuizSessionId(sessionId);
    setPartnerQuizPartnerId(partnerId);
    setPartnerQuizPartnerName(partnerName);
  };

  const handleCoupleLinked = (cId: string) => {
    setCoupleId(cId);
  };

  if (!isInitialized) {
    return null;
  }

  if (showOnboarding) {
    return (
      <IonApp>
        <OnboardingIonic onComplete={handleOnboardingComplete} />
      </IonApp>
    );
  }

  // Check if user needs profile setup
  if (!hasUserProfile()) {
    return (
      <IonApp>
        <ProfileSetupIonic />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Dashboard - Home */}
          <Route exact path="/dashboard">
            <DashboardIonic />
          </Route>

          {/* Quiz */}
          <Route exact path="/quiz">
            <QuizIonic onComplete={handleQuizComplete} />
          </Route>

          {/* Results */}
          <Route exact path="/results">
            <ResultsIonic results={quizResults} />
          </Route>

          {/* Conversation Questions */}
          <Route exact path="/questions">
            <ConversationQuestionsIonic />
          </Route>

          {/* Partner Quiz */}
          <Route exact path="/partner-quiz">
            <PartnerQuizLobbyIonic onGameStart={handlePartnerQuizStart} />
          </Route>

          <Route exact path="/partner-quiz/game">
            <PartnerQuizGameIonic
              sessionId={partnerQuizSessionId}
              partnerId={partnerQuizPartnerId}
              partnerName={partnerQuizPartnerName}
            />
          </Route>

          <Route exact path="/partner-quiz/results">
            <PartnerQuizResultsIonic
              sessionId={partnerQuizSessionId}
              partnerId={partnerQuizPartnerId}
            />
          </Route>

          {/* User Profile */}
          <Route exact path="/profile">
            <UserProfileIonic />
          </Route>

          {/* LoveLingua - Couple Features */}
          <Route exact path="/lovelingu">
            <LoveLinguaIonic coupleId={coupleId} onCoupleLinked={handleCoupleLinked} />
          </Route>

          {/* Default redirect */}
          <Route exact path="/">
            <Redirect to="/dashboard" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
