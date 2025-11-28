import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Plus, LogIn, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { conversationQuestions } from '../data/conversationQuestions';
import { projectId, publicAnonKey } from '../utils/supabase/info.tsx';

interface MultiplayerLobbyProps {
  onNavigate: (page: string) => void;
  onGameStart: (gameId: string, playerId: string, playerName: string) => void;
}

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function MultiplayerLobby({ onNavigate, onGameStart }: MultiplayerLobbyProps) {
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59`;

  // Check server health on mount
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        const response = await fetch(`${serverUrl}/health`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          signal: AbortSignal.timeout(5000), // 5 second timeout
        });
        
        if (response.ok) {
          setServerStatus('online');
        } else {
          setServerStatus('offline');
        }
      } catch (err) {
        console.error('Server health check failed:', err);
        setServerStatus('offline');
      }
    };

    checkServerHealth();
  }, []);

  const handleCreateGame = async () => {
    if (!playerName.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Select 20 random questions for the game
      const shuffledQuestions = shuffleArray(conversationQuestions);
      const selectedQuestions = shuffledQuestions.slice(0, 20);

      const response = await fetch(`${serverUrl}/game/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          playerName: playerName.trim(),
          questions: selectedQuestions,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error creating game:', response.status, errorText);
        throw new Error(`Impossible de créer la partie (${response.status})`);
      }

      const data = await response.json();
      console.log('Game created:', data);

      onGameStart(data.gameId, data.playerId, playerName.trim());
    } catch (err) {
      console.error('Error creating game:', err);
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Erreur de connexion au serveur. Vérifiez votre connexion internet et réessayez.');
      } else {
        setError(err instanceof Error ? err.message : 'Erreur lors de la création de la partie');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGame = async () => {
    if (!playerName.trim()) {
      setError('Veuillez entrer votre nom');
      return;
    }

    if (!gameCode.trim()) {
      setError('Veuillez entrer le code de la partie');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${serverUrl}/game/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          gameCode: gameCode.trim().toUpperCase(),
          playerName: playerName.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Impossible de rejoindre la partie');
      }

      const data = await response.json();
      console.log('Joined game:', data);

      onGameStart(data.gameId, data.playerId, playerName.trim());
    } catch (err) {
      console.error('Error joining game:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors de la connexion à la partie');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('home')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-gray-900">Mode Multijoueur</h1>
              <p className="text-sm text-gray-600">Jouez à deux pour mieux vous connaître</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        {/* Server Status Indicator */}
        {serverStatus === 'checking' && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <div className="flex-1">
              <p className="text-sm text-blue-900">Vérification de la connexion au serveur...</p>
            </div>
          </div>
        )}
        
        {serverStatus === 'offline' && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-amber-900">
                  <span className="font-medium">Serveur non disponible</span>
                </p>
                <p className="text-xs text-amber-800 mt-1">
                  Le serveur backend n'est pas accessible. Assurez-vous que votre Edge Function Supabase est déployée.
                </p>
              </div>
            </div>
          </div>
        )}
        
        {serverStatus === 'online' && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-sm text-green-900">Serveur connecté</p>
          </div>
        )}
        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="create" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Créer une partie
            </TabsTrigger>
            <TabsTrigger value="join" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Rejoindre
            </TabsTrigger>
          </TabsList>

          {/* Create Game Tab */}
          <TabsContent value="create">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="mb-6 text-center">
                <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-gray-900 mb-2">Créer une nouvelle partie</h2>
                <p className="text-gray-600 text-sm">
                  Créez une partie et invitez un ami avec le code généré
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="create-name">Votre nom</Label>
                  <Input
                    id="create-name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Entrez votre nom"
                    className="mt-2"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleCreateGame}
                  disabled={loading || !playerName.trim()}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-5 w-5" />
                      Créer la partie
                    </>
                  )}
                </Button>

                <div className="mt-6 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <p className="text-sm text-purple-900">
                    💡 <span className="font-medium">Comment ça marche ?</span>
                  </p>
                  <ul className="text-sm text-purple-800 mt-2 space-y-1 ml-4 list-disc">
                    <li>Créez une partie et recevez un code unique</li>
                    <li>Partagez ce code avec votre ami(e)</li>
                    <li>Répondez aux questions à tour de rôle</li>
                    <li>Utilisez le chat pour discuter de vos réponses</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Join Game Tab */}
          <TabsContent value="join">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="mb-6 text-center">
                <div className="inline-block p-4 bg-pink-100 rounded-full mb-4">
                  <LogIn className="h-8 w-8 text-pink-600" />
                </div>
                <h2 className="text-gray-900 mb-2">Rejoindre une partie</h2>
                <p className="text-gray-600 text-sm">
                  Entrez le code que votre ami vous a partagé
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="join-name">Votre nom</Label>
                  <Input
                    id="join-name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder="Entrez votre nom"
                    className="mt-2"
                    disabled={loading}
                  />
                </div>

                <div>
                  <Label htmlFor="game-code">Code de la partie</Label>
                  <Input
                    id="game-code"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                    placeholder="Ex: ABC123"
                    className="mt-2 text-center tracking-widest text-xl"
                    maxLength={6}
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleJoinGame}
                  disabled={loading || !playerName.trim() || !gameCode.trim()}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-6 rounded-2xl shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Rejoindre la partie
                    </>
                  )}
                </Button>

                <div className="mt-6 p-4 bg-pink-50 rounded-2xl border border-pink-100">
                  <p className="text-sm text-pink-900">
                    💡 <span className="font-medium">Astuce :</span> Demandez le code à 6 lettres/chiffres 
                    à la personne qui a créé la partie.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Info Section */}
        <div className="mt-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
          <h3 className="text-gray-900 mb-3">À propos du mode multijoueur</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le mode multijoueur vous permet de découvrir votre partenaire, ami(e) ou proche 
            de manière ludique et interactive. Répondez aux questions à tour de rôle, 
            discutez dans le chat intégré, et apprenez-en plus l'un sur l'autre !
          </p>
        </div>
      </div>
    </div>
  );
}