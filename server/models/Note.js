import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    category: { type: String, required: true }
}, { timestamps: true });

const Note = mongoose.model('Note', noteSchema);
export default Note;
