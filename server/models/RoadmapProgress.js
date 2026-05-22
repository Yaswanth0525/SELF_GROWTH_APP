import mongoose from 'mongoose';

const roadmapProgressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    phaseId: { type: Number, required: true },
    categoryName: { type: String, required: true },
    topicName: { type: String, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    revisions: { type: Number, default: 0 },
    xpEarned: { type: Number, default: 0 },
    estHours: { type: Number, default: 1 }
}, { timestamps: true });

roadmapProgressSchema.index({ userId: 1, topicName: 1 }, { unique: true });

const RoadmapProgress = mongoose.model('RoadmapProgress', roadmapProgressSchema);
export default RoadmapProgress;
