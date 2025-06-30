import { PrismaClient } from '../generated/prisma';

class DatabaseClient {
  private static instance: PrismaClient;

  static getInstance(): PrismaClient {
    if (!DatabaseClient.instance) {
      DatabaseClient.instance = new PrismaClient();
    }
    return DatabaseClient.instance;
  }

  static async disconnect(): Promise<void> {
    if (DatabaseClient.instance) {
      await DatabaseClient.instance.$disconnect();
    }
  }
}

export const db = DatabaseClient.getInstance();
export { DatabaseClient };
