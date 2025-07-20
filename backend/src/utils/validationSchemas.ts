import Joi from 'joi';
import { MOOD_TYPES, EXERCISE_TYPES, MEDIA_TYPES } from './constants';

// Schéma de validation pour l'inscription
export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'any.required': 'Email requis'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Le mot de passe doit contenir au moins 6 caractères',
    'any.required': 'Mot de passe requis'
  }),
  nom: Joi.string().required().messages({
    'any.required': 'Nom requis'
  }),
  prenom: Joi.string().required().messages({
    'any.required': 'Prénom requis'
  })
});

// Schéma de validation pour la connexion
export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email invalide',
    'any.required': 'Email requis'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Mot de passe requis'
  })
});

// Schéma de validation pour la mise à jour du profil
export const updateProfileSchema = Joi.object({
  nom: Joi.string().optional(),
  prenom: Joi.string().optional(),
  happy: Joi.string().allow('').optional(),
  stress: Joi.string().allow('').optional(),
  goal: Joi.string().allow('').optional(),
  emotion: Joi.string().allow('').optional()
});

// Schéma de validation pour les entrées de journal
export const journalEntrySchema = Joi.object({
  content: Joi.string().required().messages({
    'any.required': 'Contenu requis'
  }),
  mediaUrl: Joi.string().uri().allow('').optional(),
  type: Joi.string().valid(...Object.values(MEDIA_TYPES)).required().messages({
    'any.only': 'Type de média invalide',
    'any.required': 'Type de média requis'
  })
});

// Schéma de validation pour les humeurs
export const moodSchema = Joi.object({
  moodType: Joi.string().valid(...Object.values(MOOD_TYPES)).required().messages({
    'any.only': 'Type d\'humeur invalide',
    'any.required': 'Type d\'humeur requis'
  }),
  note: Joi.number().integer().min(1).max(5).optional(),
  comment: Joi.string().allow('').optional()
});

// Schéma de validation pour les exercices
export const exerciseSchema = Joi.object({
  type: Joi.string().valid(...Object.values(EXERCISE_TYPES)).required().messages({
    'any.only': 'Type d\'exercice invalide',
    'any.required': 'Type d\'exercice requis'
  }),
  duration: Joi.number().integer().positive().required().messages({
    'number.base': 'La durée doit être un nombre',
    'number.positive': 'La durée doit être positive',
    'any.required': 'Durée requise'
  })
});

// Schéma de validation pour les messages
export const messageSchema = Joi.object({
  content: Joi.string().required().messages({
    'any.required': 'Contenu du message requis'
  })
});