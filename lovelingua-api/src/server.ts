import 'dotenv/config';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import couplesRouter from './routes/couples.routes.js';
import progressRouter from './routes/progress.routes.js';

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
app.listen(port, () => {
  console.log(`LoveLingua API running on port ${port}`);
});
