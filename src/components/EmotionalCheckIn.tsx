import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Calendar, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { getUserId, getCoupleId, getUserProfile } from '../utils/storage';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'motion/react';

interface EmotionalCheckInProps {
  onNavigate: (page: string) => void;
}

interface CheckIn {
  id: string;
  userId: string;
  userName: string;
  date: string;
  feltLoved: string;
  needsTomorrow: string;
  createdAt: string;
}

export function EmotionalCheckIn({ onNavigate }: EmotionalCheckInProps) {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [feltLoved, setFeltLoved] = useState('');
  const [needsTomorrow, setNeedsTomorrow] = useState('');
  const [todayCheckIn, setTodayCheckIn] = useState<CheckIn | null>(null);
  const [coupleData, setCoupleData] = useState<any>(null);

  const userId = getUserId();
  const coupleId = getCoupleId();
  const profile = getUserProfile();

  useEffect(() => {
    if (coupleId) {
      loadData();
    }
  }, [coupleId]);

  const loadData = async () => {
    if (!coupleId) return;

    try {
      const [coupleRes, checkInsRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/checkins`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
      ]);

      const coupleData = await coupleRes.json();
      const checkInsData = await checkInsRes.json();

      if (coupleData.success) {
        setCoupleData(coupleData.couple);
      }

      if (checkInsData.success) {
        setCheckIns(checkInsData.checkIns || []);
        
        // Check if user already did today's check-in
        const today = new Date().toISOString().split('T')[0];
        const myTodayCheckIn = checkInsData.checkIns?.find(
          (c: CheckIn) => c.userId === userId && c.date === today
        );
        setTodayCheckIn(myTodayCheckIn || null);
      }
    } catch (err) {
      console.error('Error loading check-ins:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCheckIn = async () => {
    if (!feltLoved.trim() || !needsTomorrow.trim() || !coupleId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/checkins`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            userName: profile?.firstName || 'Utilisateur',
            date: new Date().toISOString().split('T')[0],
            feltLoved: feltLoved.trim(),
            needsTomorrow: needsTomorrow.trim(),
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setCheckIns([data.checkIn, ...checkIns]);
        setTodayCheckIn(data.checkIn);
        setFeltLoved('');
        setNeedsTomorrow('');
        setShowForm(false);
      }
    } catch (err) {
      console.error('Error submitting check-in:', err);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  };

  if (!coupleId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Vous devez être lié(e) en couple pour accéder à cette fonctionnalité.</p>
          <Button onClick={() => onNavigate('couple-setup')}>
            Créer un lien couple
          </Button>
        </div>
      </div>
    );
  }

  const partnerName = coupleData?.user1Id === userId ? coupleData?.user2Name : coupleData?.user1Name;
  const myCheckIns = checkIns.filter(c => c.userId === userId);
  const partnerCheckIns = checkIns.filter(c => c.userId !== userId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('dashboard')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-gray-900">Check-in Émotionnel</h1>
              <p className="text-sm text-gray-600">Communication lente et profonde 🌙</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pt-8 space-y-6">
        {/* Today's Check-in Card */}
        {!todayCheckIn ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white shadow-xl"
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🌙</div>
              <h2 className="mb-2">Votre check-in du soir</h2>
              <p className="text-white/80">Prenez un moment pour vous connecter à vos émotions</p>
            </div>

            {!showForm ? (
              <Button
                onClick={() => setShowForm(true)}
                className="w-full py-6 bg-white text-purple-600 hover:bg-white/90"
              >
                Commencer mon check-in d'aujourd'hui
              </Button>
            ) : (
              <div className="space-y-6">
                {/* Question 1 */}
                <div>
                  <label className="block text-white/90 mb-3">
                    Comment t'es-tu senti(e) aimé(e) aujourd'hui ? 💕
                  </label>
                  <textarea
                    value={feltLoved}
                    onChange={(e) => setFeltLoved(e.target.value)}
                    placeholder="Ex: Mon partenaire m'a préparé le petit-déjeuner, il/elle m'a écouté(e) parler de ma journée..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 resize-none"
                    rows={4}
                  />
                </div>

                {/* Question 2 */}
                <div>
                  <label className="block text-white/90 mb-3">
                    De quoi as-tu besoin demain ? 🌅
                  </label>
                  <textarea
                    value={needsTomorrow}
                    onChange={(e) => setNeedsTomorrow(e.target.value)}
                    placeholder="Ex: J'aimerais qu'on passe du temps ensemble, j'ai besoin d'encouragements pour mon projet..."
                    className="w-full px-4 py-3 rounded-2xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30 focus:border-white/50 resize-none"
                    rows={4}
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      setShowForm(false);
                      setFeltLoved('');
                      setNeedsTomorrow('');
                    }}
                    variant="outline"
                    className="flex-1 border-white/30 text-white hover:bg-white/10"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSubmitCheckIn}
                    disabled={!feltLoved.trim() || !needsTomorrow.trim()}
                    className="flex-1 bg-white text-purple-600 hover:bg-white/90"
                  >
                    Enregistrer
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 rounded-3xl p-8 border-2 border-green-200"
          >
            <div className="text-center">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-green-900 mb-2">Check-in du jour complété !</h2>
              <p className="text-green-700">
                Merci d'avoir pris le temps de vous connecter à vos émotions.
              </p>
            </div>
          </motion.div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
            <p className="text-2xl mb-1">📊</p>
            <p className="text-gray-900">{checkIns.length}</p>
            <p className="text-xs text-gray-500">Total</p>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 text-center border border-purple-200">
            <p className="text-2xl mb-1">💜</p>
            <p className="text-purple-900">{myCheckIns.length}</p>
            <p className="text-xs text-purple-600">Mes check-ins</p>
          </div>
          <div className="bg-pink-50 rounded-2xl p-4 text-center border border-pink-200">
            <p className="text-2xl mb-1">💕</p>
            <p className="text-pink-900">{partnerCheckIns.length}</p>
            <p className="text-xs text-pink-600">{partnerName || 'Partenaire'}</p>
          </div>
        </div>

        {/* History */}
        <div>
          <h3 className="text-gray-900 mb-4">Historique des check-ins</h3>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Chargement...</p>
            </div>
          ) : checkIns.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌙</div>
              <p className="text-gray-600 mb-2">Aucun check-in pour le moment</p>
              <p className="text-sm text-gray-500">Commencez à partager vos émotions !</p>
            </div>
          ) : (
            <div className="space-y-4">
              {checkIns.map((checkIn, index) => (
                <motion.div
                  key={checkIn.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`rounded-2xl p-6 shadow-sm border-2 ${
                    checkIn.userId === userId
                      ? 'bg-purple-50 border-purple-200'
                      : 'bg-pink-50 border-pink-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className={checkIn.userId === userId ? 'text-purple-900' : 'text-pink-900'}>
                        {checkIn.userName}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(checkIn.date).toLocaleDateString('fr-FR', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <Heart className={`h-6 w-6 ${checkIn.userId === userId ? 'text-purple-400' : 'text-pink-400'}`} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-700 mb-2">💕 Comment je me suis senti(e) aimé(e) :</p>
                      <p className="text-gray-900">{checkIn.feltLoved}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-700 mb-2">🌅 Ce dont j'ai besoin demain :</p>
                      <p className="text-gray-900">{checkIn.needsTomorrow}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-purple-50 rounded-2xl p-5 border border-purple-200">
          <p className="text-sm text-purple-900">
            💡 <strong>Slow Dating :</strong> Cette pratique encourage la communication lente et profonde. 
            Prenez le temps chaque soir de réfléchir à vos émotions et besoins. Votre partenaire pourra 
            ainsi mieux vous comprendre et anticiper vos attentes.
          </p>
        </div>
      </div>
    </div>
  );
}
