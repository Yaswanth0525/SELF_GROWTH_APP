import mongoose from 'mongoose';

const streakSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    currentStreak: {
        type: Number,
        default: 0
    },
    longestStreak: {
        type: Number,
        default: 0
    },
    lastActiveDate: {
        type: Date
    }
}, {
    timestamps: true
});

const Streak = mongoose.model('Streak', streakSchema);
export default Streak;
