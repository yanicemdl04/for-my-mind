import { MoodType, ExerciseType, MediaType } from '@prisma/client';
import { BadRequestError } from './errorHandler';

/**
 * Valide une entrée de journal
 * @param content - Contenu du journal
 * @param type - Type de média
 * @returns true si valide
 * @throws BadRequestError si invalide
 */
export const validateJournalEntry = (content: string, type: MediaType): boolean => {
  if (!content || content.trim() === '') {
    throw new BadRequestError('Le contenu du journal ne peut pas être vide');
  }
  
  // Vérifier que le type est valide
  const validTypes: MediaType[] = ['TEXT', 'IMAGE', 'VIDEO', 'AUDIO'];
  if (!validTypes.includes(type)) {
    throw new BadRequestError('Type de média invalide');
  }
  
  return true;
};

/**
 * Valide une entrée d'humeur
 * @param moodType - Type d'humeur
 * @param note - Note (optionnelle)
 * @returns true si valide
 * @throws BadRequestError si invalide
 */
export const validateMoodEntry = (moodType: MoodType, note?: number): boolean => {
  // Vérifier que le type est valide
  const validTypes: MoodType[] = ['TRES_HEUREUX', 'CONTENT', 'NEUTRE', 'TRISTE', 'DEPRIME'];
  if (!validTypes.includes(moodType)) {
    throw new BadRequestError('Type d\'humeur invalide');
  }
  
  // Vérifier que la note est entre 1 et 5 si elle est fournie
  if (note !== undefined && (note < 1 || note > 5)) {
    throw new BadRequestError('La note doit être entre 1 et 5');
  }
  
  return true;
};

/**
 * Valide une entrée d'exercice
 * @param type - Type d'exercice
 * @param duration - Durée en minutes
 * @returns true si valide
 * @throws BadRequestError si invalide
 */
export const validateExerciseEntry = (type: ExerciseType, duration: number): boolean => {
  // Vérifier que le type est valide
  const validTypes: ExerciseType[] = ['MEDITATION', 'BREATHING', 'RELAXATION', 'VISUALIZATION', 'AUTRE'];
  if (!validTypes.includes(type)) {
    throw new BadRequestError('Type d\'exercice invalide');
  }
  
  // Vérifier que la durée est positive
  if (duration <= 0) {
    throw new BadRequestError('La durée doit être positive');
  }
  
  return true;
};