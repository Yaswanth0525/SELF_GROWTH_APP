import Streak from '../models/Streak.js';

// @desc    Get user streak
// @route   GET /api/streaks
// @access  Private
export const getStreak = async (req, res) => {
    try {
        let streak = await Streak.findOne({ userId: req.user._id });
        if (!streak) {
            streak = await Streak.create({ userId: req.user._id });
        }
        res.json(streak);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user streak
// @route   PUT /api/streaks
// @access  Private
export const updateStreak = async (req, res) => {
    try {
        let streak = await Streak.findOne({ userId: req.user._id });
        if (!streak) {
            streak = new Streak({ userId: req.user._id });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const lastActive = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
        if (lastActive) {
            lastActive.setHours(0, 0, 0, 0);
        }

        const diffTime = lastActive ? Math.abs(today - lastActive) : -1;
        const diffDays = diffTime !== -1 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : -1;

        if (diffDays === -1 || diffDays > 1) {
            // Reset streak
            streak.currentStreak = 1;
        } else if (diffDays === 1) {
            // Increment streak
            streak.currentStreak += 1;
        }

        if (streak.currentStreak > streak.longestStreak) {
            streak.longestStreak = streak.currentStreak;
        }

        streak.lastActiveDate = new Date();
        await streak.save();

        res.json(streak);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
