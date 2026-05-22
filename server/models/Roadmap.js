import mongoose from 'mongoose';

const roadmapSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    category: {
        type: String,
        required: true,
        enum: ['DSA', 'OS', 'DBMS', 'OOPS']
    },
    topics: [{
        name: { type: String, required: true },
        status: { 
            type: String, 
            enum: ['✅', '🔄', '⏳'], 
            default: '⏳' 
        }
    }]
}, {
    timestamps: true
});

const Roadmap = mongoose.model('Roadmap', roadmapSchema);
export default Roadmap;
