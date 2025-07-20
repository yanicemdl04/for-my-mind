import { Request, Response } from 'express';
import { exerciseService } from '../services/exercise.services';

// @desc    Create a new exercise entry
// @route   POST /api/exercise
// @access  Private
export const createExercise = async (req: Request, res: Response) => {
  try {
    const exerciseData = req.body;
    const userId = (req as any).user.id;

    const exercise = await exerciseService.createExercise(userId, exerciseData);
    res.status(201).json(exercise);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get all exercise entries for a user
// @route   GET /api/exercise
// @access  Private
export const getExercises = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const exercises = await exerciseService.getExercises(userId);
    res.json(exercises);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get exercise statistics for a user
// @route   GET /api/exercise/stats
// @access  Private
export const getExerciseStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const stats = await exerciseService.getExerciseStats(userId);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get a single exercise entry
// @route   GET /api/exercise/:id
// @access  Private
export const getExercise = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const exercise = await exerciseService.getExercise(id, userId);
    res.json(exercise);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Exercice non trouvé' });
  }
};

// @desc    Update an exercise entry
// @route   PUT /api/exercise/:id
// @access  Private
export const updateExercise = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const exerciseData = req.body;

    const updatedExercise = await exerciseService.updateExercise(id, userId, exerciseData);
    res.json(updatedExercise);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Exercice non trouvé' });
  }
};

// @desc    Delete an exercise entry
// @route   DELETE /api/exercise/:id
// @access  Private
export const deleteExercise = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const result = await exerciseService.deleteExercise(id, userId);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Exercice non trouvé' });
  }
};