import express from 'express';
import { 
  createMood, 
  getMoods, 
  getMood, 
  updateMood, 
  deleteMood,
  getMoodStats
} from '../controllers/mood.controller';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// All mood routes are protected
router.use(protect);

router.route('/')
  .post(createMood)
  .get(getMoods);

router.get('/stats', getMoodStats);

router.route('/:id')
  .get(getMood)
  .put(updateMood)
  .delete(deleteMood);

export default router;