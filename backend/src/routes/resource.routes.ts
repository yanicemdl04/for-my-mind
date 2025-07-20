import express from 'express';
import { prisma } from '../config/database';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

// @desc    Get all resources
// @route   GET /api/resources
// @access  Private
router.get('/', protect, async (req, res, next) => {
  try {
    const resources = await prisma.resource.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(resources);
  } catch (error) {
    next(error);
  }
});

// @desc    Get resources by type
// @route   GET /api/resources/type/:type
// @access  Private
router.get('/type/:type', protect, async (req, res, next) => {
  try {
    const { type } = req.params;
    
    const resources = await prisma.resource.findMany({
      where: { 
        type: type as any
      },
      orderBy: { createdAt: 'desc' }
    });
    
    res.json(resources);
  } catch (error) {
    next(error);
  }
});

// @desc    Get a single resource
// @route   GET /api/resources/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const resource = await prisma.resource.findUnique({
      where: { id }
    });
    
    if (!resource) {
      return res.status(404).json({ message: 'Ressource non trouvée' });
    }
    
    res.json(resource);
  } catch (error) {
    next(error);
  }
});

export default router;