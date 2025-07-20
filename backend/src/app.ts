import express from 'express';
import cors from 'cors';
import { errorHandler, notFound } from './middlewares/errorHandler';
import { config } from './config/config';
import { db } from './config/database';

// Import routes
import authRoutes from './routes/auth.routes';
import journalRoutes from './routes/journal.routes';
import moodRoutes from './routes/mood.routes';
import exerciseRoutes from './routes/exercise.routes';
import chatbotRoutes from './routes/chatbot.routes';
import resourceRoutes from './routes/resource.routes';

// Initialize Express
const app = express();

// Connect to database
db.connect().catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});

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

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;