import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Users, Trophy, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { ChatBox } from './ChatBox';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';

interface GameSession {
  id: string;
  code: string;
  hostPlayerId: string;
  hostPlayerName: string;
  guestPlayerId?: string;
  guestPlayerName?: string;
  currentTurn: 'host' | 'guest';
  currentQuestionIndex: number;
  questions: any[];
  messages: ChatMessage[];
  status: 'waiting' | 'playing' | 'finished';
  createdAt: number;
  typingStatus?: {
    playerId: string;
    playerName: string;
    timestamp: number;
  };
}

interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
}

interface MultiplayerGameProps {
  gameId: string;
  playerId: string;
  playerName: string;
  onNavigate: (page: string) => void;
  onLeave: () => void;
}

export function MultiplayerGame({ gameId, playerId, playerName, onNavigate, onLeave }: MultiplayerGameProps) {
  const [session, setSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const previousQuestionIndex = useRef<number>(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59`;

  // Initialize audio on mount
  useEffect(() => {
    // Create a simple notification sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playNotificationSound = () => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };
    
    audioRef.current = { play: playNotificationSound } as any;
  }, []);

  // Play sound when question changes
  useEffect(() => {
    if (session && session.status === 'playing') {
      if (previousQuestionIndex.current !== -1 && 
          session.currentQuestionIndex !== previousQuestionIndex.current) {
        // Question changed - play sound
        try {
          if (audioRef.current) {
            (audioRef.current as any).play();
          }
        } catch (err) {
          console.error('Error playing sound:', err);
        }
      }
      previousQuestionIndex.current = session.currentQuestionIndex;
    }
  }, [session?.currentQuestionIndex, session?.status]);

  // Fetch game session
  const fetchSession = async () => {
    try {
      const response = await fetch(`${serverUrl}/game/${gameId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response error:', response.status, errorText);
        throw new Error(`Failed to fetch game session: ${response.status}`);
      }

      const data = await response.json();
      setSession(data.session);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching session:', err);
      setError('Impossible de charger la session de jeu. Vérifiez votre connexion internet ou réessayez plus tard.');
      setLoading(false);
    }
  };

  // Poll for updates every 2 seconds
  useEffect(() => {
    fetchSession();
    const interval = setInterval(fetchSession, 2000);
    return () => clearInterval(interval);
  }, [gameId]);

  // Send chat message
  const handleSendMessage = async (message: string) => {
    try {
      const response = await fetch(`${serverUrl}/game/${gameId}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          playerId,
          playerName,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      // Immediately fetch updated session
      fetchSession();
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Continue to next question
  const handleContinue = async () => {
    try {
      const response = await fetch(`${serverUrl}/game/${gameId}/next`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          playerId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to continue');
      }

      // Immediately fetch updated session
      fetchSession();
    } catch (err) {
      console.error('Error continuing:', err);
    }
  };

  // Leave game
  const handleLeaveGame = async () => {
    try {
      await fetch(`${serverUrl}/game/${gameId}/leave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          playerId,
        }),
      });

      onLeave();
    } catch (err) {
      console.error('Error leaving game:', err);
      onLeave();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">Chargement de la partie...</p>
        </div>
      </div>
    );
  }

  if (error || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <p className="text-red-600 mb-4">{error || 'Session introuvable'}</p>
          <Button onClick={onLeave} className="bg-purple-500 hover:bg-purple-600">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const isHost = playerId === session.hostPlayerId;
  const isMyTurn = (session.currentTurn === 'host' && isHost) || (session.currentTurn === 'guest' && !isHost);
  const currentQuestion = session.questions[session.currentQuestionIndex];
  const otherPlayerName = isHost ? session.guestPlayerName : session.hostPlayerName;

  // Waiting for second player
  if (session.status === 'waiting') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLeaveGame}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-gray-900">En attente d'un joueur</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <div className="mb-6">
              <Users className="h-16 w-16 text-purple-500 mx-auto mb-4 animate-pulse" />
              <h2 className="text-gray-900 mb-2">En attente du second joueur</h2>
              <p className="text-gray-600">Partagez ce code pour inviter quelqu'un :</p>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 mb-6">
              <p className="text-xs text-gray-600 mb-2">Code de la partie</p>
              <p className="text-4xl tracking-widest text-purple-700">{session.code}</p>
            </div>

            <p className="text-sm text-gray-500">
              Le jeu commencera dès qu'un second joueur rejoindra la partie
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Game finished
  if (session.status === 'finished') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLeaveGame}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <h1 className="text-gray-900">Partie terminée</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl p-8 text-center shadow-xl">
            <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-gray-900 mb-2">Félicitations !</h2>
            <p className="text-gray-600 mb-6">
              Vous avez terminé toutes les questions. J'espère que vous vous connaissez mieux maintenant !
            </p>
            <Button
              onClick={handleLeaveGame}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Game playing
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLeaveGame}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-gray-900">Questions de connexion</h1>
              <p className="text-sm text-gray-600">
                Question {session.currentQuestionIndex + 1} / {session.questions.length}
              </p>
            </div>
          </div>

          {/* Players */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-3 rounded-xl border-2 ${isHost && isMyTurn ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`}>
              <p className="text-xs text-gray-500 mb-1">Hôte</p>
              <p className="text-sm text-gray-900">{session.hostPlayerName}</p>
              {isHost && isMyTurn && (
                <p className="text-xs text-purple-600 mt-1">À votre tour</p>
              )}
            </div>
            <div className={`p-3 rounded-xl border-2 ${!isHost && isMyTurn ? 'border-purple-500 bg-purple-50' : 'border-gray-200 bg-white'}`}>
              <p className="text-xs text-gray-500 mb-1">Invité</p>
              <p className="text-sm text-gray-900">{session.guestPlayerName}</p>
              {!isHost && isMyTurn && (
                <p className="text-xs text-purple-600 mt-1">À votre tour</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-6 space-y-6">
        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={session.currentQuestionIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl">
              <div className="mb-6">
                <span className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs mb-4">
                  {currentQuestion.theme}
                </span>
                {isMyTurn ? (
                  <p className="text-lg">
                    <span className="opacity-90">À {playerName} :</span>
                  </p>
                ) : (
                  <p className="text-lg">
                    <span className="opacity-90">À {otherPlayerName} :</span>
                  </p>
                )}
              </div>
              <p className="text-2xl leading-relaxed">
                {currentQuestion.question}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Chat Box */}
        <ChatBox
          messages={session.messages}
          currentPlayerId={playerId}
          currentPlayerName={playerName}
          onSendMessage={handleSendMessage}
          gameId={gameId}
          typingStatus={session.typingStatus}
        />

        {/* Continue Button */}
        <div className="space-y-3">
          {isMyTurn ? (
            <Button
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl shadow-lg"
            >
              Continuer
            </Button>
          ) : (
            <div className="bg-gray-100 rounded-2xl p-4 text-center">
              <p className="text-sm text-gray-600">
                En attente que {otherPlayerName} continue...
              </p>
            </div>
          )}

          <p className="text-xs text-center text-gray-500">
            💡 Vous pouvez répondre dans le chat ou simplement continuer
          </p>
        </div>
      </div>
    </div>
  );
}