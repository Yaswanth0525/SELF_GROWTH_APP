import express from 'express';
import { getStreak, updateStreak } from '../controllers/streakController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getStreak)
    .put(protect, updateStreak);

export default router;
