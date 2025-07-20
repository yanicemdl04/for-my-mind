import express from 'express';
import { 
  createExercise, 
  getExercises, 
  getExercise, 
  updateExercise, 
  deleteExercise,
  getExerciseStats
} from '../controllers/exercise.controller';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// All exercise routes are protected
router.use(protect);

router.route('/')
  .post(createExercise)
  .get(getExercises);

router.get('/stats', getExerciseStats);

router.route('/:id')
  .get(getExercise)
  .put(updateExercise)
  .delete(deleteExercise);

export default router;