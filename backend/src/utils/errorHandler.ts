/**
 * Classe personnalisée pour les erreurs d'API
 */
export class ApiError extends Error {
  statusCode: number;
  errors?: Record<string, string>;

  constructor(message: string, statusCode: number, errors?: Record<string, string>) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Erreur pour les ressources non trouvées (404)
 */
export class NotFoundError extends ApiError {
  constructor(message: string = 'Ressource non trouvée') {
    super(message, 404);
  }
}

/**
 * Erreur pour les requêtes non autorisées (401)
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Non autorisé') {
    super(message, 401);
  }
}

/**
 * Erreur pour les requêtes interdites (403)
 */
export class ForbiddenError extends ApiError {
  constructor(message: string = 'Accès interdit') {
    super(message, 403);
  }
}

/**
 * Erreur pour les requêtes invalides (400)
 */
export class BadRequestError extends ApiError {
  constructor(message: string = 'Requête invalide', errors?: Record<string, string>) {
    super(message, 400, errors);
  }
}