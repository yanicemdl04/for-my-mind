import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '../generated/prisma';
import { UnauthorizedError } from '../utils/errorHandler';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

      // Get user from the token
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true }
      });

      if (!user) {
        throw new UnauthorizedError('Non autorisé, utilisateur non trouvé');
      }

      req.user = user;
      next();
    } catch (error) {
      next(new UnauthorizedError('Non autorisé, token invalide'));
    }
  } else {
    next(new UnauthorizedError('Non autorisé, aucun token'));
  }
};