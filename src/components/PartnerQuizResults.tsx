import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Trophy, ArrowLeft, Share2, Sparkles, TrendingUp, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PartnerQuizResultsProps {
  sessionId: string;
  partnerId: string;
  onNavigate: (page: string) => void;
}

interface QuizSession {
  id: string;
  partnerAName: string;
  partnerBName?: string;
  questions: any[];
  answers: any;
  score: number;
  status: string;
}

export function PartnerQuizResults({ sessionId, partnerId, onNavigate }: PartnerQuizResultsProps) {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/partner-quiz/${sessionId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        const data = await response.json();

        if (data.success) {
          setSession(data.session);
        }
      } catch (err) {
        console.error('Error fetching results:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE4E8] to-[#FFF5F7] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#E91E63] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  const totalQuestions = session.questions.length;
  const percentage = Math.round((session.score / totalQuestions) * 100);

  const getScoreMessage = () => {
    if (percentage >= 80) {
      return {
        emoji: '💕',
        title: 'Connexion profonde',
        message: 'Vous vous connaissez vraiment bien ! Votre connexion est exceptionnelle.',
        color: 'from-green-500 to-emerald-500'
      };
    } else if (percentage >= 60) {
      return {
        emoji: '✨',
        title: 'Belle complicité',
        message: 'Vous avez une bonne compréhension mutuelle. Continuez à vous découvrir !',
        color: 'from-blue-500 to-cyan-500'
      };
    } else if (percentage >= 40) {
      return {
        emoji: '💛',
        title: 'Vous vous découvrez',
        message: 'Il y a encore beaucoup à apprendre l\'un sur l\'autre. C\'est passionnant !',
        color: 'from-yellow-500 to-orange-500'
      };
    } else {
      return {
        emoji: '🌱',
        title: 'Le début d\'une aventure',
        message: 'Chaque différence est une opportunité de mieux vous connaître !',
        color: 'from-purple-500 to-pink-500'
      };
    }
  };

  const scoreInfo = getScoreMessage();

  // Calculate statistics
  const answerStats = {
    both: 0,
    oneOnly: 0,
    neither: 0,
  };

  Object.values(session.answers).forEach((answer: any) => {
    if (answer.partnerA && answer.partnerB) {
      answerStats.both++;
    } else if (answer.partnerA || answer.partnerB) {
      answerStats.oneOnly++;
    } else {
      answerStats.neither++;
    }
  });

  // Get advice based on score
  const getAdvice = () => {
    if (percentage >= 80) {
      return [
        'Continuez à communiquer ouvertement',
        'Partagez de nouvelles expériences ensemble',
        'Célébrez votre complicité unique'
      ];
    } else if (percentage >= 60) {
      return [
        'Posez-vous plus de questions au quotidien',
        'Partagez vos pensées et émotions',
        'Créez des moments de qualité ensemble'
      ];
    } else {
      return [
        'Prenez le temps de vraiment vous écouter',
        'Partagez vos rêves et aspirations',
        'Soyez curieux de découvrir l\'autre'
      ];
    }
  };

  const advice = getAdvice();

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
                <Trophy className="h-6 w-6 text-[#E91E63]" />
                Résultats du Quiz
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {/* Score principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center"
        >
          <div className="text-8xl mb-4">{scoreInfo.emoji}</div>
          <h2 className="text-gray-900 mb-2">{scoreInfo.title}</h2>
          <p className="text-gray-600 mb-6">{scoreInfo.message}</p>

          <div className="inline-flex items-center gap-3 mb-4">
            <Heart className="h-12 w-12 text-[#E91E63] fill-current" />
            <div className="text-left">
              <p className="text-sm text-gray-600">Score de compatibilité</p>
              <p className="text-4xl text-[#E91E63]">{percentage}%</p>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full rounded-full bg-gradient-to-r ${scoreInfo.color}`}
            />
          </div>

          <p className="text-gray-500 text-sm">{session.score} réponses identiques sur {totalQuestions}</p>
        </motion.div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
        >
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-[#E91E63]" />
            Statistiques détaillées
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-2xl bg-green-50 border-2 border-green-200">
              <p className="text-3xl text-green-600 mb-1">{answerStats.both}</p>
              <p className="text-xs text-green-700">Les deux ont répondu</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-orange-50 border-2 border-orange-200">
              <p className="text-3xl text-orange-600 mb-1">{answerStats.oneOnly}</p>
              <p className="text-xs text-orange-700">Un seul a répondu</p>
            </div>
            <div className="text-center p-4 rounded-2xl bg-gray-50 border-2 border-gray-200">
              <p className="text-3xl text-gray-600 mb-1">{answerStats.neither}</p>
              <p className="text-xs text-gray-700">Aucun n'a répondu</p>
            </div>
          </div>
        </motion.div>

        {/* Participants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100"
        >
          <h3 className="text-gray-900 mb-4 flex items-center gap-2">
            <Heart className="h-5 w-5 text-[#E91E63]" />
            Participants
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FFE4E8] border-2 border-[#E91E63] text-center">
              <div className="text-3xl mb-2">👤</div>
              <p className="text-gray-900">{session.partnerAName}</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-300 text-center">
              <div className="text-3xl mb-2">👤</div>
              <p className="text-gray-900">{session.partnerBName}</p>
            </div>
          </div>
        </motion.div>

        {/* Conseils personnalisés */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#E91E63] to-[#F06292] rounded-3xl p-6 shadow-xl text-white"
        >
          <h3 className="text-white mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Conseils pour renforcer votre lien
          </h3>

          <div className="space-y-3">
            {advice.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white/20 backdrop-blur-sm"
              >
                <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm">💡</span>
                </div>
                <p className="text-white/95 text-sm">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-3"
        >
          <Button
            onClick={() => onNavigate('partner-quiz')}
            className="w-full py-6 rounded-2xl bg-gradient-to-r from-[#E91E63] to-[#F06292] hover:shadow-lg transition-all"
          >
            Refaire un quiz 🔄
          </Button>

          <Button
            onClick={() => {
              const text = `Nous avons obtenu ${percentage}% de compatibilité sur LoveLingua ! ${scoreInfo.title} 💕`;
              if (navigator.share) {
                navigator.share({
                  title: 'Résultats du Quiz LoveLingua',
                  text,
                });
              } else {
                navigator.clipboard.writeText(text);
                alert('Résultat copié dans le presse-papiers !');
              }
            }}
            variant="outline"
            className="w-full py-6 rounded-2xl border-2 border-[#E91E63] text-[#E91E63] hover:bg-[#FFE4E8]"
          >
            <Share2 className="mr-2 h-5 w-5" />
            Partager les résultats
          </Button>

          <Button
            onClick={() => onNavigate('dashboard')}
            variant="outline"
            className="w-full py-6 rounded-2xl border-2 border-gray-200"
          >
            Retour au tableau de bord
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
