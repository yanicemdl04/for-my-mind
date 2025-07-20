import { Request } from 'express';
import { MoodType, ExerciseType, MediaType, ChatRole, RecommendationType } from '../generated/prisma';

// Extension de Request pour inclure l'utilisateur
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

// Types pour les entrées utilisateur
export interface RegisterUserInput {
  email: string;
  password: string;
  nom: string;
  prenom: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  nom?: string;
  prenom?: string;
  happy?: string;
  stress?: string;
  goal?: string;
  emotion?: string;
}

export interface JournalEntryInput {
  content: string;
  mediaUrl?: string;
  type: MediaType;
}

export interface MoodInput {
  moodType: MoodType;
  note?: number;
  comment?: string;
}

export interface ExerciseInput {
  type: ExerciseType;
  duration: number;
}

export interface MessageInput {
  content: string;
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: any;
}