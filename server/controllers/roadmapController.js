import RoadmapProgress from '../models/RoadmapProgress.js';
import User from '../models/User.js';
import DailyProgress from '../models/DailyProgress.js';

export const getRoadmap = async (req, res) => {
    try {
        const progress = await RoadmapProgress.find({ userId: req.user._id });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTopic = async (req, res) => {
    try {
        const { phaseId, categoryName, topicName, status, xp, estHours, isRevision } = req.body;

        let topic = await RoadmapProgress.findOne({ userId: req.user._id, topicName });

        let justCompleted = false;

        if (topic) {
            if (topic.status !== 'completed' && status === 'completed') {
                justCompleted = true;
            }
            topic.status = status;
            topic.phaseId = phaseId;
            topic.categoryName = categoryName;
            topic.estHours = estHours || topic.estHours;
            
            if (isRevision) {
                topic.revisions += 1;
            }
            if (justCompleted) {
                topic.xpEarned += xp;
            }
            await topic.save();
        } else {
            if (status === 'completed') justCompleted = true;
            topic = new RoadmapProgress({
                userId: req.user._id,
                phaseId,
                categoryName,
                topicName,
                status,
                estHours: estHours || 1,
                revisions: isRevision ? 1 : 0,
                xpEarned: justCompleted ? xp : 0
            });
            await topic.save();
        }

        if (justCompleted) {
            const user = await User.findById(req.user._id);
            user.xp += xp;
            user.level = Math.floor(user.xp / 100) + 1;
            await user.save();

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let progress = await DailyProgress.findOne({ userId: req.user._id, date: today });
            if (!progress) {
                progress = new DailyProgress({ userId: req.user._id, date: today });
            }
            progress.topicsCompleted += 1;
            progress.xpEarned += xp;
            progress.dailyActivityScore += 15;
            await progress.save();
        } else if (isRevision) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let progress = await DailyProgress.findOne({ userId: req.user._id, date: today });
            if (!progress) {
                progress = new DailyProgress({ userId: req.user._id, date: today });
            }
            progress.dailyActivityScore += 5;
            await progress.save();
        }

        res.json(topic);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
