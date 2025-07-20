import { prisma } from '../config/database';
import { RecommendationType } from '@prisma/client';
import { BadRequestError } from '../utils/errorHandler';
import { CHAT_ROLES, RECOMMENDATION_TYPES } from '../utils/constants';

export interface MessageInput {
  content: string;
}

export const chatbotService = {
  sendMessage: async (userId: string, messageData: MessageInput) => {
    if (!messageData.content || messageData.content.trim() === '') {
      throw new BadRequestError('Le message ne peut pas être vide');
    }
    
    // Save user message
    const userMessage = await prisma.chatMessage.create({
      data: {
        content: messageData.content,
        role: CHAT_ROLES.USER,
        userId
      }
    });

    // TODO: Integrate with an AI service like OpenAI
    // For now, we'll just create a simple response
    const botResponse = "Je suis là pour t'aider. Comment te sens-tu aujourd'hui ?";

    // Save bot response
    const botMessage = await prisma.chatMessage.create({
      data: {
        content: botResponse,
        role: CHAT_ROLES.ASSISTANT,
        userId
      }
    });

    return {
      userMessage,
      botMessage
    };
  },

  getChatHistory: async (userId: string) => {
    const chatHistory = await prisma.chatMessage.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' }
    });

    return chatHistory;
  },

  clearChatHistory: async (userId: string) => {
    await prisma.chatMessage.deleteMany({
      where: { userId }
    });

    return { message: 'Historique de chat supprimé' };
  },

  getRecommendations: async (userId: string) => {
    // Get user's recent moods
    const recentMoods = await prisma.mood.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
    
    // Simple recommendation logic based on most recent mood
    let recommendationType: RecommendationType = RECOMMENDATION_TYPES.ARTICLE;
    let recommendationContent = '';
    
    if (recentMoods.length > 0) {
      const latestMood = recentMoods[0];
      
      switch (latestMood.moodType) {
        case 'DEPRIME':
        case 'TRISTE':
          recommendationType = RECOMMENDATION_TYPES.MUSIC;
          recommendationContent = 'Voici une playlist relaxante pour améliorer ton humeur';
          break;
        case 'NEUTRE':
          recommendationType = RECOMMENDATION_TYPES.ARTICLE;
          recommendationContent = 'Un article sur la pleine conscience pourrait t\'intéresser';
          break;
        case 'CONTENT':
        case 'TRES_HEUREUX':
          recommendationType = RECOMMENDATION_TYPES.QUOTE;
          recommendationContent = 'Continue sur cette lancée ! "Le bonheur n\'est pas une destination, mais une façon de voyager."';
          break;
        default:
          recommendationType = RECOMMENDATION_TYPES.VIDEO;
          recommendationContent = 'Voici une vidéo de méditation guidée';
      }
    } else {
      recommendationType = RECOMMENDATION_TYPES.ARTICLE;
      recommendationContent = 'Bienvenue ! Voici un article pour commencer votre parcours de bien-être';
    }
    
    // Save recommendation
    const recommendation = await prisma.recommendation.create({
      data: {
        type: recommendationType,
        content: recommendationContent,
        userId
      }
    });
    
    return recommendation;
  }
};