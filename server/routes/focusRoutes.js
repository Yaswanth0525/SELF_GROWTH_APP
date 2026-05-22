import express from 'express';
import { saveFocusSession, getFocusSessions } from '../controllers/focusController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, getFocusSessions)
    .post(protect, saveFocusSession);

export default router;
