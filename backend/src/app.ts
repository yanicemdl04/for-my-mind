import { protect } from './middlewares/authMiddleware';
import { errorHandler, notFound } from './middlewares/errorHandler';
import express from 'express';


const app = express();


// Appliquer le middleware d'authentification sur les routes protégées
app.use('/api/journal', protect, journalRoutes);
app.use('/api/mood', protect, moodRoutes);
// etc.

// Appliquer les middlewares de gestion d'erreurs en dernier
app.use(notFound);
app.use(errorHandler);
