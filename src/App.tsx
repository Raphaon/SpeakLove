import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Toaster } from 'sonner';
import './styles/mobile-se.css';
import { Dashboard } from './components/Dashboard';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Suggestions } from './components/Suggestions';
import { ConversationQuestions } from './components/ConversationQuestions';
import { InfoPage } from './components/InfoPage';
import { MultiplayerLobby } from './components/MultiplayerLobby';
import { MultiplayerGame } from './components/MultiplayerGame';
import { HistoryPage } from './components/HistoryPage';
import { CoupleSetup } from './components/CoupleSetup';
import { CoupleComparison } from './components/CoupleComparison';
import { LoveLingua } from './components/LoveLingua';
import { QuestHistory } from './components/QuestHistory';
import { ProfileSetup } from './components/ProfileSetup';
import { ProfileSettings } from './components/ProfileSettings';
import { SharedWishlist } from './components/SharedWishlist';
import { EmotionalCheckIn } from './components/EmotionalCheckIn';
import { DigitalCoupons } from './components/DigitalCoupons';
import { GratitudeWall } from './components/GratitudeWall';
import { Onboarding } from './components/Onboarding';
import { PartnerQuizLobby } from './components/PartnerQuizLobby';
import { PartnerQuizGame } from './components/PartnerQuizGame';
import { PartnerQuizResults } from './components/PartnerQuizResults';
import { UserProfile } from './components/UserProfile';
import { getCoupleId, hasUserProfile } from './utils/storage';

export default function App() {
  const [quizResults, setQuizResults] = useState<Record<string, number> | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Multiplayer game state
  const [gameId, setGameId] = useState<string>('');
  const [playerId, setPlayerId] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');

  // Couple mode state
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
    } else if (!hasUserProfile()) {
      setShowProfileSetup(true);
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
    
    // Check if profile setup is needed
    if (!hasUserProfile()) {
      setShowProfileSetup(true);
    }
  };

  const handleProfileSetupComplete = () => {
    setShowProfileSetup(false);
  };

  const handleQuizComplete = (results: Record<string, number>) => {
    setQuizResults(results);
  };

  const handleGameStart = (gId: string, pId: string, pName: string) => {
    setGameId(gId);
    setPlayerId(pId);
    setPlayerName(pName);
  };

  const handleLeaveGame = () => {
    setGameId('');
    setPlayerId('');
    setPlayerName('');
  };

  const handleCoupleLinked = (cId: string) => {
    setCoupleId(cId);
  };

  const handlePartnerQuizStart = (sessionId: string, partnerId: string, partnerName: string) => {
    setPartnerQuizSessionId(sessionId);
    setPartnerQuizPartnerId(partnerId);
    setPartnerQuizPartnerName(partnerName);
  };

  const handlePartnerQuizFinish = (sessionId: string) => {
    setPartnerQuizSessionId(sessionId);
  };

  if (!isInitialized) {
    return null;
  }

  // Show onboarding if user hasn't seen it
  if (showOnboarding) {
    return (
      <>
        <Onboarding onComplete={handleOnboardingComplete} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  // Show profile setup if needed
  if (showProfileSetup) {
    return (
      <>
        <ProfileSetup onComplete={handleProfileSetupComplete} />
        <Toaster position="top-center" richColors />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route
          path="/quiz"
          render={() => <Quiz onComplete={handleQuizComplete} />}
        />
        <Route
          path="/results"
          render={() => <Results results={quizResults} />}
        />
        <Route path="/suggestions" component={Suggestions} />
        <Route path="/questions" component={ConversationQuestions} />
        <Route path="/info" component={InfoPage} />
        <Route
          path="/multiplayer"
          render={() => <MultiplayerLobby onGameStart={handleGameStart} />}
        />
        <Route
          path="/multiplayer-game"
          render={() =>
            gameId && playerId ? (
              <MultiplayerGame
                gameId={gameId}
                playerId={playerId}
                playerName={playerName}
                onLeave={handleLeaveGame}
              />
            ) : (
              <Redirect to="/multiplayer" />
            )
          }
        />
        <Route path="/history" component={HistoryPage} />
        <Route
          path="/couple-setup"
          render={() => <CoupleSetup onCoupleLinked={handleCoupleLinked} />}
        />
        <Route
          path="/couple-comparison"
          render={() =>
            coupleId ? <CoupleComparison coupleId={coupleId} /> : <Redirect to="/couple-setup" />
          }
        />
        <Route
          path="/lovelingu"
          render={() => (coupleId ? <LoveLingua coupleId={coupleId} /> : <Redirect to="/couple-setup" />)}
        />
        <Route
          path="/quest-history"
          render={() => (coupleId ? <QuestHistory coupleId={coupleId} /> : <Redirect to="/lovelingu" />)}
        />
        <Route path="/profile-settings" component={ProfileSettings} />
        <Route path="/wishlist" component={SharedWishlist} />
        <Route path="/checkin" component={EmotionalCheckIn} />
        <Route path="/coupons" component={DigitalCoupons} />
        <Route path="/gratitude" component={GratitudeWall} />
        <Route
          path="/partner-quiz"
          render={() => <PartnerQuizLobby onGameStart={handlePartnerQuizStart} />}
        />
        <Route
          path="/partner-quiz-game"
          render={() =>
            partnerQuizSessionId ? (
              <PartnerQuizGame
                sessionId={partnerQuizSessionId}
                partnerId={partnerQuizPartnerId}
                partnerName={partnerQuizPartnerName}
                onFinish={handlePartnerQuizFinish}
              />
            ) : (
              <Redirect to="/partner-quiz" />
            )
          }
        />
        <Route
          path="/partner-quiz-results"
          render={() =>
            partnerQuizSessionId ? (
              <PartnerQuizResults sessionId={partnerQuizSessionId} partnerId={partnerQuizPartnerId} />
            ) : (
              <Redirect to="/partner-quiz" />
            )
          }
        />
        <Route path="/user-profile" component={UserProfile} />
        <Redirect to="/" />
      </Switch>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}
