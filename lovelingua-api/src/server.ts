import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import couplesRouter from './routes/couples.routes.js';
import progressRouter from './routes/progress.routes.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/couples', couplesRouter);
app.use('/api/progress', progressRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`LoveLingua API running on port ${port}`);
});
