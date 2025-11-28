import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

// Helper function to generate a random game code
function generateGameCode(): string {
  const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

// Helper function to generate a unique game ID
function generateGameId(): string {
  return `game_${Date.now()}_${Math.random().toString(36).substring(7)}`;
}

interface GameSession {
  id: string;
  code: string;
  hostPlayerId: string;
  hostPlayerName: string;
  guestPlayerId?: string;
  guestPlayerName?: string;
  currentTurn: 'host' | 'guest';
  currentQuestionIndex: number;
  questions: any[];
  messages: ChatMessage[];
  status: 'waiting' | 'playing' | 'finished';
  createdAt: number;
  typingStatus?: {
    playerId: string;
    playerName: string;
    timestamp: number;
  };
}

interface ChatMessage {
  id: string;
  playerId: string;
  playerName: string;
  message: string;
  timestamp: number;
}

interface CoupleLink {
  id: string;
  code: string;
  user1Id: string;
  user1Name: string;
  user1LatestResultId?: string;
  user1LatestResult?: any; // Full result data
  user2Id?: string;
  user2Name?: string;
  user2LatestResultId?: string;
  user2LatestResult?: any; // Full result data
  status: 'waiting' | 'linked';
  createdAt: number;
  loveReservoir: number; // 0-100
  lastReservoirUpdate: number;
  dailyQuests?: DailyQuest[];
  questHistory?: CompletedQuest[];
}

interface DailyQuest {
  id: string;
  userId: string;
  userName: string;
  partnerId: string;
  partnerName: string;
  partnerPrimaryLanguage: string;
  title: string;
  description: string;
  points: number;
  date: string; // ISO date
  completed: boolean;
  completedAt?: number;
}

interface CompletedQuest {
  questId: string;
  userId: string;
  userName: string;
  title: string;
  points: number;
  completedAt: number;
}

// Create a new game session
app.post('/make-server-b0056f59/game/create', async (c) => {
  try {
    const body = await c.req.json();
    const { playerName, questions } = body;

    if (!playerName || !questions) {
      return c.json({ error: 'Player name and questions are required' }, 400);
    }

    const gameId = generateGameId();
    const gameCode = generateGameCode();
    const playerId = `player_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const gameSession: GameSession = {
      id: gameId,
      code: gameCode,
      hostPlayerId: playerId,
      hostPlayerName: playerName,
      currentTurn: 'host',
      currentQuestionIndex: 0,
      questions,
      messages: [],
      status: 'waiting',
      createdAt: Date.now(),
    };

    await kv.set(gameId, gameSession);
    await kv.set(`code_${gameCode}`, gameId);

    console.log(`Game created: ${gameId} with code: ${gameCode}`);

    return c.json({
      success: true,
      gameId,
      gameCode,
      playerId,
      session: gameSession,
    });
  } catch (error) {
    console.error('Error creating game:', error);
    return c.json({ error: 'Failed to create game', details: String(error) }, 500);
  }
});

// Join a game session
app.post('/make-server-b0056f59/game/join', async (c) => {
  try {
    const body = await c.req.json();
    const { gameCode, playerName } = body;

    if (!gameCode || !playerName) {
      return c.json({ error: 'Game code and player name are required' }, 400);
    }

    const gameId = await kv.get(`code_${gameCode.toUpperCase()}`);

    if (!gameId) {
      return c.json({ error: 'Game not found' }, 404);
    }

    const gameSession = await kv.get(gameId) as GameSession;

    if (!gameSession) {
      return c.json({ error: 'Game session not found' }, 404);
    }

    if (gameSession.status !== 'waiting') {
      return c.json({ error: 'Game already in progress or finished' }, 400);
    }

    if (gameSession.guestPlayerId) {
      return c.json({ error: 'Game is full' }, 400);
    }

    const playerId = `player_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    gameSession.guestPlayerId = playerId;
    gameSession.guestPlayerName = playerName;
    gameSession.status = 'playing';

    await kv.set(gameId, gameSession);

    console.log(`Player ${playerName} joined game ${gameId}`);

    return c.json({
      success: true,
      gameId,
      playerId,
      session: gameSession,
    });
  } catch (error) {
    console.error('Error joining game:', error);
    return c.json({ error: 'Failed to join game', details: String(error) }, 500);
  }
});

// Get game session
app.get('/make-server-b0056f59/game/:gameId', async (c) => {
  try {
    const gameId = c.req.param('gameId');

    const gameSession = await kv.get(gameId) as GameSession;

    if (!gameSession) {
      return c.json({ error: 'Game not found' }, 404);
    }

    return c.json({
      success: true,
      session: gameSession,
    });
  } catch (error) {
    console.error('Error getting game:', error);
    return c.json({ error: 'Failed to get game', details: String(error) }, 500);
  }
});

// Send a chat message
app.post('/make-server-b0056f59/game/:gameId/message', async (c) => {
  try {
    const gameId = c.req.param('gameId');
    const body = await c.req.json();
    const { playerId, playerName, message } = body;

    if (!playerId || !message) {
      return c.json({ error: 'Player ID and message are required' }, 400);
    }

    const gameSession = await kv.get(gameId) as GameSession;

    if (!gameSession) {
      return c.json({ error: 'Game not found' }, 404);
    }

    const chatMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      playerId,
      playerName,
      message,
      timestamp: Date.now(),
    };

    gameSession.messages.push(chatMessage);

    await kv.set(gameId, gameSession);

    return c.json({
      success: true,
      message: chatMessage,
    });
  } catch (error) {
    console.error('Error sending message:', error);
    return c.json({ error: 'Failed to send message', details: String(error) }, 500);
  }
});

// Continue to next question
app.post('/make-server-b0056f59/game/:gameId/next', async (c) => {
  try {
    const gameId = c.req.param('gameId');
    const body = await c.req.json();
    const { playerId } = body;

    if (!playerId) {
      return c.json({ error: 'Player ID is required' }, 400);
    }

    const gameSession = await kv.get(gameId) as GameSession;

    if (!gameSession) {
      return c.json({ error: 'Game not found' }, 404);
    }

    // Toggle turn
    if (gameSession.currentTurn === 'host') {
      gameSession.currentTurn = 'guest';
    } else {
      gameSession.currentTurn = 'host';
      gameSession.currentQuestionIndex++;
    }

    // Check if game is finished
    if (gameSession.currentQuestionIndex >= gameSession.questions.length) {
      gameSession.status = 'finished';
    }

    await kv.set(gameId, gameSession);

    return c.json({
      success: true,
      session: gameSession,
    });
  } catch (error) {
    console.error('Error moving to next question:', error);
    return c.json({ error: 'Failed to move to next question', details: String(error) }, 500);
  }
});

// Leave game
app.post('/make-server-b0056f59/game/:gameId/leave', async (c) => {
  try {
    const gameId = c.req.param('gameId');
    const body = await c.req.json();
    const { playerId } = body;

    if (!playerId) {
      return c.json({ error: 'Player ID is required' }, 400);
    }

    const gameSession = await kv.get(gameId) as GameSession;

    if (!gameSession) {
      return c.json({ error: 'Game not found' }, 404);
    }

    // If host leaves, end the game
    if (gameSession.hostPlayerId === playerId) {
      await kv.del(gameId);
      await kv.del(`code_${gameSession.code}`);
      
      return c.json({
        success: true,
        message: 'Game ended',
      });
    }

    // If guest leaves, reset game to waiting
    if (gameSession.guestPlayerId === playerId) {
      gameSession.guestPlayerId = undefined;
      gameSession.guestPlayerName = undefined;
      gameSession.status = 'waiting';
      gameSession.currentQuestionIndex = 0;
      gameSession.currentTurn = 'host';
      gameSession.messages = [];

      await kv.set(gameId, gameSession);

      return c.json({
        success: true,
        message: 'Player left, game reset to waiting',
      });
    }

    return c.json({ error: 'Player not found in game' }, 404);
  } catch (error) {
    console.error('Error leaving game:', error);
    return c.json({ error: 'Failed to leave game', details: String(error) }, 500);
  }
});

// Update typing status
app.post('/make-server-b0056f59/game/:gameId/typing', async (c) => {
  try {
    const gameId = c.req.param('gameId');
    const body = await c.req.json();
    const { playerId, playerName, isTyping } = body;

    if (!playerId) {
      return c.json({ error: 'Player ID is required' }, 400);
    }

    const gameSession = await kv.get(gameId) as GameSession;

    if (!gameSession) {
      return c.json({ error: 'Game not found' }, 404);
    }

    if (isTyping) {
      gameSession.typingStatus = {
        playerId,
        playerName,
        timestamp: Date.now(),
      };
    } else {
      // Clear typing status if the same player stops typing
      if (gameSession.typingStatus?.playerId === playerId) {
        gameSession.typingStatus = undefined;
      }
    }

    await kv.set(gameId, gameSession);

    return c.json({
      success: true,
    });
  } catch (error) {
    console.error('Error updating typing status:', error);
    return c.json({ error: 'Failed to update typing status', details: String(error) }, 500);
  }
});

// ========== COUPLE MODE ROUTES ==========

// Create a new couple link
app.post('/make-server-b0056f59/couple/create', async (c) => {
  try {
    const body = await c.req.json();
    const { userId, userName, latestResultId } = body;

    if (!userId || !userName) {
      return c.json({ error: 'User ID and name are required' }, 400);
    }

    const coupleId = `couple_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const coupleCode = generateGameCode();

    const coupleLink: CoupleLink = {
      id: coupleId,
      code: coupleCode,
      user1Id: userId,
      user1Name: userName,
      user1LatestResultId: latestResultId,
      status: 'waiting',
      createdAt: Date.now(),
      loveReservoir: 50,
      lastReservoirUpdate: Date.now(),
    };

    await kv.set(coupleId, coupleLink);
    await kv.set(`couple_code_${coupleCode}`, coupleId);
    await kv.set(`user_couple_${userId}`, coupleId);

    console.log(`Couple link created: ${coupleId} with code: ${coupleCode}`);

    return c.json({
      success: true,
      coupleId,
      coupleCode,
      couple: coupleLink,
    });
  } catch (error) {
    console.error('Error creating couple link:', error);
    return c.json({ error: 'Failed to create couple link', details: String(error) }, 500);
  }
});

// Join a couple link
app.post('/make-server-b0056f59/couple/join', async (c) => {
  try {
    const body = await c.req.json();
    const { coupleCode, userId, userName, latestResultId } = body;

    if (!coupleCode || !userId || !userName) {
      return c.json({ error: 'Couple code, user ID, and name are required' }, 400);
    }

    const coupleId = await kv.get(`couple_code_${coupleCode.toUpperCase()}`);

    if (!coupleId) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link data not found' }, 404);
    }

    if (coupleLink.status !== 'waiting') {
      return c.json({ error: 'Couple link already completed' }, 400);
    }

    if (coupleLink.user1Id === userId) {
      return c.json({ error: 'Cannot link with yourself' }, 400);
    }

    coupleLink.user2Id = userId;
    coupleLink.user2Name = userName;
    coupleLink.user2LatestResultId = latestResultId;
    coupleLink.status = 'linked';

    await kv.set(coupleId, coupleLink);
    await kv.set(`user_couple_${userId}`, coupleId);

    console.log(`User ${userName} joined couple ${coupleId}`);

    return c.json({
      success: true,
      coupleId,
      couple: coupleLink,
    });
  } catch (error) {
    console.error('Error joining couple link:', error);
    return c.json({ error: 'Failed to join couple link', details: String(error) }, 500);
  }
});

// Get couple link by ID
app.get('/make-server-b0056f59/couple/:coupleId', async (c) => {
  try {
    const coupleId = c.req.param('coupleId');

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    return c.json({
      success: true,
      couple: coupleLink,
    });
  } catch (error) {
    console.error('Error getting couple link:', error);
    return c.json({ error: 'Failed to get couple link', details: String(error) }, 500);
  }
});

// Get user's couple link
app.get('/make-server-b0056f59/couple/user/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');

    const coupleId = await kv.get(`user_couple_${userId}`);

    if (!coupleId) {
      return c.json({ success: true, couple: null });
    }

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ success: true, couple: null });
    }

    return c.json({
      success: true,
      couple: coupleLink,
    });
  } catch (error) {
    console.error('Error getting user couple:', error);
    return c.json({ error: 'Failed to get user couple', details: String(error) }, 500);
  }
});

// Update user's latest result in couple
app.post('/make-server-b0056f59/couple/:coupleId/update-result', async (c) => {
  try {
    const coupleId = c.req.param('coupleId');
    const body = await c.req.json();
    const { userId, latestResultId, latestResult } = body;

    if (!userId || !latestResultId) {
      return c.json({ error: 'User ID and latest result ID are required' }, 400);
    }

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    if (coupleLink.user1Id === userId) {
      coupleLink.user1LatestResultId = latestResultId;
      coupleLink.user1LatestResult = latestResult;
    } else if (coupleLink.user2Id === userId) {
      coupleLink.user2LatestResultId = latestResultId;
      coupleLink.user2LatestResult = latestResult;
    } else {
      return c.json({ error: 'User not part of this couple' }, 403);
    }

    await kv.set(coupleId, coupleLink);

    return c.json({
      success: true,
      couple: coupleLink,
    });
  } catch (error) {
    console.error('Error updating couple result:', error);
    return c.json({ error: 'Failed to update couple result', details: String(error) }, 500);
  }
});

// Unlink couple
app.delete('/make-server-b0056f59/couple/:coupleId', async (c) => {
  try {
    const coupleId = c.req.param('coupleId');

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    await kv.del(coupleId);
    await kv.del(`couple_code_${coupleLink.code}`);
    await kv.del(`user_couple_${coupleLink.user1Id}`);
    if (coupleLink.user2Id) {
      await kv.del(`user_couple_${coupleLink.user2Id}`);
    }

    return c.json({
      success: true,
      message: 'Couple link deleted',
    });
  } catch (error) {
    console.error('Error deleting couple link:', error);
    return c.json({ error: 'Failed to delete couple link', details: String(error) }, 500);
  }
});

// ========== LOVELINGU QUESTS SYSTEM ==========

// Helper function to generate daily quests
function generateDailyQuests(couple: CoupleLink, date: string): DailyQuest[] {
  if (!couple.user1LatestResult || !couple.user2LatestResult) {
    return [];
  }

  const quests: DailyQuest[] = [];
  
  // Generate quest for user1 based on user2's primary language
  const user2Primary = couple.user2LatestResult.primaryLanguageId;
  const user1Quest = generateQuestForLanguage(
    couple.user1Id,
    couple.user1Name,
    couple.user2Id!,
    couple.user2Name!,
    user2Primary,
    date
  );
  if (user1Quest) quests.push(user1Quest);

  // Generate quest for user2 based on user1's primary language
  const user1Primary = couple.user1LatestResult.primaryLanguageId;
  const user2Quest = generateQuestForLanguage(
    couple.user2Id!,
    couple.user2Name!,
    couple.user1Id,
    couple.user1Name,
    user1Primary,
    date
  );
  if (user2Quest) quests.push(user2Quest);

  return quests;
}

function generateQuestForLanguage(
  userId: string,
  userName: string,
  partnerId: string,
  partnerName: string,
  partnerLanguage: string,
  date: string
): DailyQuest | null {
  const questTemplates: Record<string, { title: string; description: string; points: number }[]> = {
    'words': [
      {
        title: `Complimente ${partnerName}`,
        description: `Dites sincèrement à ${partnerName} quelque chose que vous appréciez chez elle/lui aujourd'hui.`,
        points: 10,
      },
      {
        title: 'Message d\'amour',
        description: `Envoyez un SMS ou message vocal à ${partnerName} pour exprimer votre affection.`,
        points: 10,
      },
      {
        title: 'Mot doux',
        description: `Laissez une petite note affectueuse pour ${partnerName} (sur le frigo, dans son sac, etc.).`,
        points: 15,
      },
    ],
    'quality-time': [
      {
        title: `Temps exclusif avec ${partnerName}`,
        description: `Accordez 30 minutes d'attention complète à ${partnerName}, sans téléphone ni distraction.`,
        points: 15,
      },
      {
        title: 'Activité ensemble',
        description: `Proposez une activité à faire ensemble (balade, jeu, cuisine, etc.).`,
        points: 15,
      },
      {
        title: 'Conversation profonde',
        description: `Posez une question personnelle à ${partnerName} et écoutez activement sa réponse.`,
        points: 10,
      },
    ],
    'gifts': [
      {
        title: `Petite attention pour ${partnerName}`,
        description: `Offrez un petit cadeau symbolique (sa friandise préférée, une fleur, un objet qui vous a fait penser à elle/lui).`,
        points: 15,
      },
      {
        title: 'Surprise du jour',
        description: `Préparez une petite surprise pour ${partnerName} (même symbolique).`,
        points: 15,
      },
      {
        title: 'Geste attentionné',
        description: `Rapportez quelque chose qui fera plaisir à ${partnerName}.`,
        points: 10,
      },
    ],
    'acts': [
      {
        title: `Aidez ${partnerName}`,
        description: `Prenez en charge une tâche que ${partnerName} déteste ou trouve pénible.`,
        points: 15,
      },
      {
        title: 'Service rendu',
        description: `Faites quelque chose de concret pour faciliter la journée de ${partnerName}.`,
        points: 15,
      },
      {
        title: 'Action préventive',
        description: `Anticipez un besoin de ${partnerName} et agissez sans qu'on vous le demande.`,
        points: 10,
      },
    ],
    'touch': [
      {
        title: `Contact physique avec ${partnerName}`,
        description: `Câlin, massage des épaules, tenir la main pendant 5 minutes.`,
        points: 10,
      },
      {
        title: 'Proximité affectueuse',
        description: `Restez physiquement proche de ${partnerName} (assis côte à côte, main sur l'épaule, etc.).`,
        points: 10,
      },
      {
        title: 'Moment de tendresse',
        description: `Initiez un moment de tendresse physique avec ${partnerName}.`,
        points: 15,
      },
    ],
  };

  const templates = questTemplates[partnerLanguage];
  if (!templates || templates.length === 0) return null;

  // Pick a random template
  const template = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: `quest_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    userId,
    userName,
    partnerId,
    partnerName,
    partnerPrimaryLanguage: partnerLanguage,
    ...template,
    date,
    completed: false,
  };
}

// Get or generate daily quests
app.get('/make-server-b0056f59/couple/:coupleId/quests', async (c) => {
  try {
    const coupleId = c.req.param('coupleId');
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    // Check if we need to generate new quests
    const needsNewQuests = !coupleLink.dailyQuests || 
      coupleLink.dailyQuests.length === 0 ||
      coupleLink.dailyQuests[0].date !== today;

    if (needsNewQuests && coupleLink.status === 'linked') {
      // Generate new daily quests
      coupleLink.dailyQuests = generateDailyQuests(coupleLink, today);
      await kv.set(coupleId, coupleLink);
    }

    return c.json({
      success: true,
      quests: coupleLink.dailyQuests || [],
      loveReservoir: coupleLink.loveReservoir || 50,
    });
  } catch (error) {
    console.error('Error getting quests:', error);
    return c.json({ error: 'Failed to get quests', details: String(error) }, 500);
  }
});

// Complete a quest
app.post('/make-server-b0056f59/couple/:coupleId/quest/:questId/complete', async (c) => {
  try {
    const coupleId = c.req.param('coupleId');
    const questId = c.req.param('questId');

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    if (!coupleLink.dailyQuests) {
      return c.json({ error: 'No quests found' }, 404);
    }

    const quest = coupleLink.dailyQuests.find(q => q.id === questId);

    if (!quest) {
      return c.json({ error: 'Quest not found' }, 404);
    }

    if (quest.completed) {
      return c.json({ error: 'Quest already completed' }, 400);
    }

    // Mark quest as completed
    quest.completed = true;
    quest.completedAt = Date.now();

    // Add to history
    if (!coupleLink.questHistory) {
      coupleLink.questHistory = [];
    }

    coupleLink.questHistory.push({
      questId: quest.id,
      userId: quest.userId,
      userName: quest.userName,
      title: quest.title,
      points: quest.points,
      completedAt: Date.now(),
    });

    // Update love reservoir
    const reservoirIncrease = quest.points;
    coupleLink.loveReservoir = Math.min(100, coupleLink.loveReservoir + reservoirIncrease);
    coupleLink.lastReservoirUpdate = Date.now();

    await kv.set(coupleId, coupleLink);

    return c.json({
      success: true,
      quest,
      loveReservoir: coupleLink.loveReservoir,
      message: `+${reservoirIncrease} points au réservoir d'amour !`,
    });
  } catch (error) {
    console.error('Error completing quest:', error);
    return c.json({ error: 'Failed to complete quest', details: String(error) }, 500);
  }
});

// Update love reservoir (decay over time)
app.post('/make-server-b0056f59/couple/:coupleId/reservoir/update', async (c) => {
  try {
    const coupleId = c.req.param('coupleId');

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    // Calculate decay (1 point per day of inactivity)
    const now = Date.now();
    const hoursSinceUpdate = (now - coupleLink.lastReservoirUpdate) / (1000 * 60 * 60);
    const daysSinceUpdate = Math.floor(hoursSinceUpdate / 24);
    
    if (daysSinceUpdate > 0) {
      const decay = daysSinceUpdate * 1;
      coupleLink.loveReservoir = Math.max(0, coupleLink.loveReservoir - decay);
      coupleLink.lastReservoirUpdate = now;
      await kv.set(coupleId, coupleLink);
    }

    return c.json({
      success: true,
      loveReservoir: coupleLink.loveReservoir,
    });
  } catch (error) {
    console.error('Error updating reservoir:', error);
    return c.json({ error: 'Failed to update reservoir', details: String(error) }, 500);
  }
});

// Get quest history
app.get('/make-server-b0056f59/couple/:coupleId/history', async (c) => {
  try {
    const coupleId = c.req.param('coupleId');

    const coupleLink = await kv.get(coupleId) as CoupleLink;

    if (!coupleLink) {
      return c.json({ error: 'Couple link not found' }, 404);
    }

    return c.json({
      success: true,
      history: coupleLink.questHistory || [],
    });
  } catch (error) {
    console.error('Error getting history:', error);
    return c.json({ error: 'Failed to get history', details: String(error) }, 500);
  }
});

// ========== WISHLIST SYSTEM ==========

interface WishlistItem {
  id: string;
  userId: string;
  userName: string;
  category: 'material-gift' | 'action' | 'sweet-words';
  content: string;
  notes?: string;
  completed: boolean;
  completedBy?: string;
  completedByName?: string;
  completedAt?: string;
  createdAt: string;
}

// Get wishlist for couple
app.get('/make-server-b0056f59/couple/:coupleId/wishlist', async (c) => {
  const coupleId = c.req.param('coupleId');
  
  try {
    const items = await kv.getByPrefix<WishlistItem>(`wishlist_${coupleId}_`);
    return c.json({ success: true, items: items.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) });
  } catch (error) {
    console.error('Error getting wishlist:', error);
    return c.json({ error: 'Failed to get wishlist', details: String(error) }, 500);
  }
});

// Add wishlist item
app.post('/make-server-b0056f59/couple/:coupleId/wishlist', async (c) => {
  const coupleId = c.req.param('coupleId');
  const body = await c.req.json();
  
  try {
    const item: WishlistItem = {
      id: `wish_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId: body.userId,
      userName: body.userName,
      category: body.category,
      content: body.content,
      notes: body.notes,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`wishlist_${coupleId}_${item.id}`, item);
    return c.json({ success: true, item });
  } catch (error) {
    console.error('Error adding wishlist item:', error);
    return c.json({ error: 'Failed to add item', details: String(error) }, 500);
  }
});

// Update wishlist item (toggle complete)
app.patch('/make-server-b0056f59/couple/:coupleId/wishlist/:itemId', async (c) => {
  const coupleId = c.req.param('coupleId');
  const itemId = c.req.param('itemId');
  const body = await c.req.json();
  
  try {
    const key = `wishlist_${coupleId}_${itemId}`;
    const item = await kv.get<WishlistItem>(key);
    
    if (!item) {
      return c.json({ error: 'Item not found' }, 404);
    }
    
    const updatedItem: WishlistItem = {
      ...item,
      completed: body.completed,
      completedBy: body.completedBy,
      completedByName: body.completedByName,
      completedAt: body.completed ? new Date().toISOString() : undefined,
    };
    
    await kv.set(key, updatedItem);
    return c.json({ success: true, item: updatedItem });
  } catch (error) {
    console.error('Error updating wishlist item:', error);
    return c.json({ error: 'Failed to update item', details: String(error) }, 500);
  }
});

// Delete wishlist item
app.delete('/make-server-b0056f59/couple/:coupleId/wishlist/:itemId', async (c) => {
  const coupleId = c.req.param('coupleId');
  const itemId = c.req.param('itemId');
  
  try {
    await kv.del(`wishlist_${coupleId}_${itemId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting wishlist item:', error);
    return c.json({ error: 'Failed to delete item', details: String(error) }, 500);
  }
});

// ========== CHECK-IN SYSTEM ==========

interface CheckIn {
  id: string;
  userId: string;
  userName: string;
  date: string;
  feltLoved: string;
  needsTomorrow: string;
  createdAt: string;
}

// Get check-ins for couple
app.get('/make-server-b0056f59/couple/:coupleId/checkins', async (c) => {
  const coupleId = c.req.param('coupleId');
  
  try {
    const checkIns = await kv.getByPrefix<CheckIn>(`checkin_${coupleId}_`);
    return c.json({ success: true, checkIns: checkIns.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    ) });
  } catch (error) {
    console.error('Error getting check-ins:', error);
    return c.json({ error: 'Failed to get check-ins', details: String(error) }, 500);
  }
});

// Add check-in
app.post('/make-server-b0056f59/couple/:coupleId/checkins', async (c) => {
  const coupleId = c.req.param('coupleId');
  const body = await c.req.json();
  
  try {
    const checkIn: CheckIn = {
      id: `checkin_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId: body.userId,
      userName: body.userName,
      date: body.date,
      feltLoved: body.feltLoved,
      needsTomorrow: body.needsTomorrow,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`checkin_${coupleId}_${checkIn.id}`, checkIn);
    return c.json({ success: true, checkIn });
  } catch (error) {
    console.error('Error adding check-in:', error);
    return c.json({ error: 'Failed to add check-in', details: String(error) }, 500);
  }
});

// ========== COUPONS SYSTEM ==========

interface Coupon {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  title: string;
  description?: string;
  loveLanguage: string;
  validUntil?: string;
  redeemed: boolean;
  redeemedAt?: string;
  createdAt: string;
}

// Get coupons for couple
app.get('/make-server-b0056f59/couple/:coupleId/coupons', async (c) => {
  const coupleId = c.req.param('coupleId');
  
  try {
    const coupons = await kv.getByPrefix<Coupon>(`coupon_${coupleId}_`);
    return c.json({ success: true, coupons: coupons.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) });
  } catch (error) {
    console.error('Error getting coupons:', error);
    return c.json({ error: 'Failed to get coupons', details: String(error) }, 500);
  }
});

// Create coupon
app.post('/make-server-b0056f59/couple/:coupleId/coupons', async (c) => {
  const coupleId = c.req.param('coupleId');
  const body = await c.req.json();
  
  try {
    const coupon: Coupon = {
      id: `coupon_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      fromUserId: body.fromUserId,
      fromUserName: body.fromUserName,
      toUserId: body.toUserId,
      toUserName: body.toUserName,
      title: body.title,
      description: body.description,
      loveLanguage: body.loveLanguage,
      validUntil: body.validUntil,
      redeemed: false,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`coupon_${coupleId}_${coupon.id}`, coupon);
    return c.json({ success: true, coupon });
  } catch (error) {
    console.error('Error creating coupon:', error);
    return c.json({ error: 'Failed to create coupon', details: String(error) }, 500);
  }
});

// Redeem coupon
app.post('/make-server-b0056f59/couple/:coupleId/coupons/:couponId/redeem', async (c) => {
  const coupleId = c.req.param('coupleId');
  const couponId = c.req.param('couponId');
  
  try {
    const key = `coupon_${coupleId}_${couponId}`;
    const coupon = await kv.get<Coupon>(key);
    
    if (!coupon) {
      return c.json({ error: 'Coupon not found' }, 404);
    }
    
    if (coupon.redeemed) {
      return c.json({ error: 'Coupon already redeemed' }, 400);
    }
    
    const updatedCoupon: Coupon = {
      ...coupon,
      redeemed: true,
      redeemedAt: new Date().toISOString(),
    };
    
    await kv.set(key, updatedCoupon);
    return c.json({ success: true, coupon: updatedCoupon });
  } catch (error) {
    console.error('Error redeeming coupon:', error);
    return c.json({ error: 'Failed to redeem coupon', details: String(error) }, 500);
  }
});

// Delete coupon
app.delete('/make-server-b0056f59/couple/:coupleId/coupons/:couponId', async (c) => {
  const coupleId = c.req.param('coupleId');
  const couponId = c.req.param('couponId');
  
  try {
    await kv.del(`coupon_${coupleId}_${couponId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    return c.json({ error: 'Failed to delete coupon', details: String(error) }, 500);
  }
});

// ========== GRATITUDE WALL SYSTEM ==========

interface GratitudePost {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

// Get gratitude posts for couple
app.get('/make-server-b0056f59/couple/:coupleId/gratitude', async (c) => {
  const coupleId = c.req.param('coupleId');
  
  try {
    const posts = await kv.getByPrefix<GratitudePost>(`gratitude_${coupleId}_`);
    return c.json({ success: true, posts: posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) });
  } catch (error) {
    console.error('Error getting gratitude posts:', error);
    return c.json({ error: 'Failed to get posts', details: String(error) }, 500);
  }
});

// Add gratitude post
app.post('/make-server-b0056f59/couple/:coupleId/gratitude', async (c) => {
  const coupleId = c.req.param('coupleId');
  const body = await c.req.json();
  
  try {
    const post: GratitudePost = {
      id: `gratitude_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      userId: body.userId,
      userName: body.userName,
      content: body.content,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(`gratitude_${coupleId}_${post.id}`, post);
    return c.json({ success: true, post });
  } catch (error) {
    console.error('Error adding gratitude post:', error);
    return c.json({ error: 'Failed to add post', details: String(error) }, 500);
  }
});

// Delete gratitude post
app.delete('/make-server-b0056f59/couple/:coupleId/gratitude/:postId', async (c) => {
  const coupleId = c.req.param('coupleId');
  const postId = c.req.param('postId');
  
  try {
    await kv.del(`gratitude_${coupleId}_${postId}`);
    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting gratitude post:', error);
    return c.json({ error: 'Failed to delete post', details: String(error) }, 500);
  }
});

// Health check
app.get('/make-server-b0056f59/health', (c) => {
  return c.json({ status: 'ok', timestamp: Date.now() });
});

// ========== PROGRESSION SYSTEM ROUTES ==========

interface UserProgressData {
  userId: string;
  level: number;
  totalXP: number;
  currentLevelXP: number;
  nextLevelXP: number;
  loveLanguageXP: {
    PV: number;
    MQ: number;
    C: number;
    SR: number;
    TP: number;
  };
  loveLanguageLevels: {
    PV: number;
    MQ: number;
    C: number;
    SR: number;
    TP: number;
  };
  badges: string[];
  titles: string[];
  currentTitle?: string;
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
    theme: string;
  };
  unlockedContent: string[];
}

// Get user progress
app.get('/make-server-b0056f59/progress/:userId', async (c) => {
  try {
    const userId = c.req.param('userId');
    const progress = await kv.get(`user_progress_${userId}`) as UserProgressData;

    if (!progress) {
      // Return default progress if not found
      const defaultProgress: UserProgressData = {
        userId,
        level: 1,
        totalXP: 0,
        currentLevelXP: 0,
        nextLevelXP: 100,
        loveLanguageXP: { PV: 0, MQ: 0, C: 0, SR: 0, TP: 0 },
        loveLanguageLevels: { PV: 1, MQ: 1, C: 1, SR: 1, TP: 1 },
        badges: [],
        titles: ['novice'],
        currentTitle: 'novice',
        stats: {
          quizzesCompleted: 0,
          partnerQuizzesPlayed: 0,
          conversationsHad: 0,
          questsCompleted: 0,
          perfectScores: 0,
          daysStreak: 0,
          lastActivityDate: new Date().toISOString(),
        },
        customization: {
          avatarColor: '#E91E63',
          avatarEmoji: '❤️',
          theme: 'default',
        },
        unlockedContent: [],
      };

      await kv.set(`user_progress_${userId}`, defaultProgress);
      return c.json({ success: true, progress: defaultProgress });
    }

    return c.json({ success: true, progress });
  } catch (error) {
    console.error('Error getting progress:', error);
    return c.json({ error: 'Failed to get progress', details: String(error) }, 500);
  }
});

// Add XP to user
app.post('/make-server-b0056f59/progress/:userId/add-xp', async (c) => {
  try {
    const userId = c.req.param('userId');
    const body = await c.req.json();
    const { xp, loveLanguage, activity } = body;

    if (!xp || xp <= 0) {
      return c.json({ error: 'Invalid XP amount' }, 400);
    }

    let progress = await kv.get(`user_progress_${userId}`) as UserProgressData;

    if (!progress) {
      return c.json({ error: 'User progress not found' }, 404);
    }

    // Add XP
    progress.totalXP += xp;
    progress.currentLevelXP += xp;

    // Add to love language XP if specified
    if (loveLanguage && progress.loveLanguageXP[loveLanguage as keyof typeof progress.loveLanguageXP] !== undefined) {
      progress.loveLanguageXP[loveLanguage as keyof typeof progress.loveLanguageXP] += xp;
    }

    // Check for level up
    while (progress.currentLevelXP >= progress.nextLevelXP) {
      progress.currentLevelXP -= progress.nextLevelXP;
      progress.level++;
      progress.nextLevelXP = Math.floor(100 * Math.pow(1.5, progress.level - 1));
    }

    // Check for love language level up
    if (loveLanguage) {
      const langXP = progress.loveLanguageXP[loveLanguage as keyof typeof progress.loveLanguageXP];
      const currentLevel = progress.loveLanguageLevels[loveLanguage as keyof typeof progress.loveLanguageLevels];
      const xpForNextLevel = Math.floor(50 * Math.pow(1.4, currentLevel - 1));

      if (langXP >= xpForNextLevel) {
        progress.loveLanguageLevels[loveLanguage as keyof typeof progress.loveLanguageLevels]++;
      }
    }

    // Update activity stats
    if (activity) {
      switch (activity) {
        case 'quiz_complete':
          progress.stats.quizzesCompleted++;
          break;
        case 'partner_quiz_complete':
          progress.stats.partnerQuizzesPlayed++;
          break;
        case 'quest_complete':
          progress.stats.questsCompleted++;
          break;
        case 'perfect_score':
          progress.stats.perfectScores++;
          break;
        case 'conversation':
          progress.stats.conversationsHad++;
          break;
      }
    }

    // Update streak
    const today = new Date().toISOString().split('T')[0];
    const lastDate = progress.stats.lastActivityDate.split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (lastDate === yesterday) {
      progress.stats.daysStreak++;
    } else if (lastDate !== today) {
      progress.stats.daysStreak = 1;
    }

    progress.stats.lastActivityDate = new Date().toISOString();

    await kv.set(`user_progress_${userId}`, progress);

    return c.json({
      success: true,
      progress,
      leveledUp: progress.currentLevelXP === 0,
    });
  } catch (error) {
    console.error('Error adding XP:', error);
    return c.json({ error: 'Failed to add XP', details: String(error) }, 500);
  }
});

// Unlock badge
app.post('/make-server-b0056f59/progress/:userId/unlock-badge', async (c) => {
  try {
    const userId = c.req.param('userId');
    const body = await c.req.json();
    const { badgeId } = body;

    if (!badgeId) {
      return c.json({ error: 'Badge ID is required' }, 400);
    }

    let progress = await kv.get(`user_progress_${userId}`) as UserProgressData;

    if (!progress) {
      return c.json({ error: 'User progress not found' }, 404);
    }

    if (!progress.badges.includes(badgeId)) {
      progress.badges.push(badgeId);
      await kv.set(`user_progress_${userId}`, progress);
    }

    return c.json({ success: true, progress });
  } catch (error) {
    console.error('Error unlocking badge:', error);
    return c.json({ error: 'Failed to unlock badge', details: String(error) }, 500);
  }
});

// Unlock title
app.post('/make-server-b0056f59/progress/:userId/unlock-title', async (c) => {
  try {
    const userId = c.req.param('userId');
    const body = await c.req.json();
    const { titleId } = body;

    if (!titleId) {
      return c.json({ error: 'Title ID is required' }, 400);
    }

    let progress = await kv.get(`user_progress_${userId}`) as UserProgressData;

    if (!progress) {
      return c.json({ error: 'User progress not found' }, 404);
    }

    if (!progress.titles.includes(titleId)) {
      progress.titles.push(titleId);
      await kv.set(`user_progress_${userId}`, progress);
    }

    return c.json({ success: true, progress });
  } catch (error) {
    console.error('Error unlocking title:', error);
    return c.json({ error: 'Failed to unlock title', details: String(error) }, 500);
  }
});

// Set active title
app.post('/make-server-b0056f59/progress/:userId/set-title', async (c) => {
  try {
    const userId = c.req.param('userId');
    const body = await c.req.json();
    const { titleId } = body;

    let progress = await kv.get(`user_progress_${userId}`) as UserProgressData;

    if (!progress) {
      return c.json({ error: 'User progress not found' }, 404);
    }

    if (!progress.titles.includes(titleId)) {
      return c.json({ error: 'Title not unlocked' }, 400);
    }

    progress.currentTitle = titleId;
    await kv.set(`user_progress_${userId}`, progress);

    return c.json({ success: true, progress });
  } catch (error) {
    console.error('Error setting title:', error);
    return c.json({ error: 'Failed to set title', details: String(error) }, 500);
  }
});

// Update customization
app.post('/make-server-b0056f59/progress/:userId/customize', async (c) => {
  try {
    const userId = c.req.param('userId');
    const body = await c.req.json();
    const { avatarColor, avatarEmoji, theme } = body;

    let progress = await kv.get(`user_progress_${userId}`) as UserProgressData;

    if (!progress) {
      return c.json({ error: 'User progress not found' }, 404);
    }

    if (avatarColor) progress.customization.avatarColor = avatarColor;
    if (avatarEmoji) progress.customization.avatarEmoji = avatarEmoji;
    if (theme) progress.customization.theme = theme;

    await kv.set(`user_progress_${userId}`, progress);

    return c.json({ success: true, progress });
  } catch (error) {
    console.error('Error updating customization:', error);
    return c.json({ error: 'Failed to update customization', details: String(error) }, 500);
  }
});

// ========== PARTNER QUIZ ROUTES ==========

interface PartnerQuizSession {
  id: string;
  code: string;
  partnerAId: string;
  partnerAName: string;
  partnerBId?: string;
  partnerBName?: string;
  questions: any[];
  currentQuestionIndex: number;
  answers: {
    [questionId: string]: {
      partnerA?: string;
      partnerB?: string;
      partnerATime?: number;
      partnerBTime?: number;
    };
  };
  score: number;
  status: 'waiting' | 'playing' | 'finished';
  createdAt: number;
  startedAt?: number;
  finishedAt?: number;
}

// Create a new partner quiz session
app.post('/make-server-b0056f59/partner-quiz/create', async (c) => {
  try {
    const body = await c.req.json();
    const { partnerId, partnerName, questions } = body;

    if (!partnerId || !partnerName || !questions) {
      return c.json({ error: 'Partner ID, name, and questions are required' }, 400);
    }

    const code = generateGameCode();
    const sessionId = `partner_quiz_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const session: PartnerQuizSession = {
      id: sessionId,
      code,
      partnerAId: partnerId,
      partnerAName: partnerName,
      questions,
      currentQuestionIndex: 0,
      answers: {},
      score: 0,
      status: 'waiting',
      createdAt: Date.now(),
    };

    await kv.set(sessionId, session);
    await kv.set(`partner_quiz_code_${code}`, sessionId);

    return c.json({
      success: true,
      sessionId,
      code,
      session,
    });
  } catch (error) {
    console.error('Error creating partner quiz:', error);
    return c.json({ error: 'Failed to create partner quiz', details: String(error) }, 500);
  }
});

// Join a partner quiz session
app.post('/make-server-b0056f59/partner-quiz/join', async (c) => {
  try {
    const body = await c.req.json();
    const { code, partnerId, partnerName } = body;

    if (!code || !partnerId || !partnerName) {
      return c.json({ error: 'Code, partner ID, and name are required' }, 400);
    }

    const sessionId = await kv.get(`partner_quiz_code_${code}`) as string;

    if (!sessionId) {
      return c.json({ error: 'Quiz session not found' }, 404);
    }

    const session = await kv.get(sessionId) as PartnerQuizSession;

    if (!session) {
      return c.json({ error: 'Quiz session not found' }, 404);
    }

    if (session.partnerBId) {
      return c.json({ error: 'Quiz session is already full' }, 400);
    }

    session.partnerBId = partnerId;
    session.partnerBName = partnerName;
    session.status = 'playing';
    session.startedAt = Date.now();

    await kv.set(sessionId, session);

    return c.json({
      success: true,
      sessionId,
      session,
    });
  } catch (error) {
    console.error('Error joining partner quiz:', error);
    return c.json({ error: 'Failed to join partner quiz', details: String(error) }, 500);
  }
});

// Get partner quiz session
app.get('/make-server-b0056f59/partner-quiz/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');

    const session = await kv.get(sessionId) as PartnerQuizSession;

    if (!session) {
      return c.json({ error: 'Quiz session not found' }, 404);
    }

    return c.json({
      success: true,
      session,
    });
  } catch (error) {
    console.error('Error getting partner quiz:', error);
    return c.json({ error: 'Failed to get partner quiz', details: String(error) }, 500);
  }
});

// Submit an answer
app.post('/make-server-b0056f59/partner-quiz/:sessionId/answer', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');
    const body = await c.req.json();
    const { partnerId, questionId, answer, timeSpent } = body;

    if (!partnerId || !questionId || !answer) {
      return c.json({ error: 'Partner ID, question ID, and answer are required' }, 400);
    }

    const session = await kv.get(sessionId) as PartnerQuizSession;

    if (!session) {
      return c.json({ error: 'Quiz session not found' }, 404);
    }

    // Initialize answers for this question if not exists
    if (!session.answers[questionId]) {
      session.answers[questionId] = {};
    }

    // Determine which partner is answering
    const isPartnerA = partnerId === session.partnerAId;
    
    if (isPartnerA) {
      session.answers[questionId].partnerA = answer;
      session.answers[questionId].partnerATime = timeSpent || 0;
    } else {
      session.answers[questionId].partnerB = answer;
      session.answers[questionId].partnerBTime = timeSpent || 0;
    }

    // Check if both partners have answered
    const bothAnswered = session.answers[questionId].partnerA && session.answers[questionId].partnerB;

    if (bothAnswered) {
      // Calculate score for this question
      if (session.answers[questionId].partnerA === session.answers[questionId].partnerB) {
        session.score += 1;
      }
    }

    await kv.set(sessionId, session);

    return c.json({
      success: true,
      session,
      bothAnswered,
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    return c.json({ error: 'Failed to submit answer', details: String(error) }, 500);
  }
});

// Move to next question
app.post('/make-server-b0056f59/partner-quiz/:sessionId/next', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');

    const session = await kv.get(sessionId) as PartnerQuizSession;

    if (!session) {
      return c.json({ error: 'Quiz session not found' }, 404);
    }

    session.currentQuestionIndex++;

    // Check if quiz is finished
    if (session.currentQuestionIndex >= session.questions.length) {
      session.status = 'finished';
      session.finishedAt = Date.now();
    }

    await kv.set(sessionId, session);

    return c.json({
      success: true,
      session,
    });
  } catch (error) {
    console.error('Error moving to next question:', error);
    return c.json({ error: 'Failed to move to next question', details: String(error) }, 500);
  }
});

// Delete partner quiz session (cleanup)
app.delete('/make-server-b0056f59/partner-quiz/:sessionId', async (c) => {
  try {
    const sessionId = c.req.param('sessionId');

    const session = await kv.get(sessionId) as PartnerQuizSession;

    if (session) {
      await kv.del(sessionId);
      await kv.del(`partner_quiz_code_${session.code}`);
    }

    return c.json({
      success: true,
    });
  } catch (error) {
    console.error('Error deleting partner quiz:', error);
    return c.json({ error: 'Failed to delete partner quiz', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);