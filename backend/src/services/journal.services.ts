import { prisma } from '../config/database';
import { MediaType } from '@prisma/client';
import { validateJournalEntry } from '../utils/validators';
import { NotFoundError } from '../utils/errorHandler';

export interface JournalEntryInput {
  content: string;
  mediaUrl?: string;
  type: MediaType;
}

export const journalService = {
  createJournalEntry: async (userId: string, entryData: JournalEntryInput) => {
    // Valider l'entrée du journal
    validateJournalEntry(entryData.content, entryData.type);
    
    const journalEntry = await prisma.journalEntry.create({
      data: {
        ...entryData,
        userId
      }
    });

    return journalEntry;
  },

  getJournalEntries: async (userId: string) => {
    const journalEntries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    return journalEntries;
  },

  getJournalEntry: async (id: string, userId: string) => {
    const journalEntry = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!journalEntry) {
      throw new NotFoundError('Journal non trouvé');
    }

    return journalEntry;
  },

  updateJournalEntry: async (id: string, userId: string, entryData: JournalEntryInput) => {
    // Valider l'entrée du journal
    validateJournalEntry(entryData.content, entryData.type);
    
    // Check if journal entry exists and belongs to user
    const journalExists = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!journalExists) {
      throw new NotFoundError('Journal non trouvé');
    }

    const updatedJournal = await prisma.journalEntry.update({
      where: { id },
      data: entryData
    });

    return updatedJournal;
  },

  deleteJournalEntry: async (id: string, userId: string) => {
    // Check if journal entry exists and belongs to user
    const journalExists = await prisma.journalEntry.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!journalExists) {
      throw new NotFoundError('Journal non trouvé');
    }

    await prisma.journalEntry.delete({
      where: { id }
    });

    return { message: 'Journal supprimé' };
  }
};