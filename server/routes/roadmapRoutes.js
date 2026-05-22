import express from 'express';
import { getRoadmap, updateTopic } from '../controllers/roadmapController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getRoadmap);
router.route('/topic').put(updateTopic);

export default router;
