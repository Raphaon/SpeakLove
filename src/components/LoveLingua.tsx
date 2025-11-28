import { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Flame, Check, Trophy, Sparkles, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getUserId } from '../utils/storage';
import { motion, AnimatePresence } from 'motion/react';

interface LoveLinguaProps {
  onNavigate: (page: string) => void;
  coupleId: string;
}

interface DailyQuest {
  id: string;
  userId: string;
  userName: string;
  partnerId: string;
  partnerName: string;
  partnerPrimaryLanguage: string;
  title: string;
  description: string;
  points: number;
  date: string;
  completed: boolean;
  completedAt?: number;
}

export function LoveLingua({ onNavigate, coupleId }: LoveLinguaProps) {
  const [quests, setQuests] = useState<DailyQuest[]>([]);
  const [loveReservoir, setLoveReservoir] = useState(50);
  const [loading, setLoading] = useState(true);
  const [completingQuest, setCompletingQuest] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const userId = getUserId();

  useEffect(() => {
    loadQuests();
    updateReservoir();
    // Poll for updates every 30 seconds
    const interval = setInterval(() => {
      loadQuests();
      updateReservoir();
    }, 30000);
    return () => clearInterval(interval);
  }, [coupleId]);

  const loadQuests = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/quests`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setQuests(data.quests || []);
        setLoveReservoir(data.loveReservoir || 50);
      }
    } catch (err) {
      console.error('Error loading quests:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateReservoir = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/reservoir/update`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setLoveReservoir(data.loveReservoir);
      }
    } catch (err) {
      console.error('Error updating reservoir:', err);
    }
  };

  const completeQuest = async (questId: string) => {
    setCompletingQuest(questId);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/quest/${questId}/complete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        // Update quests
        setQuests(prev => prev.map(q => 
          q.id === questId ? { ...q, completed: true, completedAt: Date.now() } : q
        ));
        setLoveReservoir(data.loveReservoir);
        
        // Show celebration
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 3000);
      }
    } catch (err) {
      console.error('Error completing quest:', err);
    } finally {
      setCompletingQuest(null);
    }
  };

  const myQuests = quests.filter(q => q.userId === userId);
  const partnerQuests = quests.filter(q => q.userId !== userId);
  const completedToday = quests.filter(q => q.completed).length;
  const totalToday = quests.length;

  // Calculate reservoir color
  const getReservoirColor = () => {
    if (loveReservoir >= 75) return 'from-green-500 to-emerald-500';
    if (loveReservoir >= 50) return 'from-purple-500 to-pink-500';
    if (loveReservoir >= 25) return 'from-orange-500 to-amber-500';
    return 'from-red-500 to-rose-500';
  };

  const getReservoirEmoji = () => {
    if (loveReservoir >= 75) return '💖';
    if (loveReservoir >= 50) return '💕';
    if (loveReservoir >= 25) return '💓';
    return '💔';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Flame className="h-12 w-12 text-purple-500 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Chargement de vos quêtes...</p>
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
              onClick={() => onNavigate('couple-setup')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-gray-900">LoveLingua</h1>
              <p className="text-sm text-gray-600">Votre entrainement quotidien d'amour</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('quest-history')}
            >
              <Trophy className="h-5 w-5 text-yellow-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-8 space-y-6">
        {/* Love Reservoir */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-purple-500" />
              <h3 className="text-gray-900">Réservoir d'Amour</h3>
            </div>
            <div className="text-3xl">{getReservoirEmoji()}</div>
          </div>

          {/* Reservoir Bar */}
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${loveReservoir}%` }}
                transition={{ duration: 1, type: 'spring' }}
                className={`h-full bg-gradient-to-r ${getReservoirColor()} flex items-center justify-center`}
              >
                <span className="text-white text-sm px-2">{loveReservoir}%</span>
              </motion.div>
            </div>
          </div>

          {loveReservoir < 25 && (
            <div className="mt-4 bg-red-50 rounded-xl p-4 border border-red-200 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-900 font-medium">Alerte ! Réservoir faible</p>
                <p className="text-xs text-red-700 mt-1">
                  Complétez vos quêtes pour remplir le réservoir d'amour !
                </p>
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
            <span>Quêtes terminées aujourd'hui</span>
            <span className="font-medium text-purple-600">{completedToday}/{totalToday}</span>
          </div>
        </motion.div>

        {/* My Quests */}
        {myQuests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-orange-500" />
              <h3 className="text-gray-900">Vos Quêtes du Jour</h3>
            </div>

            <div className="space-y-3">
              {myQuests.map((quest, index) => (
                <motion.div
                  key={quest.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className={`bg-white rounded-2xl p-5 shadow-lg border-2 ${
                    quest.completed 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-purple-200 hover:border-purple-300'
                  } transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {quest.completed ? (
                        <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                          <Check className="h-6 w-6 text-white" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                          <Sparkles className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4 className={`mb-1 ${quest.completed ? 'text-green-900 line-through' : 'text-gray-900'}`}>
                        {quest.title}
                      </h4>
                      <p className={`text-sm mb-3 ${quest.completed ? 'text-green-700' : 'text-gray-600'}`}>
                        {quest.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                          quest.completed 
                            ? 'bg-green-100 text-green-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          +{quest.points} points
                        </span>

                        {!quest.completed && (
                          <Button
                            onClick={() => completeQuest(quest.id)}
                            disabled={completingQuest === quest.id}
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                          >
                            {completingQuest === quest.id ? 'Validation...' : 'Valider'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Partner's Progress */}
        {partnerQuests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-5 w-5 text-pink-500" />
              <h3 className="text-gray-900">Progression de {partnerQuests[0]?.userName}</h3>
            </div>

            <div className="space-y-2">
              {partnerQuests.map((quest) => (
                <div
                  key={quest.id}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    quest.completed ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {quest.completed ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className={`text-sm ${quest.completed ? 'text-green-900 line-through' : 'text-gray-700'}`}>
                      {quest.title}
                    </span>
                  </div>
                  {quest.completed && (
                    <span className="text-xs text-green-600">+{quest.points} pts</span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Info Card */}
        <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-gray-900 mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Comment ça marche ?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span><strong>Nouvelles quêtes chaque jour</strong> adaptées au langage d'amour de votre partenaire</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span><strong>Validez vos quêtes</strong> pour remplir le réservoir d'amour partagé</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">•</span>
              <span><strong>Le réservoir baisse</strong> d'1 point par jour d'inactivité - restez réguliers !</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={() => onNavigate('couple-comparison')}
            variant="outline"
            className="w-full py-6 rounded-2xl border-2 border-purple-200 hover:bg-purple-50"
          >
            Voir la comparaison détaillée
          </Button>
          
          <Button
            onClick={() => onNavigate('dashboard')}
            variant="ghost"
            className="w-full py-6 text-gray-600"
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-gray-900 mb-2">Quête terminée !</h2>
              <p className="text-purple-600">Réservoir d'amour rechargé 💕</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}