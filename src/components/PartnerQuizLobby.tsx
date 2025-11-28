import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Users, ArrowLeft, Copy, Check, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getUserId, getUserProfile } from '../utils/storage';

interface PartnerQuizLobbyProps {
  onNavigate: (page: string) => void;
  onGameStart: (sessionId: string, partnerId: string, partnerName: string) => void;
}

export function PartnerQuizLobby({ onNavigate, onGameStart }: PartnerQuizLobbyProps) {
  const [mode, setMode] = useState<'select' | 'create' | 'join'>('select');
  const [code, setCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const profile = getUserProfile();
  const userId = getUserId();
  const userName = profile?.firstName || 'Utilisateur';

  const handleCreate = async () => {
    setLoading(true);
    setError('');

    try {
      // Import questions
      const { getBalancedQuestions } = await import('../data/partnerQuizQuestions');
      const questions = getBalancedQuestions();

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            partnerId: userId,
            partnerName: userName,
            questions,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCode(data.code);
        setCreatedSessionId(data.sessionId);
        setMode('create');
      } else {
        setError(data.error || 'Erreur lors de la création du quiz');
      }
    } catch (err) {
      console.error('Error creating quiz:', err);
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) {
      setError('Veuillez entrer un code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/join`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            code: joinCode.trim().toUpperCase(),
            partnerId: userId,
            partnerName: userName,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        onGameStart(data.sessionId, userId, userName);
      } else {
        setError(data.error || 'Code invalide');
      }
    } catch (err) {
      console.error('Error joining quiz:', err);
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Poll for partner joining - store sessionId when creating
  const [createdSessionId, setCreatedSessionId] = useState('');

  const checkForPartner = async () => {
    if (!createdSessionId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${createdSessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.session?.partnerBId) {
          onGameStart(data.session.id, userId, userName);
        }
      }
    } catch (err) {
      console.error('Error checking for partner:', err);
    }
  };

  // Start polling when code is created
  useEffect(() => {
    if (mode === 'create' && createdSessionId) {
      const interval = setInterval(checkForPartner, 2000);
      return () => clearInterval(interval);
    }
  }, [mode, createdSessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE4E8] to-[#FFF5F7]">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-gray-900 flex items-center gap-2">
                <Heart className="h-6 w-6 text-[#E91E63] fill-current" />
                Connais-tu ton partenaire ?
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Mode selection */}
          {mode === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">❤️</div>
                <h2 className="text-gray-900 mb-3">Quiz de Couple</h2>
                <p className="text-gray-600">
                  15 questions • 30 secondes par question<br />
                  Chacun répond sur son téléphone
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCreate}
                disabled={loading}
                className="w-full p-8 rounded-3xl bg-gradient-to-br from-[#E91E63] to-[#F06292] text-white shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-white mb-2 flex items-center gap-2">
                      <Users className="h-6 w-6" />
                      Créer un quiz
                    </h3>
                    <p className="text-white/90 text-sm">
                      Générer un code pour inviter votre partenaire
                    </p>
                  </div>
                  {loading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    <div className="text-4xl">➡️</div>
                  )}
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMode('join')}
                className="w-full p-8 rounded-3xl bg-white border-2 border-[#E91E63] shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <h3 className="text-gray-900 mb-2 flex items-center gap-2">
                      <Heart className="h-6 w-6 text-[#E91E63]" />
                      Rejoindre un quiz
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Entrer le code partagé par votre partenaire
                    </p>
                  </div>
                  <div className="text-4xl">🔗</div>
                </div>
              </motion.button>

              <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                <h4 className="text-blue-900 mb-2 flex items-center gap-2">
                  ℹ️ Comment ça marche ?
                </h4>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Une personne crée le quiz et partage le code</li>
                  <li>• L'autre personne rejoint avec le code</li>
                  <li>• Vous répondez tous les deux en même temps</li>
                  <li>• À la fin, découvrez si vous vous connaissez bien !</li>
                </ul>
              </div>
            </motion.div>
          )}

          {/* Create mode - waiting for partner */}
          {mode === 'create' && code && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4 animate-pulse">💕</div>
                <h2 className="text-gray-900 mb-3">En attente de votre partenaire...</h2>
                <p className="text-gray-600">
                  Partagez ce code avec votre partenaire
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <p className="text-center text-gray-600 mb-4">Code de session</p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="text-5xl tracking-widest text-[#E91E63] select-all">
                    {code}
                  </div>
                  <Button
                    onClick={handleCopy}
                    size="lg"
                    variant="outline"
                    className="rounded-2xl border-2 border-[#E91E63] text-[#E91E63] hover:bg-[#FFE4E8]"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-5 w-5" />
                        Copier
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">En attente de connexion...</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  setMode('select');
                  setCode('');
                }}
                variant="outline"
                className="w-full py-6 rounded-2xl border-2 border-gray-200"
              >
                Annuler
              </Button>
            </motion.div>
          )}

          {/* Join mode */}
          {mode === 'join' && (
            <motion.div
              key="join"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🔗</div>
                <h2 className="text-gray-900 mb-3">Rejoindre un quiz</h2>
                <p className="text-gray-600">
                  Entrez le code à 6 caractères
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2 ml-1">
                    Code de session
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: ABC123"
                    value={joinCode}
                    onChange={(e) => {
                      setJoinCode(e.target.value.toUpperCase());
                      setError('');
                    }}
                    maxLength={6}
                    className="w-full px-6 py-4 text-center text-2xl tracking-widest rounded-2xl bg-[#FFF5F7] border-2 border-gray-200 focus:border-[#E91E63] focus:ring-0 text-gray-900 placeholder:text-gray-400 uppercase"
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 text-center">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <Button
                  onClick={handleJoin}
                  disabled={loading || joinCode.length !== 6}
                  className="w-full py-6 rounded-2xl bg-gradient-to-r from-[#E91E63] to-[#F06292] hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Connexion...
                    </>
                  ) : (
                    <>
                      Rejoindre le quiz
                      <Heart className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </div>

              <Button
                onClick={() => {
                  setMode('select');
                  setJoinCode('');
                  setError('');
                }}
                variant="outline"
                className="w-full py-6 rounded-2xl border-2 border-gray-200"
              >
                Retour
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
