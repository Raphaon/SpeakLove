import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const coupleSchema = z.object({
  userId: z.string(),
  userName: z.string()
});

router.post('/', (req, res) => {
  const parse = coupleSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  // TODO: persist in SQLite
  const coupleId = `cpl-${Date.now()}`;
  res.status(201).json({
    id: coupleId,
    user1Id: parse.data.userId,
    user1Name: parse.data.userName,
    status: 'waiting',
    loveReservoir: 0,
    createdAt: new Date().toISOString()
  });
});

router.post('/:coupleId/join', (req, res) => {
  const parse = coupleSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  res.json({ id: req.params.coupleId, user2Id: parse.data.userId, user2Name: parse.data.userName, status: 'linked' });
});

export default router;
