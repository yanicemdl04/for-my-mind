import { prisma } from './config/database';
import { config } from './config/config';
import app from './app';

// Start server
const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`Serveur démarré en mode ${config.nodeEnv} sur le port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`Erreur: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM reçu. Arrêt gracieux...');
  server.close(() => {
    console.log('Serveur arrêté');
    prisma.$disconnect().then(() => {
      console.log('Connexion à la base de données fermée');
      process.exit(0);
    });
  });
});

export default server;