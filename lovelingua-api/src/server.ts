import 'dotenv/config';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import couplesRouter from './routes/couples.routes.js';
import progressRouter from './routes/progress.routes.js';
import { initDb, closeDb } from './db.js';

const app = express();
const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim())
  : '*';
const corsOptions: CorsOptions = { origin: corsOrigins };

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/couples', couplesRouter);
app.use('/api/progress', progressRouter);

const port = process.env.PORT || 3000;

initDb()
  .then(() => {
    const server = app.listen(port, () => {
      console.log(`LoveLingua API running on port ${port}`);
    });

    const gracefulShutdown = async () => {
      await closeDb();
      server.close(() => process.exit(0));
    };

    process.on('SIGINT', gracefulShutdown);
    process.on('SIGTERM', gracefulShutdown);
  })
  .catch((err) => {
    console.error('Failed to initialize database', err);
    process.exit(1);
  });
