export interface UserProgress {
  userId: string;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  totalXp: number;
  stats: {
    quizCompleted: number;
    questsCompleted: number;
    daysStreak: number;
    lastActivity: string;
  };
}
