import { useState, useEffect } from 'react';
import { ArrowLeft, Trophy, Calendar, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'motion/react';

interface QuestHistoryProps {
  onNavigate: (page: string) => void;
  coupleId: string;
}

interface CompletedQuest {
  questId: string;
  userId: string;
  userName: string;
  title: string;
  points: number;
  completedAt: number;
}

export function QuestHistory({ onNavigate, coupleId }: QuestHistoryProps) {
  const [history, setHistory] = useState<CompletedQuest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, [coupleId]);

  const loadHistory = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}/history`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setHistory(data.history || []);
      }
    } catch (err) {
      console.error('Error loading history:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const totalPoints = history.reduce((sum, quest) => sum + quest.points, 0);
  const questsByUser = history.reduce((acc, quest) => {
    if (!acc[quest.userName]) {
      acc[quest.userName] = [];
    }
    acc[quest.userName].push(quest);
    return acc;
  }, {} as Record<string, CompletedQuest[]>);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Trophy className="h-12 w-12 text-yellow-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Chargement de l'historique...</p>
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
              onClick={() => onNavigate('lovelingu')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-gray-900">Historique des Quêtes</h1>
              <p className="text-sm text-gray-600">{history.length} quêtes complétées</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 pt-8 space-y-6">
        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-6 text-white shadow-xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-8 w-8" />
            <div>
              <h2 className="text-white mb-1">Score Total</h2>
              <p className="text-white/90 text-sm">Points accumulés ensemble</p>
            </div>
          </div>
          <div className="text-5xl mb-2">{totalPoints}</div>
          <p className="text-white/80 text-sm">points d'amour</p>
        </motion.div>

        {/* Stats by User */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(questsByUser).map(([userName, quests], index) => (
            <motion.div
              key={userName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-2xl p-5 shadow-lg text-center"
            >
              <div className="text-3xl mb-2">🏆</div>
              <p className="text-sm text-gray-600 mb-1">{userName}</p>
              <p className="text-2xl text-purple-600 mb-1">{quests.length}</p>
              <p className="text-xs text-gray-500">quêtes</p>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <p className="text-sm text-gray-700">
                  {quests.reduce((sum, q) => sum + q.points, 0)} pts
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* History List */}
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-12 text-center shadow-xl"
          >
            <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
              <Sparkles className="h-12 w-12 text-purple-600" />
            </div>
            <h2 className="text-gray-900 mb-2">Aucune quête terminée</h2>
            <p className="text-gray-600 mb-6">
              Commencez à compléter vos quêtes quotidiennes pour voir votre progression ici !
            </p>
            <Button
              onClick={() => onNavigate('lovelingu')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Voir mes quêtes
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-gray-900 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-500" />
              Toutes les quêtes
            </h3>

            <div className="space-y-3">
              {history.slice().reverse().map((quest, index) => (
                <motion.div
                  key={quest.questId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-green-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-gray-900 mb-1">{quest.title}</h4>
                          <p className="text-sm text-gray-600">Par {quest.userName}</p>
                        </div>
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">
                          +{quest.points} pts
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(quest.completedAt)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <Button
          onClick={() => onNavigate('lovelingu')}
          variant="ghost"
          className="w-full py-6 text-gray-600"
        >
          Retour aux quêtes
        </Button>
      </div>
    </div>
  );
}
