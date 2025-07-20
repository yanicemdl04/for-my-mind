import jwt from 'jsonwebtoken';

/**
 * Génère un token JWT pour l'authentification
 * @param id - ID de l'utilisateur
 * @returns Token JWT
 */
export const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d'
  });
};