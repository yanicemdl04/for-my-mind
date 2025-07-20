import express from 'express';
import { 
  sendMessage, 
  getChatHistory, 
  clearChatHistory,
  getRecommendations
} from '../controllers/chatbot.controller';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// All chatbot routes are protected
router.use(protect);

router.post('/message', sendMessage);
router.get('/history', getChatHistory);
router.delete('/history', clearChatHistory);
router.get('/recommendations', getRecommendations);

export default router;