import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './router';
import { makeMongoDatabase } from './core/mongo/make-mongo-database';

const app = express();
const port = 3000;

dotenv.config();

const database = makeMongoDatabase({
  dsn: process.env.MONGO_DSN,
  databaseName: 'mabibli',
});

database.connect();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(json());

app.use('/api', router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
