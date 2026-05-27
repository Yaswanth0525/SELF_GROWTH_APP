import Task from '../models/Task.js';
import User from '../models/User.js';
import DailyProgress from '../models/DailyProgress.js';

// @desc    Get user tasks for today
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        let tasks = await Task.find({
            userId: req.user._id,
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        });

        // Auto-seed default tasks if none exist for today
        if (tasks.length === 0) {
            const defaultTasks = [
                { title: 'Aptitude Practice', duration: 45, xpReward: 10, category: 'Aptitude' },
                { title: 'Solve DSA Problems', duration: 90, xpReward: 20, category: 'DSA' },
                { title: 'OOPS Revision', duration: 60, xpReward: 15, category: 'OOPS' },
                { title: 'OS Revision', duration: 45, xpReward: 15, category: 'OS' },
                { title: 'DBMS Practice', duration: 45, xpReward: 15, category: 'DBMS' },
                { title: 'Communication Practice', duration: 30, xpReward: 10, category: 'Communication' }
            ];

            const tasksToCreate = defaultTasks.map(t => ({
                ...t,
                userId: req.user._id,
                priority: 'Normal',
                date: new Date()
            }));

            await Task.insertMany(tasksToCreate);
            
            // Re-fetch after insertion
            tasks = await Task.find({
                userId: req.user._id,
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            });
        }

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
    const { title, duration, xpReward, category, priority } = req.body;

    try {
        const task = new Task({
            userId: req.user._id,
            title,
            duration,
            xpReward,
            category,
            priority: priority || 'Normal'
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Complete a task
// @route   PUT /api/tasks/:id/complete
// @access  Private
export const completeTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task && task.userId.toString() === req.user._id.toString()) {
            const user = await User.findById(req.user._id);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            let progress = await DailyProgress.findOne({ userId: req.user._id, date: today });
            if (!progress) {
                progress = new DailyProgress({ userId: req.user._id, date: today });
            }

            if (task.completed) {
                // Untoggle task
                task.completed = false;
                user.xp = Math.max(0, user.xp - task.xpReward);
                user.level = Math.floor(user.xp / 100) + 1;
                
                progress.tasksCompleted = Math.max(0, progress.tasksCompleted - 1);
                progress.xpEarned = Math.max(0, progress.xpEarned - task.xpReward);
                progress.dailyActivityScore = Math.max(0, (progress.dailyActivityScore || 0) - task.xpReward);
            } else {
                // Complete task
                task.completed = true;
                user.xp += task.xpReward;
                user.level = Math.floor(user.xp / 100) + 1;

                progress.tasksCompleted += 1;
                progress.xpEarned += task.xpReward;
                progress.dailyActivityScore = (progress.dailyActivityScore || 0) + task.xpReward;

                // Check if all primary/secondary/bonus missions are done
                const allMissions = await Task.find({ 
                    userId: req.user._id, 
                    date: { $gte: today },
                    priority: { $in: ['Primary', 'Secondary', 'Bonus'] }
                });
                const uncompletedMissions = allMissions.filter(m => !m.completed);
                
                if (allMissions.length > 0 && uncompletedMissions.length === 1 && uncompletedMissions[0]._id.toString() === task._id.toString()) {
                    progress.dailyActivityScore += 5; // Bonus for completing all
                }
            }

            await task.save();
            await user.save();
            await progress.save();

            res.json({ task, xp: user.xp, level: user.level, dailyActivityScore: progress.dailyActivityScore });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task && task.userId.toString() === req.user._id.toString()) {
            await task.deleteOne();
            res.json({ message: 'Task removed' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
