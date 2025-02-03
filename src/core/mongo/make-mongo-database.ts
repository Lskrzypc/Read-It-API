import type { Connection, ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';
import type { DatabaseConfigInterface, DatabaseInterface } from '../database';
import { DatabaseConnectionStatus } from '../database';

const mongooseOptions: ConnectOptions = {
  minPoolSize: 10,
  maxPoolSize: 100,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

export function makeMongoDatabase(config: DatabaseConfigInterface): DatabaseInterface<Connection> {
  let connection: Connection;

  async function connect(): Promise<Connection> {
    try {
      mongoose.set('strictQuery', true);
      if (!config.dsn) {
        throw new Error('Database DSN is not defined');
      }
      await mongoose.connect(config.dsn, {
        ...mongooseOptions,
        dbName: config.databaseName,
      });

      connection = mongoose.connection;

      connection.on('error', (error) => {
        console.error('Unable to connect to mongoDb', {
          databaseName: config.databaseName,
          error,
        });
        process.exit(1);
      });
      connection.on('disconnected', () => {
        console.warn('MongoDb disconnected...', {
          databaseName: config.databaseName,
        });
      });
      connection.on('reconnected', () => {
        console.warn('MongoDb reconnected...', {
          databaseName: config.databaseName,
        });
      });
      connection.on('connected', () => {
        console.info('MongoDb connected...', {
          databaseName: config.databaseName,
        });
      });

      if (connection.readyState === 1) {
        console.info(`Connected to ${config.databaseName} database successfully`);
      }

      return connection;
    } catch (error) {
      console.error('Unable to connect to mongoDb', {
        databaseName: config.databaseName,
        error,
      });
      process.exit(1);
    }
  }

  async function getStatus(): Promise<DatabaseConnectionStatus> {
    const status = connection.readyState;
    switch (status) {
      case 0:
        return DatabaseConnectionStatus.DISCONNECTED;
      case 1:
        return DatabaseConnectionStatus.CONNECTED;
      case 2:
        return DatabaseConnectionStatus.CONNECTING;
      case 3:
        return DatabaseConnectionStatus.DISCONNECTING;
      default:
        return DatabaseConnectionStatus.UNDEFINED;
    }
  }

  return {
    connect,
    getStatus,
  };
}
