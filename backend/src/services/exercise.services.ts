import { PrismaClient, ExerciseType } from '../generated/prisma';
import { validateExerciseEntry } from '../utils/validators';
import { NotFoundError } from '../utils/errorHandler';
import { getDateDaysAgo } from '../utils/dateUtils';
import { EXERCISE_TYPES } from '../utils/constants';

const prisma = new PrismaClient();

export interface ExerciseInput {
  type: ExerciseType;
  duration: number;
}

export const exerciseService = {
  createExercise: async (userId: string, exerciseData: ExerciseInput) => {
    // Valider l'entrée d'exercice
    validateExerciseEntry(exerciseData.type, exerciseData.duration);
    
    const exercise = await prisma.exerciseEntry.create({
      data: {
        ...exerciseData,
        userId
      }
    });

    return exercise;
  },

  getExercises: async (userId: string) => {
    const exercises = await prisma.exerciseEntry.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' }
    });

    return exercises;
  },

  getExerciseStats: async (userId: string) => {
    // Get exercises from the last 30 days
    const thirtyDaysAgo = getDateDaysAgo(30);
    
    const exercises = await prisma.exerciseEntry.findMany({
      where: { 
        userId,
        completedAt: {
          gte: thirtyDaysAgo
        }
      }
    });
    
    // Group by exercise type
    const exerciseCounts = {
      [EXERCISE_TYPES.MEDITATION]: 0,
      [EXERCISE_TYPES.BREATHING]: 0,
      [EXERCISE_TYPES.RELAXATION]: 0,
      [EXERCISE_TYPES.VISUALIZATION]: 0,
      [EXERCISE_TYPES.AUTRE]: 0
    };
    
    let totalDuration = 0;
    
    exercises.forEach(exercise => {
      exerciseCounts[exercise.type]++;
      totalDuration += exercise.duration;
    });
    
    return {
      exerciseCounts,
      totalDuration,
      totalSessions: exercises.length,
      averageDuration: exercises.length > 0 ? totalDuration / exercises.length : 0
    };
  },

  getExercise: async (id: string, userId: string) => {
    const exercise = await prisma.exerciseEntry.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!exercise) {
      throw new NotFoundError('Exercice non trouvé');
    }

    return exercise;
  },

  updateExercise: async (id: string, userId: string, exerciseData: ExerciseInput) => {
    // Valider l'entrée d'exercice
    validateExerciseEntry(exerciseData.type, exerciseData.duration);
    
    // Check if exercise entry exists and belongs to user
    const exerciseExists = await prisma.exerciseEntry.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!exerciseExists) {
      throw new NotFoundError('Exercice non trouvé');
    }

    const updatedExercise = await prisma.exerciseEntry.update({
      where: { id },
      data: exerciseData
    });

    return updatedExercise;
  },

  deleteExercise: async (id: string, userId: string) => {
    // Check if exercise entry exists and belongs to user
    const exerciseExists = await prisma.exerciseEntry.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!exerciseExists) {
      throw new NotFoundError('Exercice non trouvé');
    }

    await prisma.exerciseEntry.delete({
      where: { id }
    });

    return { message: 'Exercice supprimé' };
  }
};