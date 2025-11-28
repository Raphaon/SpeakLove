// ========== SYSTÈME DE PROGRESSION ==========

export interface UserProgress {
  userId: string;
  level: number;
  totalXP: number;
  currentLevelXP: number;
  nextLevelXP: number;
  
  // XP par langage d'amour
  loveLanguageXP: {
    PV: number; // Paroles Valorisantes
    MQ: number; // Moments de Qualité
    C: number;  // Cadeaux
    SR: number; // Services Rendus
    TP: number; // Toucher Physique
  };
  
  // Niveaux par langage
  loveLanguageLevels: {
    PV: number;
    MQ: number;
    C: number;
    SR: number;
    TP: number;
  };
  
  badges: string[]; // IDs des badges débloqués
  titles: string[]; // Titres débloqués
  currentTitle?: string; // Titre actif
  
  stats: {
    quizzesCompleted: number;
    partnerQuizzesPlayed: number;
    conversationsHad: number;
    questsCompleted: number;
    perfectScores: number;
    daysStreak: number;
    lastActivityDate: string;
  };
  
  customization: {
    avatarColor: string;
    avatarEmoji: string;
    theme: 'default' | 'dark' | 'romantic';
  };
  
  unlockedContent: string[]; // IDs de contenu débloqué
}

// XP requis par niveau (progression exponentielle)
export function getXPForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

// Calculer le niveau à partir de l'XP total
export function calculateLevel(totalXP: number): { level: number; currentXP: number; nextXP: number } {
  let level = 1;
  let xpForCurrentLevel = 0;
  let xpForNextLevel = getXPForLevel(level);
  
  while (totalXP >= xpForNextLevel) {
    xpForCurrentLevel = xpForNextLevel;
    level++;
    xpForNextLevel = xpForCurrentLevel + getXPForLevel(level);
  }
  
  return {
    level,
    currentXP: totalXP - xpForCurrentLevel,
    nextXP: xpForNextLevel - xpForCurrentLevel,
  };
}

// ========== RÉCOMPENSES XP PAR ACTIVITÉ ==========

export interface XPReward {
  activity: string;
  baseXP: number;
  description: string;
  loveLanguage?: keyof UserProgress['loveLanguageXP'];
}

export const XP_REWARDS: XPReward[] = [
  // Quiz principal
  { activity: 'quiz_complete', baseXP: 100, description: 'Quiz des 5 langages complété' },
  { activity: 'quiz_perfect', baseXP: 150, description: 'Quiz sans erreur' },
  
  // Quiz partenaire
  { activity: 'partner_quiz_complete', baseXP: 80, description: 'Quiz partenaire complété' },
  { activity: 'partner_quiz_80plus', baseXP: 120, description: 'Score 80%+ au quiz partenaire' },
  { activity: 'partner_quiz_100', baseXP: 200, description: 'Score parfait au quiz partenaire' },
  
  // Questions conversation
  { activity: 'conversation_question', baseXP: 10, description: 'Question de conversation posée' },
  { activity: 'conversation_5questions', baseXP: 30, description: '5 questions en une session' },
  
  // Quêtes
  { activity: 'quest_complete', baseXP: 50, description: 'Quête quotidienne complétée' },
  { activity: 'quest_streak_7', baseXP: 150, description: '7 jours de quêtes consécutifs' },
  { activity: 'quest_streak_30', baseXP: 500, description: '30 jours de quêtes consécutifs' },
  
  // Activités par langage
  { activity: 'words_activity', baseXP: 20, description: 'Activité Paroles Valorisantes', loveLanguage: 'PV' },
  { activity: 'quality_time_activity', baseXP: 20, description: 'Activité Moments de Qualité', loveLanguage: 'MQ' },
  { activity: 'gift_activity', baseXP: 20, description: 'Activité Cadeaux', loveLanguage: 'C' },
  { activity: 'service_activity', baseXP: 20, description: 'Activité Services Rendus', loveLanguage: 'SR' },
  { activity: 'touch_activity', baseXP: 20, description: 'Activité Toucher Physique', loveLanguage: 'TP' },
  
  // Social
  { activity: 'couple_link', baseXP: 100, description: 'Liaison de couple créée' },
  { activity: 'daily_login', baseXP: 10, description: 'Connexion quotidienne' },
  { activity: 'weekly_login', baseXP: 50, description: '7 jours de connexion consécutifs' },
];

// ========== BADGES ==========

export interface Badge {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  condition: (progress: UserProgress) => boolean;
  reward?: string; // Contenu débloqué
}

export const BADGES: Badge[] = [
  // Badges de niveau général
  {
    id: 'level_5',
    name: 'Explorateur de l\'Amour',
    description: 'Atteindre le niveau 5',
    emoji: '🌟',
    rarity: 'common',
    condition: (p) => p.level >= 5,
  },
  {
    id: 'level_10',
    name: 'Expert des Émotions',
    description: 'Atteindre le niveau 10',
    emoji: '⭐',
    rarity: 'rare',
    condition: (p) => p.level >= 10,
  },
  {
    id: 'level_25',
    name: 'Maître du Cœur',
    description: 'Atteindre le niveau 25',
    emoji: '💫',
    rarity: 'epic',
    condition: (p) => p.level >= 25,
  },
  {
    id: 'level_50',
    name: 'Légende de l\'Amour',
    description: 'Atteindre le niveau 50',
    emoji: '👑',
    rarity: 'legendary',
    condition: (p) => p.level >= 50,
  },
  
  // Badges par langage d'amour
  {
    id: 'pv_master',
    name: 'Poète du Cœur',
    description: 'Niveau 10 en Paroles Valorisantes',
    emoji: '📝',
    rarity: 'rare',
    condition: (p) => p.loveLanguageLevels.PV >= 10,
  },
  {
    id: 'mq_master',
    name: 'Gardien du Temps',
    description: 'Niveau 10 en Moments de Qualité',
    emoji: '⏰',
    rarity: 'rare',
    condition: (p) => p.loveLanguageLevels.MQ >= 10,
  },
  {
    id: 'c_master',
    name: 'Généreux Éternel',
    description: 'Niveau 10 en Cadeaux',
    emoji: '🎁',
    rarity: 'rare',
    condition: (p) => p.loveLanguageLevels.C >= 10,
  },
  {
    id: 'sr_master',
    name: 'Ange Dévoué',
    description: 'Niveau 10 en Services Rendus',
    emoji: '🤝',
    rarity: 'rare',
    condition: (p) => p.loveLanguageLevels.SR >= 10,
  },
  {
    id: 'tp_master',
    name: 'Maître Câlin',
    description: 'Niveau 10 en Toucher Physique',
    emoji: '🤗',
    rarity: 'rare',
    condition: (p) => p.loveLanguageLevels.TP >= 10,
  },
  
  // Badges de quêtes
  {
    id: 'quest_10',
    name: 'Aventurier Débutant',
    description: '10 quêtes complétées',
    emoji: '🗺️',
    rarity: 'common',
    condition: (p) => p.stats.questsCompleted >= 10,
  },
  {
    id: 'quest_50',
    name: 'Aventurier Confirmé',
    description: '50 quêtes complétées',
    emoji: '🏆',
    rarity: 'rare',
    condition: (p) => p.stats.questsCompleted >= 50,
  },
  {
    id: 'quest_100',
    name: 'Héros des Quêtes',
    description: '100 quêtes complétées',
    emoji: '🎖️',
    rarity: 'epic',
    condition: (p) => p.stats.questsCompleted >= 100,
  },
  
  // Badges de streak
  {
    id: 'streak_7',
    name: 'Engagé du Cœur',
    description: '7 jours d\'activité consécutifs',
    emoji: '🔥',
    rarity: 'common',
    condition: (p) => p.stats.daysStreak >= 7,
  },
  {
    id: 'streak_30',
    name: 'Fidèle Dévoué',
    description: '30 jours d\'activité consécutifs',
    emoji: '💪',
    rarity: 'epic',
    condition: (p) => p.stats.daysStreak >= 30,
  },
  {
    id: 'streak_100',
    name: 'Titan de la Constance',
    description: '100 jours d\'activité consécutifs',
    emoji: '🌋',
    rarity: 'legendary',
    condition: (p) => p.stats.daysStreak >= 100,
  },
  
  // Badges de quiz partenaire
  {
    id: 'partner_quiz_10',
    name: 'Duo Complice',
    description: '10 quiz partenaires joués',
    emoji: '💕',
    rarity: 'common',
    condition: (p) => p.stats.partnerQuizzesPlayed >= 10,
  },
  {
    id: 'partner_quiz_perfect',
    name: 'Âmes Sœurs',
    description: 'Score parfait au quiz partenaire',
    emoji: '💞',
    rarity: 'epic',
    condition: (p) => p.stats.perfectScores >= 1,
  },
  
  // Badges spéciaux
  {
    id: 'early_bird',
    name: 'Oiseau Matinal',
    description: 'Première connexion le jour du lancement',
    emoji: '🐦',
    rarity: 'legendary',
    condition: () => false, // Accordé manuellement
  },
  {
    id: 'completionist',
    name: 'Perfectionniste',
    description: 'Tous les langages au niveau 10+',
    emoji: '🌈',
    rarity: 'legendary',
    condition: (p) => 
      p.loveLanguageLevels.PV >= 10 &&
      p.loveLanguageLevels.MQ >= 10 &&
      p.loveLanguageLevels.C >= 10 &&
      p.loveLanguageLevels.SR >= 10 &&
      p.loveLanguageLevels.TP >= 10,
  },
];

// ========== TITRES ==========

export interface Title {
  id: string;
  name: string;
  emoji: string;
  requirement: string;
  unlockCondition: (progress: UserProgress) => boolean;
}

export const TITLES: Title[] = [
  { id: 'novice', name: 'Novice', emoji: '🌱', requirement: 'Niveau 1', unlockCondition: (p) => p.level >= 1 },
  { id: 'apprentice', name: 'Apprenti(e)', emoji: '📚', requirement: 'Niveau 5', unlockCondition: (p) => p.level >= 5 },
  { id: 'expert', name: 'Expert(e)', emoji: '🎓', requirement: 'Niveau 10', unlockCondition: (p) => p.level >= 10 },
  { id: 'master', name: 'Maître', emoji: '🧙', requirement: 'Niveau 25', unlockCondition: (p) => p.level >= 25 },
  { id: 'legend', name: 'Légende', emoji: '👑', requirement: 'Niveau 50', unlockCondition: (p) => p.level >= 50 },
  
  // Titres par langage
  { id: 'poet', name: 'Poète du Cœur', emoji: '✍️', requirement: 'PV niveau 10', unlockCondition: (p) => p.loveLanguageLevels.PV >= 10 },
  { id: 'timekeeper', name: 'Gardien du Temps', emoji: '⏳', requirement: 'MQ niveau 10', unlockCondition: (p) => p.loveLanguageLevels.MQ >= 10 },
  { id: 'generous', name: 'Généreux', emoji: '🎁', requirement: 'C niveau 10', unlockCondition: (p) => p.loveLanguageLevels.C >= 10 },
  { id: 'devoted', name: 'Dévoué(e)', emoji: '🤝', requirement: 'SR niveau 10', unlockCondition: (p) => p.loveLanguageLevels.SR >= 10 },
  { id: 'hugger', name: 'Maître Câlin', emoji: '🤗', requirement: 'TP niveau 10', unlockCondition: (p) => p.loveLanguageLevels.TP >= 10 },
  
  // Titres spéciaux
  { id: 'perfectionist', name: 'Perfectionniste', emoji: '💯', requirement: '10 scores parfaits', unlockCondition: (p) => p.stats.perfectScores >= 10 },
  { id: 'soulmate', name: 'Âme Sœur', emoji: '💞', requirement: '100% quiz partenaire', unlockCondition: (p) => p.stats.perfectScores >= 1 },
  { id: 'unstoppable', name: 'Inarrêtable', emoji: '🔥', requirement: '100 jours de suite', unlockCondition: (p) => p.stats.daysStreak >= 100 },
  { id: 'love_guru', name: 'Gourou de l\'Amour', emoji: '🧘', requirement: 'Tous les langages niveau 10+', unlockCondition: (p) => 
    p.loveLanguageLevels.PV >= 10 && p.loveLanguageLevels.MQ >= 10 && 
    p.loveLanguageLevels.C >= 10 && p.loveLanguageLevels.SR >= 10 && p.loveLanguageLevels.TP >= 10
  },
];

// ========== ÉVÉNEMENTS SPÉCIAUX ==========

export interface SpecialEvent {
  id: string;
  name: string;
  description: string;
  emoji: string;
  dayOfWeek: number; // 0 = Dimanche, 1 = Lundi, etc.
  xpMultiplier?: number;
  bonusActivities?: string[];
  startHour?: number;
  endHour?: number;
}

export const SPECIAL_EVENTS: SpecialEvent[] = [
  {
    id: 'monday_motivation',
    name: 'Lundi Motivation',
    description: 'Double XP sur tous les quiz !',
    emoji: '💪',
    dayOfWeek: 1,
    xpMultiplier: 2,
    bonusActivities: ['quiz_complete', 'quiz_perfect'],
  },
  {
    id: 'friday_fun',
    name: 'Vendredi Fun',
    description: 'Nouveaux défis et triple XP sur les quiz partenaires !',
    emoji: '🎉',
    dayOfWeek: 5,
    xpMultiplier: 3,
    bonusActivities: ['partner_quiz_complete', 'partner_quiz_80plus', 'partner_quiz_100'],
  },
  {
    id: 'weekend_couple',
    name: 'Weekend Couple',
    description: 'Bonus XP sur toutes les activités de couple !',
    emoji: '💕',
    dayOfWeek: 6, // Samedi
    xpMultiplier: 1.5,
    bonusActivities: ['partner_quiz_complete', 'quest_complete', 'conversation_question'],
  },
  {
    id: 'sunday_couple',
    name: 'Weekend Couple',
    description: 'Bonus XP sur toutes les activités de couple !',
    emoji: '💕',
    dayOfWeek: 0, // Dimanche
    xpMultiplier: 1.5,
    bonusActivities: ['partner_quiz_complete', 'quest_complete', 'conversation_question'],
  },
];

// Obtenir l'événement actif
export function getActiveEvent(): SpecialEvent | null {
  const now = new Date();
  const dayOfWeek = now.getDay();
  
  const event = SPECIAL_EVENTS.find(e => e.dayOfWeek === dayOfWeek);
  
  if (event && event.startHour !== undefined && event.endHour !== undefined) {
    const currentHour = now.getHours();
    if (currentHour < event.startHour || currentHour >= event.endHour) {
      return null;
    }
  }
  
  return event || null;
}

// Calculer l'XP avec bonus d'événement
export function calculateXPWithEvent(activity: string, baseXP: number): number {
  const event = getActiveEvent();
  
  if (!event) return baseXP;
  
  if (event.bonusActivities?.includes(activity) && event.xpMultiplier) {
    return Math.floor(baseXP * event.xpMultiplier);
  }
  
  return baseXP;
}

// ========== AVATARS ==========

export const AVATAR_COLORS = [
  { id: 'rose', color: '#E91E63', name: 'Rose Passion' },
  { id: 'purple', color: '#9C27B0', name: 'Violet Mystique' },
  { id: 'blue', color: '#2196F3', name: 'Bleu Sérénité' },
  { id: 'green', color: '#4CAF50', name: 'Vert Espoir' },
  { id: 'orange', color: '#FF9800', name: 'Orange Énergie' },
  { id: 'red', color: '#F44336', name: 'Rouge Passion' },
  { id: 'teal', color: '#009688', name: 'Turquoise Calme' },
  { id: 'pink', color: '#E91E63', name: 'Rose Tendre' },
];

export const AVATAR_EMOJIS = [
  '❤️', '💕', '💖', '💗', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎',
  '😊', '😍', '🥰', '😘', '🤗', '🌟', '✨', '💫', '⭐', '🌈', '🦋', '🌸',
];
