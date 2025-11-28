import { projectId, publicAnonKey } from './supabase/info';
import { getUserId } from './storage';
import { XP_REWARDS, calculateXPWithEvent } from '../data/progressionSystem';

/**
 * Add XP to the current user
 */
export async function addXP(
  activity: string,
  loveLanguage?: 'PV' | 'MQ' | 'C' | 'SR' | 'TP'
): Promise<{ success: boolean; xpGained: number; leveledUp: boolean; error?: string }> {
  try {
    const userId = getUserId();
    
    // Find the XP reward for this activity
    const reward = XP_REWARDS.find(r => r.activity === activity);
    
    if (!reward) {
      console.error(`No XP reward found for activity: ${activity}`);
      return { success: false, xpGained: 0, leveledUp: false, error: 'Activity not found' };
    }

    // Calculate XP with event bonuses
    const xpToAdd = calculateXPWithEvent(activity, reward.baseXP);

    // Call the API to add XP
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/progress/${userId}/add-xp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          xp: xpToAdd,
          loveLanguage: loveLanguage || reward.loveLanguage,
          activity,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        xpGained: xpToAdd,
        leveledUp: data.leveledUp || false,
      };
    } else {
      return {
        success: false,
        xpGained: 0,
        leveledUp: false,
        error: data.error,
      };
    }
  } catch (error) {
    console.error('Error adding XP:', error);
    return {
      success: false,
      xpGained: 0,
      leveledUp: false,
      error: String(error),
    };
  }
}

/**
 * Show XP notification toast
 */
export function showXPNotification(xpGained: number, activity: string) {
  // Create a simple toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 right-6 z-50 animate-slide-in-right';
  toast.innerHTML = `
    <div class="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
      <div class="text-2xl">⭐</div>
      <div>
        <p class="font-medium">+${xpGained} XP</p>
        <p class="text-sm text-white/90">${getActivityName(activity)}</p>
      </div>
    </div>
  `;

  document.body.appendChild(toast);

  // Remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('animate-slide-out-right');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

/**
 * Show level up notification
 */
export function showLevelUpNotification(newLevel: number) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 right-6 z-50 animate-bounce';
  toast.innerHTML = `
    <div class="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-8 py-6 rounded-3xl shadow-2xl text-center">
      <div class="text-5xl mb-2">🎉</div>
      <p class="text-2xl font-bold mb-1">Niveau ${newLevel} !</p>
      <p class="text-sm text-white/90">Vous progressez !</p>
    </div>
  `;

  document.body.appendChild(toast);

  // Remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 5000);
}

/**
 * Get activity display name
 */
function getActivityName(activity: string): string {
  const reward = XP_REWARDS.find(r => r.activity === activity);
  return reward?.description || activity;
}

/**
 * Unlock a badge
 */
export async function unlockBadge(badgeId: string): Promise<boolean> {
  try {
    const userId = getUserId();

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/progress/${userId}/unlock-badge`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ badgeId }),
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error unlocking badge:', error);
    return false;
  }
}

/**
 * Unlock a title
 */
export async function unlockTitle(titleId: string): Promise<boolean> {
  try {
    const userId = getUserId();

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/progress/${userId}/unlock-title`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ titleId }),
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error unlocking title:', error);
    return false;
  }
}

/**
 * Set active title
 */
export async function setActiveTitle(titleId: string): Promise<boolean> {
  try {
    const userId = getUserId();

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-b0056f59/progress/${userId}/set-title`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ titleId }),
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('Error setting title:', error);
    return false;
  }
}

/**
 * Check and unlock badges based on progress
 */
export async function checkAndUnlockBadges(progress: any): Promise<string[]> {
  const { BADGES } = await import('../data/progressionSystem');
  const unlockedBadges: string[] = [];

  for (const badge of BADGES) {
    if (!progress.badges.includes(badge.id) && badge.condition(progress)) {
      const success = await unlockBadge(badge.id);
      if (success) {
        unlockedBadges.push(badge.id);
        showBadgeUnlockNotification(badge.name, badge.emoji);
      }
    }
  }

  return unlockedBadges;
}

/**
 * Check and unlock titles based on progress
 */
export async function checkAndUnlockTitles(progress: any): Promise<string[]> {
  const { TITLES } = await import('../data/progressionSystem');
  const unlockedTitles: string[] = [];

  for (const title of TITLES) {
    if (!progress.titles.includes(title.id) && title.unlockCondition(progress)) {
      const success = await unlockTitle(title.id);
      if (success) {
        unlockedTitles.push(title.id);
        showTitleUnlockNotification(title.name, title.emoji);
      }
    }
  }

  return unlockedTitles;
}

/**
 * Show badge unlock notification
 */
function showBadgeUnlockNotification(badgeName: string, emoji: string) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce';
  toast.innerHTML = `
    <div class="bg-gradient-to-br from-blue-500 to-purple-500 text-white px-8 py-6 rounded-3xl shadow-2xl text-center">
      <div class="text-5xl mb-2">${emoji}</div>
      <p class="text-xl font-bold mb-1">Nouveau Badge !</p>
      <p class="text-sm text-white/90">${badgeName}</p>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 4000);
}

/**
 * Show title unlock notification
 */
function showTitleUnlockNotification(titleName: string, emoji: string) {
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce';
  toast.innerHTML = `
    <div class="bg-gradient-to-br from-yellow-500 to-orange-500 text-white px-8 py-6 rounded-3xl shadow-2xl text-center">
      <div class="text-5xl mb-2">${emoji}</div>
      <p class="text-xl font-bold mb-1">Nouveau Titre !</p>
      <p class="text-sm text-white/90">${titleName}</p>
    </div>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity', 'duration-500');
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 500);
  }, 4000);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slide-in-right {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-out-right {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.3s ease-out;
  }

  .animate-slide-out-right {
    animation: slide-out-right 0.3s ease-in;
  }
`;
document.head.appendChild(style);
