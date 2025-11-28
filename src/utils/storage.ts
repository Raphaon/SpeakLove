import { LoveLanguageCode } from '../data/loveLanguages';

export interface TestResult {
  id: string;
  date: string;
  scores: Record<string, number>; // words, quality-time, gifts, acts, touch
  primaryLanguage: string;
  primaryLanguageId: string;
}

export interface UserPreferences {
  prenom?: string;
  typeRelationParDefaut?: string;
  userName?: string; // Added for backward compatibility
}

export interface UserProfile {
  userId: string;
  firstName: string;
  birthDate?: string; // Added to match ProfileSetupIonic
  gender?: 'male' | 'female' | 'other' | string;
  relationshipStatus: string; // Made flexible for all status types
  goal?: 'self-discovery' | 'improve-relationship' | 'prepare-future' | 'help-others' | 'curiosity';
  createdAt: string;
  updatedAt?: string;
}

// Stockage local pour les résultats de test
export const saveTestResult = (result: TestResult): void => {
  const results = getTestResults();
  results.push(result);
  localStorage.setItem('loveLanguageResults', JSON.stringify(results));
};

export const getTestResults = (): TestResult[] => {
  const stored = localStorage.getItem('loveLanguageResults');
  return stored ? JSON.parse(stored) : [];
};

export const getLatestTestResult = (): TestResult | null => {
  const results = getTestResults();
  return results.length > 0 ? results[results.length - 1] : null;
};

export const clearTestResults = (): void => {
  localStorage.removeItem('loveLanguageResults');
};

// Stockage des préférences utilisateur
export const saveUserPreferences = (prefs: UserPreferences): void => {
  localStorage.setItem('userPreferences', JSON.stringify(prefs));
};

export const getUserPreferences = (): UserPreferences => {
  const stored = localStorage.getItem('userPreferences');
  return stored ? JSON.parse(stored) : {};
};

// Favoris pour les gestes
export const toggleFavoriteGesture = (gestureId: string): void => {
  const favorites = getFavoriteGestures();
  const index = favorites.indexOf(gestureId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(gestureId);
  }
  
  localStorage.setItem('favoriteGestures', JSON.stringify(favorites));
};

export const getFavoriteGestures = (): string[] => {
  const stored = localStorage.getItem('favoriteGestures');
  return stored ? JSON.parse(stored) : [];
};

export const isFavoriteGesture = (gestureId: string): boolean => {
  return getFavoriteGestures().includes(gestureId);
};

// Favoris pour les questions de conversation
export const toggleFavoriteQuestion = (questionId: string): void => {
  const favorites = getFavoriteQuestions();
  const index = favorites.indexOf(questionId);
  
  if (index > -1) {
    favorites.splice(index, 1);
  } else {
    favorites.push(questionId);
  }
  
  localStorage.setItem('favoriteQuestions', JSON.stringify(favorites));
};

export const getFavoriteQuestions = (): string[] => {
  const stored = localStorage.getItem('favoriteQuestions');
  return stored ? JSON.parse(stored) : [];
};

export const isFavoriteQuestion = (questionId: string): boolean => {
  return getFavoriteQuestions().includes(questionId);
};

// User ID management
export const getUserId = (): string => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
};

// Couple mode storage
export const saveCoupleId = (coupleId: string): void => {
  localStorage.setItem('coupleId', coupleId);
};

export const getCoupleId = (): string | null => {
  return localStorage.getItem('coupleId');
};

export const clearCoupleId = (): void => {
  localStorage.removeItem('coupleId');
};

// User Profile management
export const saveUserProfile = (profile: Partial<UserProfile>): void => {
  // Generate userId if not provided
  const userId = profile.userId || getUserId();
  
  const updatedProfile: UserProfile = {
    ...profile,
    userId,
    firstName: profile.firstName || '',
    relationshipStatus: profile.relationshipStatus || 'single',
    createdAt: profile.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as UserProfile;
  
  localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
  
  // Also update old preferences for backward compatibility
  saveUserPreferences({
    prenom: updatedProfile.firstName,
    userName: updatedProfile.firstName,
  });
};

export const getUserProfile = (): UserProfile | null => {
  const stored = localStorage.getItem('userProfile');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Error parsing user profile:', error);
      return null;
    }
  }
  
  // Try to migrate from old preferences
  const oldPrefs = getUserPreferences();
  if (oldPrefs.prenom || oldPrefs.userName) {
    const migratedProfile: UserProfile = {
      userId: getUserId(),
      firstName: oldPrefs.prenom || oldPrefs.userName || '',
      relationshipStatus: 'single',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveUserProfile(migratedProfile);
    return migratedProfile;
  }
  
  return null;
};

export const hasUserProfile = (): boolean => {
  return getUserProfile() !== null;
};

export const clearUserProfile = (): void => {
  localStorage.removeItem('userProfile');
};
