import mongoose from 'mongoose';

const focusSessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    durationMinutes: {
        type: Number,
        required: true
    },
    xpEarned: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const FocusSession = mongoose.model('FocusSession', focusSessionSchema);
export default FocusSession;
