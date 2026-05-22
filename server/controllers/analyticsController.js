import DailyProgress from '../models/DailyProgress.js';
import RoadmapProgress from '../models/RoadmapProgress.js';
import Note from '../models/Note.js';
import User from '../models/User.js';

export const getSummary = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const progressList = await DailyProgress.find({ userId: req.user._id });
        
        const totalHours = progressList.reduce((acc, curr) => acc + (curr.focusMinutes || 0), 0) / 60;
        const avgFocus = progressList.length > 0 ? (totalHours / progressList.length) : 0;
        
        const allTopics = await RoadmapProgress.find({ userId: req.user._id });
        const completedTopics = allTopics.filter(t => t.status === 'completed').length;
        const completionRate = allTopics.length > 0 ? Math.round((completedTopics / allTopics.length) * 100) : 0;

        res.json({
            totalHours: totalHours.toFixed(1),
            totalXP: user.xp || 0,
            avgFocus: avgFocus.toFixed(1),
            completionRate
        });
    } catch(err) { res.status(500).json({error: err.message}); }
};

export const getHeatmap = async (req, res) => {
    try {
        const data = await DailyProgress.find({ userId: req.user._id }).sort({ date: 1 });
        res.json(data);
    } catch(err) { res.status(500).json({error: err.message}); }
};

export const getMonthly = async (req, res) => {
    try {
        const data = await DailyProgress.aggregate([
            { $match: { userId: req.user._id } },
            { $group: {
                _id: { $month: "$date" },
                xp: { $sum: "$xpEarned" },
                focusMinutes: { $sum: "$focusMinutes" }
            }},
            { $sort: { _id: 1 } }
        ]);
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        const formatted = data.map(d => ({
            name: months[d._id - 1] || 'Unknown',
            xp: d.xp,
            focus: Math.round(d.focusMinutes / 60)
        }));
        res.json(formatted);
    } catch(err) { res.status(500).json({error: err.message}); }
};

export const getSubjects = async (req, res) => {
    try {
        const subjects = [
            { name: "Aptitude", match: "Aptitude" },
            { name: "DSA", match: "Arrays" },
            { name: "OOPS", match: "OOPS" },
            { name: "OS", match: "Operating" },
            { name: "DBMS", match: "DBMS" },
            { name: "Comm", match: "Communication" }
        ];
        const roadmapData = await RoadmapProgress.find({ userId: req.user._id });
        const notesData = await Note.find({ userId: req.user._id });

        const formatted = subjects.map(sub => {
            const subjectTopics = roadmapData.filter(t => t.categoryName.includes(sub.match));
            const completed = subjectTopics.filter(t => t.status === 'completed').length;
            const completionScore = subjectTopics.length > 0 ? (completed / subjectTopics.length) * 100 : 0;
            
            const subjectNotes = notesData.filter(n => n.category.includes(sub.match)).length;
            
            const score = Math.min(100, Math.round((completionScore * 0.7) + (subjectNotes * 5)));

            return {
                subject: sub.name,
                A: score,
                fullMark: 100
            };
        });

        res.json(formatted);
    } catch(err) { res.status(500).json({error: err.message}); }
};
