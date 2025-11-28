import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { get, run } from '../db.js';

const router = Router();

const coupleSchema = z.object({
  userId: z.string(),
  userName: z.string()
});

type CoupleRow = {
  id: string;
  user1Id: string;
  user1Name: string;
  user2Id: string | null;
  user2Name: string | null;
  status: string;
  loveReservoir: number;
  createdAt: string;
};

const mapRow = (row: CoupleRow) => ({
  id: row.id,
  user1Id: row.user1Id,
  user1Name: row.user1Name,
  user2Id: row.user2Id,
  user2Name: row.user2Name,
  status: row.status,
  loveReservoir: row.loveReservoir,
  createdAt: row.createdAt
});

router.post('/', async (req, res) => {
  const parse = coupleSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const coupleId = randomUUID();
  const createdAt = new Date().toISOString();

  try {
    await run(
      `INSERT INTO couples (id, user1Id, user1Name, user2Id, user2Name, status, loveReservoir, createdAt)
      VALUES (?, ?, ?, NULL, NULL, 'waiting', 0, ?)`
        .replace(/\n\s+/g, ' '),
      [coupleId, parse.data.userId, parse.data.userName, createdAt]
    );

    res.status(201).json({
      id: coupleId,
      user1Id: parse.data.userId,
      user1Name: parse.data.userName,
      user2Id: null,
      user2Name: null,
      status: 'waiting',
      loveReservoir: 0,
      createdAt
    });
  } catch (error) {
    console.error('Failed to create couple', error);
    res.status(500).json({ error: 'Failed to create couple' });
  }
});

router.get('/:coupleId', async (req, res) => {
  try {
    const couple = await get<CoupleRow>('SELECT * FROM couples WHERE id = ?', [req.params.coupleId]);
    if (!couple) {
      return res.status(404).json({ error: 'Couple not found' });
    }
    res.json(mapRow(couple));
  } catch (error) {
    console.error('Failed to fetch couple', error);
    res.status(500).json({ error: 'Failed to fetch couple' });
  }
});

router.post('/:coupleId/join', async (req, res) => {
  const parse = coupleSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  try {
    const couple = await get<CoupleRow>('SELECT * FROM couples WHERE id = ?', [req.params.coupleId]);
    if (!couple) {
      return res.status(404).json({ error: 'Couple not found' });
    }

    await run('UPDATE couples SET user2Id = ?, user2Name = ?, status = ? WHERE id = ?', [
      parse.data.userId,
      parse.data.userName,
      'linked',
      req.params.coupleId
    ]);

    res.json(
      mapRow({
        ...couple,
        user2Id: parse.data.userId,
        user2Name: parse.data.userName,
        status: 'linked'
      })
    );
  } catch (error) {
    console.error('Failed to join couple', error);
    res.status(500).json({ error: 'Failed to join couple' });
  }
});

export default router;
