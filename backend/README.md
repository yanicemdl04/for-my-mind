# MyMind - Backend

Backend pour l'application MyMind de bien-être mental.

## Technologies utilisées

- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT pour l'authentification

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Configurer les variables d'environnement dans un fichier `.env` :
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/mymind?schema=public"
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```
4. Générer le client Prisma :
   ```bash
   npm run prisma:generate
   ```
5. Exécuter les migrations :
   ```bash
   npm run prisma:migrate
   ```
6. (Optionnel) Initialiser la base de données avec des données de test :
   ```bash
   npm run seed
   ```

## Démarrage

### Mode développement

```bash
npm run dev
```

### Mode production

```bash
npm run build
npm start
```

## Structure du projet

- `src/` - Code source
  - `config/` - Configuration de l'application
  - `controllers/` - Contrôleurs pour gérer les requêtes HTTP
  - `middlewares/` - Middlewares Express
  - `routes/` - Routes de l'API
  - `services/` - Logique métier
  - `types/` - Types TypeScript
  - `utils/` - Utilitaires
  - `scripts/` - Scripts utilitaires
  - `server.ts` - Point d'entrée de l'application
- `prisma/` - Configuration Prisma et migrations
- `dist/` - Code compilé (généré)

## API Endpoints

### Authentification

- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `GET /api/auth/profile` - Profil utilisateur
- `PUT /api/auth/profile` - Mise à jour du profil

### Journal

- `POST /api/journal` - Créer une entrée de journal
- `GET /api/journal` - Obtenir toutes les entrées de journal
- `GET /api/journal/:id` - Obtenir une entrée de journal
- `PUT /api/journal/:id` - Mettre à jour une entrée de journal
- `DELETE /api/journal/:id` - Supprimer une entrée de journal

### Humeur

- `POST /api/mood` - Enregistrer une humeur
- `GET /api/mood` - Obtenir toutes les humeurs
- `GET /api/mood/stats` - Obtenir des statistiques sur les humeurs
- `GET /api/mood/:id` - Obtenir une humeur
- `PUT /api/mood/:id` - Mettre à jour une humeur
- `DELETE /api/mood/:id` - Supprimer une humeur

### Exercices

- `POST /api/exercise` - Enregistrer un exercice
- `GET /api/exercise` - Obtenir tous les exercices
- `GET /api/exercise/stats` - Obtenir des statistiques sur les exercices
- `GET /api/exercise/:id` - Obtenir un exercice
- `PUT /api/exercise/:id` - Mettre à jour un exercice
- `DELETE /api/exercise/:id` - Supprimer un exercice

### Chatbot

- `POST /api/chatbot/message` - Envoyer un message au chatbot
- `GET /api/chatbot/history` - Obtenir l'historique des messages
- `DELETE /api/chatbot/history` - Effacer l'historique des messages
- `GET /api/chatbot/recommendations` - Obtenir des recommandations

### Ressources

- `GET /api/resources` - Obtenir toutes les ressources
- `GET /api/resources/type/:type` - Obtenir les ressources par type
- `GET /api/resources/:id` - Obtenir une ressource