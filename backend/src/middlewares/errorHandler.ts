import { Request, Response, NextFunction } from 'express';
import { ApiError, NotFoundError } from '../utils/errorHandler';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // Si c'est une ApiError, on utilise son statusCode et ses erreurs
  if (err instanceof ApiError) {
    const response: any = {
      message: err.message
    };
    
    // Ajouter les erreurs de validation si elles existent
    if (err.errors) {
      response.errors = err.errors;
    }
    
    // Ajouter la stack trace en développement
    if (process.env.NODE_ENV !== 'production') {
      response.stack = err.stack;
    }
    
    res.status(err.statusCode).json(response);
  } else {
    // Erreur générique
    const response: any = {
      message: err.message || 'Erreur serveur'
    };
    
    // Ajouter la stack trace en développement
    if (process.env.NODE_ENV !== 'production') {
      response.stack = err.stack;
    }
    
    res.status(500).json(response);
  }
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Route non trouvée - ${req.originalUrl}`));
};