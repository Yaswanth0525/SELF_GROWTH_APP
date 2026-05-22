import mongoose from 'mongoose';

const dailyProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    xpEarned: {
        type: Number,
        default: 0
    },
    tasksCompleted: {
        type: Number,
        default: 0
    },
    focusMinutes: {
        type: Number,
        default: 0
    },
    topicsCompleted: {
        type: Number,
        default: 0
    },
    notesCreated: {
        type: Number,
        default: 0
    },
    dailyActivityScore: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const DailyProgress = mongoose.model('DailyProgress', dailyProgressSchema);
export default DailyProgress;
