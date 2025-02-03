export interface DatabaseConfigInterface {
  dsn?: string;
  databaseName: string;
  caCertificate?: string;
}

export enum DatabaseConnectionStatus {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  DISCONNECTING = 'disconnecting',
  UNDEFINED = 'undefined',
}

export interface DatabaseInterface<T> {
  connect(): Promise<T>;
  getStatus(): Promise<DatabaseConnectionStatus>;
}
