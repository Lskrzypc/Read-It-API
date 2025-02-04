import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { config } from 'dotenv';
import router from './router';
import { makeMongoDatabase } from './core/database/mongo/make-mongo-database';

// Load environment variables
config();

const app = express();
const port = process.env.PORT;

// Initialize the database
const database = makeMongoDatabase({
  dsn: process.env.MONGO_DSN,
  databaseName: process.env.MONGO_DATABASE_NAME ?? '',
});
database.connect();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on ${port} port`);
});
