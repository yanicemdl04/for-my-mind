import express from 'express';
import { 
  createJournalEntry, 
  getJournalEntries, 
  getJournalEntry, 
  updateJournalEntry, 
  deleteJournalEntry 
} from '../controllers/journal.controller';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// All journal routes are protected
router.use(protect);

router.route('/')
  .post(createJournalEntry)
  .get(getJournalEntries);

router.route('/:id')
  .get(getJournalEntry)
  .put(updateJournalEntry)
  .delete(deleteJournalEntry);

export default router;