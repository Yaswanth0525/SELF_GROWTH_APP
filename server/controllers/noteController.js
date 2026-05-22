import Note from '../models/Note.js';
import DailyProgress from '../models/DailyProgress.js';

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, snippet, category } = req.body;
        const note = new Note({
            userId: req.user._id,
            title,
            snippet,
            category
        });
        await note.save();

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let progress = await DailyProgress.findOne({ userId: req.user._id, date: today });
        if (!progress) {
            progress = new DailyProgress({ userId: req.user._id, date: today });
        }
        progress.notesCreated += 1;
        progress.dailyActivityScore += 5;
        await progress.save();

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!note) return res.status(404).json({ error: 'Note not found' });
        res.json({ message: 'Note deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
