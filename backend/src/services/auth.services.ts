import { prisma } from '../config/database';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { isValidEmail, isValidPassword } from '../utils/validateInput';
import { BadRequestError, UnauthorizedError } from '../utils/errorHandler';

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

export const authService = {
  registerUser: async (userData: RegisterUserInput) => {
    const { email, password, nom, prenom } = userData;

    // Valider les données
    if (!isValidEmail(email)) {
      throw new BadRequestError('Email invalide');
    }
    
    if (!isValidPassword(password)) {
      throw new BadRequestError('Le mot de passe doit contenir au moins 6 caractères');
    }
    
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      throw new BadRequestError('Utilisateur déjà existant');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        nom,
        prenom
      }
    });

    return {
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      token: generateToken(user.id)
    };
  },

  loginUser: async (userData: LoginUserInput) => {
    const { email, password } = userData;

    // Check for user email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new UnauthorizedError('Email ou mot de passe invalide');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedError('Email ou mot de passe invalide');
    }

    return {
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
      token: generateToken(user.id)
    };
  },

  getUserProfile: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        nom: true,
        prenom: true,
        happy: true,
        stress: true,
        goal: true,
        emotion: true,
        createdAt: true
      }
    });

    if (!user) {
      throw new BadRequestError('Utilisateur non trouvé');
    }

    return user;
  },

  updateUserProfile: async (userId: string, userData: UpdateProfileInput) => {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: userData
    });

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      nom: updatedUser.nom,
      prenom: updatedUser.prenom,
      happy: updatedUser.happy,
      stress: updatedUser.stress,
      goal: updatedUser.goal,
      emotion: updatedUser.emotion
    };
  }
};

