import { Request, Response } from 'express';
import { chatbotService } from '../services/chatbot.services';

// @desc    Send a message to the chatbot
// @route   POST /api/chatbot/message
// @access  Private
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const messageData = req.body;
    const userId = (req as any).user.id;

    const result = await chatbotService.sendMessage(userId, messageData);
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get chat history for a user
// @route   GET /api/chatbot/history
// @access  Private
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const chatHistory = await chatbotService.getChatHistory(userId);
    res.json(chatHistory);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Clear chat history for a user
// @route   DELETE /api/chatbot/history
// @access  Private
export const clearChatHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const result = await chatbotService.clearChatHistory(userId);
    res.json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};

// @desc    Get recommendations based on user data
// @route   GET /api/chatbot/recommendations
// @access  Private
export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const recommendation = await chatbotService.getRecommendations(userId);
    res.json(recommendation);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur serveur' });
  }
};