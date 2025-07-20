import { prisma } from '../config/database';
import type { MoodType } from '@prisma/client';
import { validateMoodEntry } from '../utils/validators';
import { NotFoundError } from '../utils/errorHandler';
import { getDateDaysAgo } from '../utils/dateUtils';
import { MOOD_TYPES } from '../utils/constants';

export interface MoodInput {
  moodType: MoodType;
  note?: number;
  comment?: string;
}

export const moodService = {
  createMood: async (userId: string, moodData: MoodInput) => {
    // Valider l'entrée d'humeur
    validateMoodEntry(moodData.moodType, moodData.note);
    
    const mood = await prisma.mood.create({
      data: {
        ...moodData,
        userId
      }
    });

    return mood;
  },

  getMoods: async (userId: string) => {
    const moods = await prisma.mood.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return moods;
  },

  getMoodStats: async (userId: string) => {
    // Get moods from the last 30 days
    const thirtyDaysAgo = getDateDaysAgo(30);
    
    const moods = await prisma.mood.findMany({
      where: { 
        userId,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    
    // Group by mood type
    const moodCounts = {
      [MOOD_TYPES.TRES_HEUREUX]: 0,
      [MOOD_TYPES.CONTENT]: 0,
      [MOOD_TYPES.NEUTRE]: 0,
      [MOOD_TYPES.TRISTE]: 0,
      [MOOD_TYPES.DEPRIME]: 0
    };
    
    moods.forEach(mood => {
      moodCounts[mood.moodType]++;
    });
    
    // Calculate average mood if note is provided
    let averageNote = 0;
    let notesCount = 0;
    
    moods.forEach(mood => {
      if (mood.note) {
        averageNote += mood.note;
        notesCount++;
      }
    });
    
    return {
      moodCounts,
      averageNote: notesCount > 0 ? averageNote / notesCount : 0,
      totalEntries: moods.length,
      dailyData: moods.map(mood => ({
        date: mood.createdAt,
        moodType: mood.moodType,
        note: mood.note
      }))
    };
  },

  getMood: async (id: string, userId: string) => {
    const mood = await prisma.mood.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!mood) {
      throw new NotFoundError('Humeur non trouvée');
    }

    return mood;
  },

  updateMood: async (id: string, userId: string, moodData: MoodInput) => {
    // Valider l'entrée d'humeur
    validateMoodEntry(moodData.moodType, moodData.note);
    
    // Check if mood entry exists and belongs to user
    const moodExists = await prisma.mood.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!moodExists) {
      throw new NotFoundError('Humeur non trouvée');
    }

    const updatedMood = await prisma.mood.update({
      where: { id },
      data: moodData
    });

    return updatedMood;
  },

  deleteMood: async (id: string, userId: string) => {
    // Check if mood entry exists and belongs to user
    const moodExists = await prisma.mood.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!moodExists) {
      throw new NotFoundError('Humeur non trouvée');
    }

    await prisma.mood.delete({
      where: { id }
    });

    return { message: 'Humeur supprimée' };
  }
};