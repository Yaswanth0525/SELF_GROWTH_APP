import DailyProgress from '../models/DailyProgress.js';

export const getProgress = async (req, res) => {
    try {
        const progress = await DailyProgress.find({ userId: req.user._id }).sort({ date: 1 });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
