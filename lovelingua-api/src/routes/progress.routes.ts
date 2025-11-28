import { Router } from 'express';
import { z } from 'zod';
import { get, run } from '../db.js';

const router = Router();

const addXpSchema = z.object({ amount: z.number().min(0) });

type ProgressRow = {
  userId: string;
  level: number;
  currentLevelXp: number;
  nextLevelXp: number;
  totalXp: number;
  stats: string;
};

const LEVEL_STEP = 100;

const defaultStats = () => ({
  quizCompleted: 0,
  questsCompleted: 0,
  daysStreak: 0,
  lastActivity: new Date().toISOString()
});

const ensureProgress = async (userId: string): Promise<ProgressRow> => {
  const existing = await get<ProgressRow>('SELECT * FROM user_progress WHERE userId = ?', [userId]);
  if (existing) return existing;

  const stats = JSON.stringify(defaultStats());
  await run(
    `INSERT INTO user_progress (userId, level, currentLevelXp, nextLevelXp, totalXp, stats)
    VALUES (?, 1, 0, ?, 0, ? )`.replace(/\n\s+/g, ' '),
    [userId, LEVEL_STEP, stats]
  );

  return {
    userId,
    level: 1,
    currentLevelXp: 0,
    nextLevelXp: LEVEL_STEP,
    totalXp: 0,
    stats
  };
};

const mapRow = (row: ProgressRow) => ({
  userId: row.userId,
  level: row.level,
  currentLevelXp: row.currentLevelXp,
  nextLevelXp: row.nextLevelXp,
  totalXp: row.totalXp,
  stats: JSON.parse(row.stats)
});

router.get('/:userId', async (req, res) => {
  try {
    const row = await ensureProgress(req.params.userId);
    res.json(mapRow(row));
  } catch (error) {
    console.error('Failed to fetch progress', error);
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

router.post('/:userId/add-xp', async (req, res) => {
  const parse = addXpSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  try {
    const row = await ensureProgress(req.params.userId);
    const newTotal = row.totalXp + parse.data.amount;
    const level = Math.floor(newTotal / LEVEL_STEP) + 1;
    const currentLevelXp = newTotal % LEVEL_STEP;
    const nextLevelXp = LEVEL_STEP;
    const updatedStats = { ...JSON.parse(row.stats), lastActivity: new Date().toISOString() };

    await run(
      `UPDATE user_progress
      SET level = ?, currentLevelXp = ?, nextLevelXp = ?, totalXp = ?, stats = ?
      WHERE userId = ?`.replace(/\n\s+/g, ' '),
      [level, currentLevelXp, nextLevelXp, newTotal, JSON.stringify(updatedStats), req.params.userId]
    );

    res.json(
      mapRow({
        ...row,
        level,
        currentLevelXp,
        nextLevelXp,
        totalXp: newTotal,
        stats: JSON.stringify(updatedStats)
      })
    );
  } catch (error) {
    console.error('Failed to add XP', error);
    res.status(500).json({ error: 'Failed to add XP' });
  }
});

export default router;
