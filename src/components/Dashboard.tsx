import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  Flame,
  Trophy,
  Users,
  MessageCircle,
  Gift,
  BookOpen,
  Settings,
  HeartHandshake,
  Star,
  Sparkles,
} from 'lucide-react';
import { getTestResults, getUserProfile, getCoupleId, getUserId } from '../utils/storage';
import { loveLanguages } from '../data/loveLanguages';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getActiveEvent } from '../data/progressionSystem';

interface CoupleData {
  id: string;
  user1Id: string;
  user1Name: string;
  user2Id?: string;
  user2Name?: string;
  status: 'waiting' | 'linked';
  loveReservoir: number;
  dailyQuests?: any[];
}

export function Dashboard() {
  const navigate = useNavigate();
  
  const [coupleData, setCoupleData] = useState<CoupleData | null>(() => {
    try {
      const cached = localStorage.getItem('cached_couple_data');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  
  const [userProgress, setUserProgress] = useState<any>(() => {
    try {
      const cached = localStorage.getItem('cached_user_progress');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  
  const [activeEvent, setActiveEvent] = useState<any>(() => getActiveEvent());
  const [isLoading, setIsLoading] = useState(false);

  const profile = getUserProfile();
  const testResults = getTestResults();
  const latestResult = testResults && testResults.length > 0 ? testResults[testResults.length - 1] : null;
  const primaryLanguage = latestResult ? loveLanguages.find(l => l.id === latestResult.primaryLanguageId) : null;
  const userName = profile?.firstName || 'Utilisateur';
  const coupleId = getCoupleId();
  const userId = getUserId();

  useEffect(() => {
    if (coupleId) {
      loadCoupleData();
    }
    if (userId) {
      loadUserProgress();
    }
  }, [coupleId, userId]);

  const loadCoupleData = async () => {
    if (!coupleId) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/couple/${coupleId}`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        setCoupleData(data.couple);
        localStorage.setItem('cached_couple_data', JSON.stringify(data.couple));
      }
    } catch (error) {
      console.error('Error loading couple data:', error);
    }
  };

  const loadUserProgress = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/progress/${userId}`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }
      );

      const data = await response.json();
      if (data.success) {
        setUserProgress(data.progress);
        localStorage.setItem('cached_user_progress', JSON.stringify(data.progress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await Promise.all([
      coupleId ? loadCoupleData() : Promise.resolve(),
      userId ? loadUserProgress() : Promise.resolve(),
    ]);
    setIsLoading(false);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getReservoirColor = (level: number) => {
    if (level >= 80) return 'text-green-500';
    if (level >= 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  const completedToday = coupleData?.dailyQuests?.filter(q => q.completed).length || 0;
  const totalToday = coupleData?.dailyQuests?.length || 0;
  const xpPercentage = userProgress ? (userProgress.currentLevelXP / userProgress.nextLevelXP) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-pink-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-xl font-bold text-pink-600">LoveLingua</span>
              <span className="text-xl sm:text-2xl">💕</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => navigate('/user-profile')}
                className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
              </button>
              <button
                onClick={() => navigate('/profile-settings')}
                className="p-1.5 sm:p-2 hover:bg-pink-50 rounded-full transition-colors"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Greeting */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1.5 sm:mb-2">
            {getGreeting()}, {userName} ✨
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2">
            {primaryLanguage 
              ? `Votre langage principal : ${primaryLanguage.icon} ${primaryLanguage.name}`
              : 'Découvrez votre langage d\'amour'}
          </p>
        </div>

        {/* Active Event Banner */}
        {activeEvent && (
          <div className="bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 mb-4 sm:mb-6 shadow-lg">
            <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-3xl sm:text-5xl">{activeEvent.emoji}</span>
                <div>
                  <h3 className="text-base sm:text-xl font-bold">{activeEvent.name}</h3>
                  <p className="text-white/90 text-xs sm:text-sm">{activeEvent.description}</p>
                </div>
              </div>
              <div className="px-2.5 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm sm:text-base font-bold">
                ×{activeEvent.xpMultiplier} XP
              </div>
            </div>
          </div>
        )}

        {/* User Progress */}
        {userProgress && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3.5 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-current" />
                <span className="text-sm sm:text-base font-bold text-gray-900">Niveau {userProgress.level}</span>
              </div>
              <span className="text-xs sm:text-sm text-gray-500">
                {userProgress.currentLevelXP} / {userProgress.nextLevelXP} XP
              </span>
            </div>
            <div className="h-1.5 sm:h-2 bg-pink-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            {userProgress.stats.daysStreak > 0 && (
              <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
                <span className="text-xs sm:text-sm font-medium">{userProgress.stats.daysStreak} jours de suite 🔥</span>
              </div>
            )}
          </div>
        )}

        {/* Couple Stats */}
        {coupleData && coupleData.status === 'linked' && (
          <div className="grid grid-cols-2 gap-2.5 sm:gap-4 mb-4 sm:mb-6">
            <button
              onClick={() => navigate('/lovelingu')}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3.5 sm:p-6 hover:shadow-xl transition-all"
            >
              <HeartHandshake className="w-7 h-7 sm:w-10 sm:h-10 text-pink-500 mx-auto mb-2 sm:mb-3" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{coupleData.loveReservoir}%</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2">Réservoir d'Amour</p>
              <div className="h-1.5 sm:h-2 bg-pink-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    coupleData.loveReservoir >= 80 ? 'bg-green-500' :
                    coupleData.loveReservoir >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${coupleData.loveReservoir}%` }}
                />
              </div>
            </button>
            
            <button
              onClick={() => navigate('/lovelingu')}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3.5 sm:p-6 hover:shadow-xl transition-all"
            >
              <Flame className="w-7 h-7 sm:w-10 sm:h-10 text-orange-500 mx-auto mb-2 sm:mb-3" />
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{completedToday}/{totalToday}</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2">Quêtes du jour</p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                {completedToday === totalToday && totalToday > 0
                  ? '🎉 Terminées !'
                  : `${totalToday - completedToday} restante${totalToday - completedToday > 1 ? 's' : ''}`}
              </p>
            </button>
          </div>
        )}

        {/* Main Quiz CTA */}
        {!latestResult && (
          <button
            onClick={() => navigate('/quiz')}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2">Découvrez votre langage d'amour</h3>
                <p className="text-white/90 text-xs sm:text-sm mb-2 sm:mb-3">
                  Passez le quiz pour identifier votre langage émotionnel principal
                </p>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-sm sm:text-base font-medium">Commencer le quiz</span>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>
          </button>
        )}

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
          {/* Partner Quiz */}
          <button
            onClick={() => navigate('/partner-quiz')}
            className="bg-gradient-to-br from-pink-500 to-rose-400 text-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="absolute top-0 right-2 sm:right-4 text-xl sm:text-2xl">💕</div>
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Quiz Couple</h3>
            <p className="text-[10px] sm:text-xs text-white/90">Vous connaissez-vous ?</p>
          </button>

          {/* Questions */}
          <button
            onClick={() => navigate('/questions')}
            className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Questions</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Conversation</p>
          </button>

          {/* Quiz Principal */}
          {latestResult && (
            <button
              onClick={() => navigate('/quiz')}
              className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
              </div>
              <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Mon Quiz</h3>
              <p className="text-[10px] sm:text-xs text-gray-500">5 langages</p>
            </button>
          )}

          {/* Suggestions */}
          <button
            onClick={() => navigate('/suggestions')}
            className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Gestes</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Idées & conseils</p>
          </button>

          {/* LoveLingua */}
          <button
            onClick={() => navigate('/lovelingu')}
            className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">Mode Couple</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Quêtes & réservoir</p>
          </button>

          {/* Info */}
          <button
            onClick={() => navigate('/info')}
            className="bg-white rounded-xl sm:rounded-2xl p-3.5 sm:p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-2 sm:mb-3">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <h3 className="text-sm sm:text-base font-bold mb-0.5 sm:mb-1">En savoir +</h3>
            <p className="text-[10px] sm:text-xs text-gray-500">Les 5 langages</p>
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-xs sm:text-sm mt-6 sm:mt-8 pb-2">
          Fait avec 💕 pour votre relation
        </div>
      </main>
    </div>
  );
}
