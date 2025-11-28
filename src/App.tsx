import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner@2.0.3';
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
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz onComplete={handleQuizComplete} />} />
        <Route path="/results" element={<Results results={quizResults} />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/questions" element={<ConversationQuestions />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/multiplayer" element={<MultiplayerLobby onGameStart={handleGameStart} />} />
        <Route 
          path="/multiplayer-game" 
          element={
            gameId && playerId ? (
              <MultiplayerGame
                gameId={gameId}
                playerId={playerId}
                playerName={playerName}
                onLeave={handleLeaveGame}
              />
            ) : (
              <Navigate to="/multiplayer" replace />
            )
          } 
        />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/couple-setup" element={<CoupleSetup onCoupleLinked={handleCoupleLinked} />} />
        <Route 
          path="/couple-comparison" 
          element={
            coupleId ? (
              <CoupleComparison coupleId={coupleId} />
            ) : (
              <Navigate to="/couple-setup" replace />
            )
          } 
        />
        <Route 
          path="/lovelingu" 
          element={
            coupleId ? (
              <LoveLingua coupleId={coupleId} />
            ) : (
              <Navigate to="/couple-setup" replace />
            )
          } 
        />
        <Route 
          path="/quest-history" 
          element={
            coupleId ? (
              <QuestHistory coupleId={coupleId} />
            ) : (
              <Navigate to="/lovelingu" replace />
            )
          } 
        />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/wishlist" element={<SharedWishlist />} />
        <Route path="/checkin" element={<EmotionalCheckIn />} />
        <Route path="/coupons" element={<DigitalCoupons />} />
        <Route path="/gratitude" element={<GratitudeWall />} />
        <Route path="/partner-quiz" element={<PartnerQuizLobby onGameStart={handlePartnerQuizStart} />} />
        <Route 
          path="/partner-quiz-game" 
          element={
            partnerQuizSessionId ? (
              <PartnerQuizGame
                sessionId={partnerQuizSessionId}
                partnerId={partnerQuizPartnerId}
                partnerName={partnerQuizPartnerName}
                onFinish={handlePartnerQuizFinish}
              />
            ) : (
              <Navigate to="/partner-quiz" replace />
            )
          } 
        />
        <Route 
          path="/partner-quiz-results" 
          element={
            partnerQuizSessionId ? (
              <PartnerQuizResults
                sessionId={partnerQuizSessionId}
                partnerId={partnerQuizPartnerId}
              />
            ) : (
              <Navigate to="/partner-quiz" replace />
            )
          } 
        />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
}
