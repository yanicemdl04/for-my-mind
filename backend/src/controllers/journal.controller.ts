import { Request, Response } from 'express';
import { journalService } from '../services/journal.services';

// @desc    Create a new journal entry
// @route   POST /api/journal
// @access  Private
export const createJournalEntry = async (req: Request, res: Response) => {
  try {
    const entryData = req.body;
    const userId = (req as any).user.id;

    const journalEntry = await journalService.createJournalEntry(userId, entryData);
    res.status(201).json(journalEntry);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get all journal entries for a user
// @route   GET /api/journal
// @access  Private
export const getJournalEntries = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const journalEntries = await journalService.getJournalEntries(userId);
    res.json(journalEntries);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get a single journal entry
// @route   GET /api/journal/:id
// @access  Private
export const getJournalEntry = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const journalEntry = await journalService.getJournalEntry(id, userId);
    res.json(journalEntry);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Journal non trouvé' });
  }
};

// @desc    Update a journal entry
// @route   PUT /api/journal/:id
// @access  Private
export const updateJournalEntry = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;
    const entryData = req.body;

    const updatedJournal = await journalService.updateJournalEntry(id, userId, entryData);
    res.json(updatedJournal);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Journal non trouvé' });
  }
};

// @desc    Delete a journal entry
// @route   DELETE /api/journal/:id
// @access  Private
export const deleteJournalEntry = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { id } = req.params;

    const result = await journalService.deleteJournalEntry(id, userId);
    res.json(result);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'Journal non trouvé' });
  }
};