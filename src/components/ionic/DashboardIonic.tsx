import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonProgressBar,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonButtons,
  IonChip,
  IonLabel,
  useIonRouter,
} from '@ionic/react';
import {
  heart,
  flame,
  trophy,
  people,
  chatbubbles,
  gift,
  book,
  settings,
  heartCircle,
  star,
  calendar,
  ticket,
  thumbsUp,
} from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { getTestResults, getUserProfile, getCoupleId, getUserId } from '../../utils/storage';
import { loveLanguages } from '../../data/loveLanguages';
import { projectId, publicAnonKey } from '../../utils/supabase/info';
import { getActiveEvent } from '../../data/progressionSystem';
import './DashboardIonic.css';

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

export function DashboardIonic() {
  const router = useIonRouter();
  // Initialiser avec le cache localStorage si disponible
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
    // Charger les données en arrière-plan uniquement si nécessaire
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
        // Mettre en cache pour un chargement plus rapide la prochaine fois
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
        // Mettre en cache pour un chargement plus rapide la prochaine fois
        localStorage.setItem('cached_user_progress', JSON.stringify(data.progress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };



  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    setIsLoading(true);
    await Promise.all([
      coupleId ? loadCoupleData() : Promise.resolve(),
      userId ? loadUserProgress() : Promise.resolve(),
    ]);
    setIsLoading(false);
    event.detail.complete();
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  const getReservoirColor = (level: number) => {
    if (level >= 80) return 'success';
    if (level >= 50) return 'warning';
    return 'danger';
  };

  const completedToday = coupleData?.dailyQuests?.filter(q => q.completed).length || 0;
  const totalToday = coupleData?.dailyQuests?.length || 0;
  const xpPercentage = userProgress ? (userProgress.currentLevelXP / userProgress.nextLevelXP) * 100 : 0;

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>
            <div className="flex items-center gap-2">
              <span>LoveLingua</span>
              <span className="text-2xl">💕</span>
            </div>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => router.push('/user-profile')}>
              <IonIcon icon={trophy} />
            </IonButton>
            <IonButton onClick={() => router.push('/profile-settings')}>
              <IonIcon icon={settings} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Greeting */}
        <div className="greeting-section">
          <h1 className="text-gray-800">
            {getGreeting()}, {userName} ✨
          </h1>
          <p className="text-gray-600">
            {primaryLanguage 
              ? `Votre langage principal : ${primaryLanguage.icon} ${primaryLanguage.name}`
              : 'Découvrez votre langage d\'amour'}
          </p>
        </div>

        {/* Active Event Banner */}
        {activeEvent && (
          <IonCard className="gradient-primary text-white event-banner">
            <IonCardContent>
              <div className="event-content">
                <div className="flex items-center gap-3">
                  <span className="event-emoji">{activeEvent.emoji}</span>
                  <div>
                    <h3 className="text-white">{activeEvent.name}</h3>
                    <p className="text-white">{activeEvent.description}</p>
                  </div>
                </div>
                <IonBadge color="light" className="text-primary">
                  ×{activeEvent.xpMultiplier} XP
                </IonBadge>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* User Level Progress */}
        {userProgress && (
          <IonCard className="progress-card">
            <IonCardContent>
              <div className="progress-info">
                <div className="flex items-center gap-2">
                  <IonIcon icon={star} color="warning" />
                  <span className="font-medium">Niveau {userProgress.level}</span>
                </div>
                <span className="progress-stats text-gray-500">
                  {userProgress.currentLevelXP} / {userProgress.nextLevelXP} XP
                </span>
              </div>
              <IonProgressBar value={xpPercentage / 100} color="primary" />
              {userProgress.stats.daysStreak > 0 && (
                <div className="streak-info">
                  <IonIcon icon={flame} color="warning" />
                  <span>{userProgress.stats.daysStreak} jours de suite 🔥</span>
                </div>
              )}
            </IonCardContent>
          </IonCard>
        )}

        {/* Couple Stats (if linked) */}
        {coupleData && coupleData.status === 'linked' && (
          <IonGrid className="couple-stats-grid">
            <IonRow>
              <IonCol size="6">
                <IonCard button onClick={() => router.push('/lovelingu')} className="couple-stat-card">
                  <IonCardContent>
                    <IonIcon icon={heartCircle} color="primary" />
                    <h3>{coupleData.loveReservoir}%</h3>
                    <p className="text-gray-600">Réservoir d'Amour</p>
                    <IonProgressBar
                      value={coupleData.loveReservoir / 100}
                      color={getReservoirColor(coupleData.loveReservoir)}
                      className="mt-2"
                    />
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard button onClick={() => router.push('/lovelingu')} className="couple-stat-card">
                  <IonCardContent>
                    <IonIcon icon={flame} color="warning" />
                    <h3>{completedToday}/{totalToday}</h3>
                    <p className="text-gray-600">Quêtes du jour</p>
                    <p className="quest-status text-gray-500">
                      {completedToday === totalToday && totalToday > 0
                        ? '🎉 Terminées !'
                        : `${totalToday - completedToday} restante${totalToday - completedToday > 1 ? 's' : ''}`}
                    </p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}

        {/* Main Quiz CTA */}
        {!latestResult && (
          <IonCard className="gradient-primary text-white quiz-cta" button onClick={() => router.push('/quiz')}>
            <IonCardContent>
              <div className="quiz-cta-content">
                <div className="quiz-cta-icon">
                  <span>✨</span>
                </div>
                <div className="quiz-cta-text">
                  <h3>Découvrez votre langage d'amour</h3>
                  <p>
                    Passez le quiz pour identifier votre langage émotionnel principal
                  </p>
                  <div className="quiz-cta-action">
                    <span>Commencer le quiz</span>
                    <IonIcon icon={heart} />
                  </div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Navigation Grid */}
        <IonGrid className="nav-grid">
          <IonRow>
            {/* Partner Quiz */}
            <IonCol size="6">
              <IonCard button className="nav-card gradient-primary text-white partner-quiz-card" onClick={() => router.push('/partner-quiz')}>
                <IonCardContent>
                  <div className="quiz-icon-wrapper">
                    <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-3">
                      <IonIcon icon={heart} style={{ fontSize: '24px' }} />
                    </div>
                    <div className="partner-emoji">💕</div>
                  </div>
                  <h3 className="text-white">Quiz Couple</h3>
                  <p className="text-white opacity-90">Vous connaissez-vous ?</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Questions */}
            <IonCol size="6">
              <IonCard button className="nav-card" onClick={() => router.push('/questions')}>
                <IonCardContent>
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-3">
                    <IonIcon icon={chatbubbles} color="primary" style={{ fontSize: '24px' }} />
                  </div>
                  <h3>Questions</h3>
                  <p className="text-gray-500">Conversation</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Quiz Principal */}
            {latestResult && (
              <IonCol size="6">
                <IonCard button className="nav-card" onClick={() => router.push('/quiz')}>
                  <IonCardContent>
                    <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-3">
                      <IonIcon icon={heartCircle} color="primary" style={{ fontSize: '24px' }} />
                    </div>
                    <h3>Mon Quiz</h3>
                    <p className="text-gray-500">5 langages</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            )}

            {/* Suggestions */}
            <IonCol size="6">
              <IonCard button className="nav-card" onClick={() => router.push('/suggestions')}>
                <IonCardContent>
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-3">
                    <IonIcon icon={gift} color="primary" style={{ fontSize: '24px' }} />
                  </div>
                  <h3>Gestes</h3>
                  <p className="text-gray-500">Idées & conseils</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* LoveLingua */}
            <IonCol size="6">
              <IonCard button className="nav-card" onClick={() => router.push('/lovelingu')}>
                <IonCardContent>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                    <IonIcon icon={people} color="primary" style={{ fontSize: '24px' }} />
                  </div>
                  <h3>Mode Couple</h3>
                  <p className="text-gray-500">Quêtes & réservoir</p>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* Info */}
            <IonCol size="6">
              <IonCard button className="nav-card" onClick={() => router.push('/info')}>
                <IonCardContent>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
                    <IonIcon icon={book} color="primary" style={{ fontSize: '24px' }} />
                  </div>
                  <h3>En savoir +</h3>
                  <p className="text-gray-500">Les 5 langages</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Cute Footer */}
        <div className="cute-footer">
          Fait avec 💕 pour votre relation
        </div>
      </IonContent>
    </IonPage>
  );
}
