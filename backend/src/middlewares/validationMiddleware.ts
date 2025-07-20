import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { BadRequestError } from '../utils/errorHandler';

/**
 * Middleware de validation pour les requêtes
 * @param schema - Schéma Joi à utiliser pour la validation
 * @param property - Propriété de la requête à valider (body, query, params)
 */
export const validate = (schema: Schema, property: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    if (!error) {
      next();
    } else {
      const errors = error.details.reduce((acc: Record<string, string>, curr) => {
        const key = curr.path.join('.');
        acc[key] = curr.message;
        return acc;
      }, {});
      
      next(new BadRequestError('Erreur de validation', errors));
    }
  };
};