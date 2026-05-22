import FocusSession from '../models/FocusSession.js';
import User from '../models/User.js';
import DailyProgress from '../models/DailyProgress.js';

export const saveFocusSession = async (req, res) => {
    const { durationMinutes } = req.body;
    
    try {
        const xpEarned = Math.floor(durationMinutes / 5); // 1 XP per 5 mins for focus
        
        const session = await FocusSession.create({
            userId: req.user._id,
            durationMinutes,
            xpEarned
        });

        const user = await User.findById(req.user._id);
        user.xp += xpEarned;
        const requiredXP = user.level * 100;
        if (user.xp >= requiredXP) {
            user.level += 1;
        }
        await user.save();

        // Update Daily Progress
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let progress = await DailyProgress.findOne({ userId: req.user._id, date: today });
        if (!progress) {
            progress = new DailyProgress({ userId: req.user._id, date: today });
        }
        progress.focusMinutes += durationMinutes;
        progress.xpEarned += xpEarned;
        progress.dailyActivityScore = (progress.dailyActivityScore || 0) + Math.floor(durationMinutes / 5);
        await progress.save();

        res.status(201).json({ session, userXP: user.xp, userLevel: user.level });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFocusSessions = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0,0,0,0);
        const sessions = await FocusSession.find({ 
            userId: req.user._id,
            completedAt: { $gte: today } 
        });
        res.json(sessions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
