import { Request, Response } from 'express';
import { moodService } from '../services/mood.services';

// @desc    Create a new mood entry
// @route   POST /api/mood
// @access  Private
export const createMood = async (req: Request, res: Response) => {
  try {
    const moodData = req.body;
    const userId = (req as any).user.id;

    const mood = await moodService.createMood(userId, moodData);
    res.status(201).json(mood);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get all mood entries for a user
// @route   GET /api/mood
// @access  Private
export const getMoods = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const moods = await moodService.getMoods(userId);
    res.json(moods);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get mood statistics for a user
// @route   GET /api/mood/stats
// @access  Private
export const getMoodStats = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const stats = await moodService.getMoodStats(userId);
    res.json(stats);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get a single mood entry
// @route   GET /api/mood/:id
// @access  Private
export const getMood = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const mood = await moodService.getMood(id, userId);
    res.json(mood);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Humeur non trouvée' });
  }
};

// @desc    Update a mood entry
// @route   PUT /api/mood/:id
// @access  Private
export const updateMood = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const moodData = req.body;

    const updatedMood = await moodService.updateMood(id, userId, moodData);
    res.json(updatedMood);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Humeur non trouvée' });
  }
};

// @desc    Delete a mood entry
// @route   DELETE /api/mood/:id
// @access  Private
export const deleteMood = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const result = await moodService.deleteMood(id, userId);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Humeur non trouvée' });
  }
};