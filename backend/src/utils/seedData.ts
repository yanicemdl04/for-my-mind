import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Fonction pour initialiser la base de données avec des données de test
 */
export async function seedDatabase() {
  try {
    console.log('Initialisation de la base de données...');

    // Créer un utilisateur de test
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const user = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        password: hashedPassword,
        nom: 'Utilisateur',
        prenom: 'Test',
        happy: 'Passer du temps en nature',
        stress: 'Trop de travail',
        goal: 'Améliorer mon bien-être mental',
        emotion: 'Apprendre à gérer mon stress'
      }
    });

    console.log(`Utilisateur créé: ${user.email}`);

    // Créer quelques entrées de journal
    await prisma.journalEntry.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: user.id,
          content: 'Aujourd\'hui était une bonne journée. J\'ai fait une longue promenade dans le parc.',
          type: 'TEXT'
        },
        {
          userId: user.id,
          content: 'Je me sens un peu stressé par mon travail aujourd\'hui.',
          type: 'TEXT'
        }
      ]
    });

    // Créer quelques humeurs
    await prisma.mood.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: user.id,
          moodType: 'CONTENT',
          note: 4,
          comment: 'Belle journée ensoleillée'
        },
        {
          userId: user.id,
          moodType: 'NEUTRE',
          note: 3,
          comment: 'Journée ordinaire'
        }
      ]
    });

    // Créer quelques exercices
    await prisma.exerciseEntry.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: user.id,
          type: 'MEDITATION',
          duration: 15
        },
        {
          userId: user.id,
          type: 'BREATHING',
          duration: 10
        }
      ]
    });

    // Créer quelques messages de chat
    await prisma.chatMessage.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: user.id,
          role: 'USER',
          content: 'Bonjour, comment puis-je améliorer mon humeur aujourd\'hui ?'
        },
        {
          userId: user.id,
          role: 'ASSISTANT',
          content: 'Bonjour ! Essayez une courte séance de méditation ou une promenade en plein air.'
        }
      ]
    });

    // Créer quelques recommandations
    await prisma.recommendation.createMany({
      skipDuplicates: true,
      data: [
        {
          userId: user.id,
          type: 'ARTICLE',
          content: 'Comment la méditation peut améliorer votre bien-être mental',
          sourceUrl: 'https://example.com/meditation'
        },
        {
          userId: user.id,
          type: 'VIDEO',
          content: 'Exercices de respiration pour réduire le stress',
          sourceUrl: 'https://example.com/breathing'
        }
      ]
    });

    // Créer quelques ressources
    await prisma.resource.createMany({
      skipDuplicates: true,
      data: [
        {
          title: 'Guide de méditation pour débutants',
          url: 'https://example.com/meditation-guide',
          type: 'ARTICLE'
        },
        {
          title: 'Playlist de musique relaxante',
          url: 'https://example.com/relaxing-music',
          type: 'MUSIC'
        }
      ]
    });

    console.log('Base de données initialisée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la fonction si ce fichier est appelé directement
if (require.main === module) {
  seedDatabase()
    .then(() => console.log('Terminé'))
    .catch((e) => console.error(e));
}