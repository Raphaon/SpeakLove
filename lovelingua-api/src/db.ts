import fs from 'node:fs';
import path from 'node:path';
import sqlite3 from 'sqlite3';

const dbPath = process.env.SQLITE_PATH || path.join(process.cwd(), 'data', 'lovelingua.db');
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

sqlite3.verbose();
const connection = new sqlite3.Database(dbPath);

export const run = (sql: string, params: unknown[] = []): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.run(sql, params, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

export const get = <T>(sql: string, params: unknown[] = []): Promise<T | undefined> =>
  new Promise((resolve, reject) => {
    connection.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row as T | undefined);
    });
  });

export const all = <T>(sql: string, params: unknown[] = []): Promise<T[]> =>
  new Promise((resolve, reject) => {
    connection.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows as T[]);
    });
  });

export const initDb = async (): Promise<void> => {
  await run(
    `CREATE TABLE IF NOT EXISTS couples (
      id TEXT PRIMARY KEY,
      user1Id TEXT NOT NULL,
      user1Name TEXT NOT NULL,
      user2Id TEXT,
      user2Name TEXT,
      status TEXT NOT NULL,
      loveReservoir INTEGER NOT NULL,
      createdAt TEXT NOT NULL
    )`
  );

  await run(
    `CREATE TABLE IF NOT EXISTS user_progress (
      userId TEXT PRIMARY KEY,
      level INTEGER NOT NULL,
      currentLevelXp INTEGER NOT NULL,
      nextLevelXp INTEGER NOT NULL,
      totalXp INTEGER NOT NULL,
      stats TEXT NOT NULL
    )`
  );
};

export const closeDb = (): Promise<void> =>
  new Promise((resolve, reject) => {
    connection.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
