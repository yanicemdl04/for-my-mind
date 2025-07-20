import { Request, Response } from 'express';
import { authService } from '../services/auth.services';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    console.log('Données reçues:', userData);
    
    // Vérification des champs requis
    if (!userData.email) {
      return res.status(400).json({ message: 'Email requis' });
    }
    if (!userData.password) {
      return res.status(400).json({ message: 'Mot de passe requis' });
    }
    if (!userData.nom) {
      return res.status(400).json({ message: 'Nom requis' });
    }
    if (!userData.prenom) {
      return res.status(400).json({ message: 'Prénom requis' });
    }
    
    const user = await authService.registerUser(userData);
    res.status(201).json(user);
  } catch (error: any) {
    console.error('Erreur d\'inscription:', error);
    res.status(400).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await authService.loginUser(userData);
    res.json(user);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Email ou mot de passe invalide' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.getUserProfile(userId);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Utilisateur non trouvé' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const userData = req.body;
    const user = await authService.updateUserProfile(userId, userData);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Erreur serveur' });
  }
};