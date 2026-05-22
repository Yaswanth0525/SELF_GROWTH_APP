import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Connect to database
console.log(process.env.MONGO_URI);
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import streakRoutes from './routes/streakRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import roadmapRoutes from './routes/roadmapRoutes.js';
import progressRoutes from './routes/progressRoutes.js';
import focusRoutes from './routes/focusRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/streaks', streakRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/roadmaps', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/focus', focusRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/', (req, res) => {
    res.send('GrowthOS API is running...');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
