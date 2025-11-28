import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const addXpSchema = z.object({ amount: z.number().min(0) });

router.get('/:userId', (req, res) => {
  res.json({
    userId: req.params.userId,
    level: 1,
    currentLevelXp: 0,
    nextLevelXp: 100,
    totalXp: 0,
    stats: { quizCompleted: 0, questsCompleted: 0, daysStreak: 0, lastActivity: new Date().toISOString() }
  });
});

router.post('/:userId/add-xp', (req, res) => {
  const parse = addXpSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  res.json({
    userId: req.params.userId,
    level: 1,
    currentLevelXp: parse.data.amount,
    nextLevelXp: 100,
    totalXp: parse.data.amount,
    stats: { quizCompleted: 0, questsCompleted: 0, daysStreak: 0, lastActivity: new Date().toISOString() }
  });
});

export default router;
