import { useState, useEffect } from 'react';
import { ArrowLeft, Users, Copy, Check, Loader2, Link as LinkIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getUserId, saveCoupleId, getCoupleId, getUserPreferences, getLatestTestResult } from '../utils/storage';
import { motion } from 'motion/react';

interface CoupleSetupProps {
  onNavigate: (page: string) => void;
  onCoupleLinked: (coupleId: string) => void;
}

interface CoupleLink {
  id: string;
  code: string;
  user1Id: string;
  user1Name: string;
  user1LatestResultId?: string;
  user2Id?: string;
  user2Name?: string;
  user2LatestResultId?: string;
  status: 'waiting' | 'linked';
  createdAt: number;
}

export function CoupleSetup({ onNavigate, onCoupleLinked }: CoupleSetupProps) {
  const [mode, setMode] = useState<'choice' | 'create' | 'join'>('choice');
  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [existingCouple, setExistingCouple] = useState<CoupleLink | null>(null);

  const userId = getUserId();
  const prefs = getUserPreferences();
  const latestResult = getLatestTestResult();

  useEffect(() => {
    // Check if user already has a couple link
    checkExistingCouple();
  }, []);

  const checkExistingCouple = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/user/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      if (data.success && data.couple) {
        setExistingCouple(data.couple);
      }
    } catch (err) {
      console.error('Error checking existing couple:', err);
    }
  };

  const handleCreateLink = async () => {
    if (!name.trim()) {
      setError('Veuillez entrer votre prénom');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            userName: name.trim(),
            latestResultId: latestResult?.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la création du lien');
      }

      setGeneratedCode(data.coupleCode);
      saveCoupleId(data.coupleId);
      setExistingCouple(data.couple);
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinLink = async () => {
    if (!name.trim()) {
      setError('Veuillez entrer votre prénom');
      return;
    }

    if (!joinCode.trim()) {
      setError('Veuillez entrer le code de lien');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/join`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            coupleCode: joinCode.trim().toUpperCase(),
            userId,
            userName: name.trim(),
            latestResultId: latestResult?.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la liaison');
      }

      saveCoupleId(data.coupleId);
      onCoupleLinked(data.coupleId);
    } catch (err: any) {
      setError(err.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUnlink = async () => {
    if (!existingCouple) return;

    if (confirm('Êtes-vous sûr(e) de vouloir supprimer ce lien couple ?')) {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${existingCouple.id}`,
          {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (response.ok) {
          setExistingCouple(null);
          setGeneratedCode('');
          setMode('choice');
        }
      } catch (err) {
        console.error('Error unlinking couple:', err);
      }
    }
  };

  if (existingCouple && existingCouple.status === 'linked') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
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
              <h1 className="text-gray-900">Mode Couple</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
              <Users className="h-12 w-12 text-white" />
            </div>
            
            <h2 className="text-gray-900 mb-2">Vous êtes liés ! 💕</h2>
            <p className="text-gray-600 mb-6">
              Vous et {existingCouple.user1Id === userId ? existingCouple.user2Name : existingCouple.user1Name} êtes maintenant connectés
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => onCoupleLinked(existingCouple.id)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl"
              >
                Ouvrir LoveLingua
              </Button>

              <Button
                onClick={handleUnlink}
                variant="outline"
                className="w-full py-6 rounded-2xl border-2 border-red-200 text-red-600 hover:bg-red-50"
              >
                Supprimer le lien
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (generatedCode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="max-w-2xl mx-auto px-6 py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setGeneratedCode('');
                  setMode('choice');
                }}
                className="p-2"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-gray-900">Partager le code</h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <div className="text-center mb-6">
              <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                <LinkIcon className="h-12 w-12 text-purple-600" />
              </div>
              <h2 className="text-gray-900 mb-2">Lien créé !</h2>
              <p className="text-gray-600">
                Partagez ce code avec votre partenaire pour vous lier
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 mb-6">
              <p className="text-white/80 text-sm mb-2 text-center">Code de lien</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-4xl text-white tracking-widest">
                  {generatedCode}
                </span>
                <Button
                  onClick={handleCopyCode}
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
              <p className="text-sm text-purple-900">
                💡 <span className="font-medium">Astuce :</span> Votre partenaire doit créer un compte et
                entrer ce code dans "Rejoindre un lien"
              </p>
            </div>

            <Button
              onClick={() => onNavigate('home')}
              variant="outline"
              className="w-full mt-6 py-6 rounded-2xl"
            >
              Retour à l'accueil
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => mode === 'choice' ? onNavigate('home') : setMode('choice')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-gray-900">Mode Couple</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        {mode === 'choice' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-6">
                <Users className="h-12 w-12 text-white" />
              </div>
              
              <h2 className="text-gray-900 mb-2">Comparez vos langages</h2>
              <p className="text-gray-600 mb-8">
                Créez un lien avec votre partenaire pour découvrir vos langages d'amour et 
                recevoir des conseils personnalisés
              </p>

              <div className="space-y-3">
                <Button
                  onClick={() => setMode('create')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl"
                >
                  <LinkIcon className="mr-2 h-5 w-5" />
                  Créer un lien
                </Button>

                <Button
                  onClick={() => setMode('join')}
                  variant="outline"
                  className="w-full py-6 rounded-2xl border-2 border-purple-200 hover:bg-purple-50"
                >
                  Rejoindre un lien
                </Button>
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-gray-900 mb-3">✨ Fonctionnalités</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Comparaison visuelle de vos langages d'amour</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Conseils personnalisés pour mieux communiquer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500">•</span>
                  <span>Suggestions d'actions adaptées à chacun</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {mode === 'create' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-gray-900 mb-6">Créer un lien</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Votre prénom</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre prénom"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                  disabled={loading}
                />
              </div>

              {!latestResult && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-900">
                    ⚠️ Vous n'avez pas encore passé le quiz. Passez-le pour obtenir une 
                    comparaison complète avec votre partenaire.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
                <p className="text-sm text-red-900">{error}</p>
              </div>
            )}

            <Button
              onClick={handleCreateLink}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Création...
                </>
              ) : (
                'Créer le lien'
              )}
            </Button>
          </motion.div>
        )}

        {mode === 'join' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            <h2 className="text-gray-900 mb-6">Rejoindre un lien</h2>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm text-gray-700 mb-2">Votre prénom</label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez votre prénom"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Code de lien</label>
                <Input
                  type="text"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                  placeholder="Ex: ABC123"
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 tracking-widest"
                  maxLength={6}
                  disabled={loading}
                />
              </div>

              {!latestResult && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <p className="text-sm text-yellow-900">
                    ⚠️ Vous n'avez pas encore passé le quiz. Passez-le pour obtenir une 
                    comparaison complète avec votre partenaire.
                  </p>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-4">
                <p className="text-sm text-red-900">{error}</p>
              </div>
            )}

            <Button
              onClick={handleJoinLink}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-2xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connexion...
                </>
              ) : (
                'Rejoindre'
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}