import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Trophy, Star, Award, TrendingUp, 
  Heart, Zap, Calendar, Target, Crown, Flame,
  ChevronRight, Lock, Check
} from 'lucide-react';
import { Button } from './ui/button';
import { getUserId, getUserProfile } from '../utils/storage';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import {
  UserProgress,
  calculateLevel,
  getXPForLevel,
  BADGES,
  TITLES,
  getActiveEvent,
  Badge,
  Title,
  AVATAR_COLORS,
  AVATAR_EMOJIS,
} from '../data/progressionSystem';

interface UserProfileProps {
  onNavigate: (page: string) => void;
}

export function UserProfile({ onNavigate }: UserProfileProps) {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'badges' | 'titles'>('stats');

  const userId = getUserId();
  const profile = getUserProfile();
  const activeEvent = getActiveEvent();

  useEffect(() => {
    fetchProgress();
  }, []);

  const fetchProgress = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/progress/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setProgress(data.progress);
      } else {
        // Créer un profil par défaut si n'existe pas
        createDefaultProgress();
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
      createDefaultProgress();
    } finally {
      setLoading(false);
    }
  };

  const createDefaultProgress = () => {
    const defaultProgress: UserProgress = {
      userId,
      level: 1,
      totalXP: 0,
      currentLevelXP: 0,
      nextLevelXP: getXPForLevel(1),
      loveLanguageXP: { PV: 0, MQ: 0, C: 0, SR: 0, TP: 0 },
      loveLanguageLevels: { PV: 1, MQ: 1, C: 1, SR: 1, TP: 1 },
      badges: [],
      titles: ['novice'],
      currentTitle: 'novice',
      stats: {
        quizzesCompleted: 0,
        partnerQuizzesPlayed: 0,
        conversationsHad: 0,
        questsCompleted: 0,
        perfectScores: 0,
        daysStreak: 0,
        lastActivityDate: new Date().toISOString(),
      },
      customization: {
        avatarColor: '#E91E63',
        avatarEmoji: '❤️',
        theme: 'default',
      },
      unlockedContent: [],
    };
    setProgress(defaultProgress);
  };

  const getRarityColor = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
    }
  };

  const getRarityBorder = (rarity: Badge['rarity']) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
    }
  };

  if (loading || !progress) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF5F7] via-[#FFE4E8] to-[#FFF5F7] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#E91E63] border-t-transparent mx-auto mb-4" />
          <p className="text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  const levelInfo = calculateLevel(progress.totalXP);
  const xpPercentage = (progress.currentLevelXP / progress.nextLevelXP) * 100;

  const unlockedBadges = BADGES.filter(b => progress.badges.includes(b.id));
  const lockedBadges = BADGES.filter(b => !progress.badges.includes(b.id));

  const unlockedTitles = TITLES.filter(t => progress.titles.includes(t.id));
  const lockedTitles = TITLES.filter(t => !progress.titles.includes(t.id));

  const currentTitle = TITLES.find(t => t.id === progress.currentTitle);

  const loveLanguageNames: Record<string, string> = {
    PV: 'Paroles Valorisantes',
    MQ: 'Moments de Qualité',
    C: 'Cadeaux',
    SR: 'Services Rendus',
    TP: 'Toucher Physique',
  };

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
                Mon Profil
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Carte principale du profil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#E91E63] to-[#F06292] rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-lg"
                  style={{ backgroundColor: progress.customization.avatarColor }}
                >
                  {progress.customization.avatarEmoji}
                </div>
                <div>
                  <h2 className="text-white mb-1">{profile?.firstName || 'Utilisateur'}</h2>
                  {currentTitle && (
                    <div className="flex items-center gap-2 text-white/90 text-sm">
                      <span>{currentTitle.emoji}</span>
                      <span>{currentTitle.name}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <Crown className="h-5 w-5 text-yellow-300" />
                  <span className="text-2xl">Niv. {progress.level}</span>
                </div>
                {progress.stats.daysStreak > 0 && (
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <Flame className="h-4 w-4 text-orange-300" />
                    <span>{progress.stats.daysStreak} jours</span>
                  </div>
                )}
              </div>
            </div>

            {/* XP Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/90">
                  {progress.currentLevelXP} / {progress.nextLevelXP} XP
                </span>
                <span className="text-white/90">
                  {Math.floor(xpPercentage)}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpPercentage}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-white rounded-full shadow-lg"
                />
              </div>
              <p className="text-white/80 text-xs text-center">
                Plus que {progress.nextLevelXP - progress.currentLevelXP} XP pour le niveau {progress.level + 1} !
              </p>
            </div>
          </div>
        </motion.div>

        {/* Événement spécial actif */}
        {activeEvent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl">{activeEvent.emoji}</div>
              <div className="flex-1">
                <h3 className="text-white mb-1">{activeEvent.name}</h3>
                <p className="text-white/90 text-sm">{activeEvent.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl text-white">×{activeEvent.xpMultiplier}</div>
                <p className="text-white/80 text-xs">XP Bonus</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl p-2 shadow-md">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'stats'
                ? 'bg-[#E91E63] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm">Statistiques</span>
          </button>
          <button
            onClick={() => setActiveTab('badges')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'badges'
                ? 'bg-[#E91E63] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Award className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm">Badges</span>
          </button>
          <button
            onClick={() => setActiveTab('titles')}
            className={`flex-1 py-3 rounded-xl transition-all ${
              activeTab === 'titles'
                ? 'bg-[#E91E63] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Star className="h-5 w-5 mx-auto mb-1" />
            <span className="text-sm">Titres</span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Niveaux par langage d'amour */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-[#E91E63]" />
                Maîtrise des Langages d'Amour
              </h3>

              <div className="space-y-4">
                {Object.entries(progress.loveLanguageLevels).map(([lang, level]) => {
                  const xp = progress.loveLanguageXP[lang as keyof typeof progress.loveLanguageXP];
                  const maxXP = getXPForLevel(level);
                  const percentage = (xp / maxXP) * 100;

                  return (
                    <div key={lang}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-700">{loveLanguageNames[lang]}</span>
                        <span className="text-sm text-[#E91E63]">Niv. {level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-full bg-gradient-to-r from-[#E91E63] to-[#F06292] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Statistiques générales */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-5 w-5 text-[#E91E63]" />
                Statistiques Générales
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FFE4E8] border-2 border-[#E91E63]">
                  <div className="text-3xl text-[#E91E63] mb-1">{progress.stats.quizzesCompleted}</div>
                  <p className="text-sm text-gray-600">Quiz complétés</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-300">
                  <div className="text-3xl text-blue-600 mb-1">{progress.stats.partnerQuizzesPlayed}</div>
                  <p className="text-sm text-gray-600">Quiz partenaires</p>
                </div>
                <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-300">
                  <div className="text-3xl text-green-600 mb-1">{progress.stats.questsCompleted}</div>
                  <p className="text-sm text-gray-600">Quêtes terminées</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border-2 border-purple-300">
                  <div className="text-3xl text-purple-600 mb-1">{progress.stats.perfectScores}</div>
                  <p className="text-sm text-gray-600">Scores parfaits</p>
                </div>
                <div className="p-4 rounded-2xl bg-orange-50 border-2 border-orange-300">
                  <div className="text-3xl text-orange-600 mb-1">{progress.stats.conversationsHad}</div>
                  <p className="text-sm text-gray-600">Conversations</p>
                </div>
                <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300">
                  <div className="flex items-center gap-2 text-3xl text-red-600 mb-1">
                    <Flame className="h-8 w-8" />
                    {progress.stats.daysStreak}
                  </div>
                  <p className="text-sm text-gray-600">Jours de suite</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'badges' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Badges débloqués */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-gray-900 mb-4">
                Badges Débloqués ({unlockedBadges.length}/{BADGES.length})
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {unlockedBadges.map((badge) => (
                  <motion.div
                    key={badge.id}
                    whileHover={{ scale: 1.05 }}
                    className={`p-4 rounded-2xl border-2 ${getRarityBorder(badge.rarity)} bg-gradient-to-br ${getRarityColor(badge.rarity)} text-white shadow-lg`}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-2">{badge.emoji}</div>
                      <p className="text-sm mb-1">{badge.name}</p>
                      <p className="text-xs text-white/80">{badge.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Badges verrouillés */}
            {lockedBadges.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-400" />
                  Badges à Débloquer
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  {lockedBadges.slice(0, 6).map((badge) => (
                    <div
                      key={badge.id}
                      className="p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-60"
                    >
                      <div className="text-center">
                        <div className="text-4xl mb-2 grayscale">{badge.emoji}</div>
                        <p className="text-sm text-gray-600 mb-1">{badge.name}</p>
                        <p className="text-xs text-gray-500">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'titles' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Titres débloqués */}
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-gray-900 mb-4">
                Titres Débloqués ({unlockedTitles.length}/{TITLES.length})
              </h3>

              <div className="space-y-3">
                {unlockedTitles.map((title) => (
                  <div
                    key={title.id}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      progress.currentTitle === title.id
                        ? 'border-[#E91E63] bg-[#FFE4E8] shadow-md'
                        : 'border-gray-200 bg-[#FFF5F7]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{title.emoji}</span>
                        <div>
                          <p className="text-gray-900">{title.name}</p>
                          <p className="text-sm text-gray-500">{title.requirement}</p>
                        </div>
                      </div>
                      {progress.currentTitle === title.id && (
                        <Check className="h-5 w-5 text-[#E91E63]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Titres verrouillés */}
            {lockedTitles.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="h-5 w-5 text-gray-400" />
                  Titres à Débloquer
                </h3>

                <div className="space-y-3">
                  {lockedTitles.slice(0, 5).map((title) => (
                    <div
                      key={title.id}
                      className="p-4 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-60"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl grayscale">{title.emoji}</span>
                        <div>
                          <p className="text-gray-600">{title.name}</p>
                          <p className="text-sm text-gray-500">{title.requirement}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
