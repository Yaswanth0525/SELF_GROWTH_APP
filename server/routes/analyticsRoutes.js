import express from 'express';
import { getSummary, getHeatmap, getMonthly, getSubjects } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/summary', getSummary);
router.get('/heatmap', getHeatmap);
router.get('/monthly', getMonthly);
router.get('/subjects', getSubjects);

export default router;
