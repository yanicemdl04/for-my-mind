import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma';
import { errorHandler, notFound } from './middlewares/errorHandler';
import { config } from './config/config';

// Import routes
import authRoutes from './routes/auth.routes';
import journalRoutes from './routes/journal.routes';
import moodRoutes from './routes/mood.routes';
import exerciseRoutes from './routes/exercise.routes';
import chatbotRoutes from './routes/chatbot.routes';
import resourceRoutes from './routes/resource.routes';

// Initialize Prisma
const prisma = new PrismaClient();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/resources', resourceRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur l\'API MyMind' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Serveur démarré en mode ${config.nodeEnv} sur le port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`Erreur: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});