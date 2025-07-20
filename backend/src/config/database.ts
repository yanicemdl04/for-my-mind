import { PrismaClient } from '@prisma/client';

// Singleton pattern pour la connexion à la base de données
class Database {
  private static instance: Database;
  private _prisma: PrismaClient;

  private constructor() {
    this._prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  get prisma(): PrismaClient {
    return this._prisma;
  }

  async connect(): Promise<void> {
    try {
      await this._prisma.$connect();
      console.log('Connexion à la base de données établie');
    } catch (error) {
      console.error('Erreur de connexion à la base de données:', error);
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    await this._prisma.$disconnect();
    console.log('Connexion à la base de données fermée');
  }
}

// Exporter l'instance de la base de données
export const db = Database.getInstance();
export const prisma = db.prisma;