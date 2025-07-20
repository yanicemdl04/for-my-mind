import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

export const config = {
  // Serveur
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Base de données
  databaseUrl: process.env.DATABASE_URL,
  
  // JWT
  jwtSecret: process.env.JWT_SECRET || 'secret_dev_key',
  jwtExpiresIn: '30d',
  
  // Cors
  corsOrigin: process.env.CORS_ORIGIN || '*',
  
  // Limites
  maxJournalLength: 8000, // Nombre maximum de caractères pour un journal
  maxMoodCommentLength: 800, // Nombre maximum de caractères pour un commentaire d'humeur
};