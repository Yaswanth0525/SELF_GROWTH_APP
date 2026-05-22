import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        default: 0 // in minutes
    },
    xpReward: {
        type: Number,
        required: true,
        default: 10
    },
    category: {
        type: String,
        required: true,
        enum: ['Aptitude', 'DSA', 'OOPS', 'OS', 'DBMS', 'Communication', 'Other']
    },
    priority: {
        type: String,
        enum: ['Primary', 'Secondary', 'Bonus', 'Normal'],
        default: 'Normal'
    },
    completed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
