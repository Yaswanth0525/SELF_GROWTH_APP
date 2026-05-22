import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import API from '../api/axios';

const Heatmap = ({ data }) => {
    // Map dates to activity scores
    const dateScores = {};
    if (data) {
        data.forEach(d => {
            const dateStr = new Date(d.date).toISOString().split('T')[0];
            dateScores[dateStr] = d;
        });
    }

    const today = new Date();
    today.setHours(0,0,0,0);
    const weeks = [];
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() - 364); // Start 52 weeks ago

    for (let i = 0; i < 52; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const stat = dateScores[dateStr];
            let level = 0;
            if (stat) {
                const score = stat.dailyActivityScore || 0;
                if (score > 40) level = 4;
                else if (score > 20) level = 3;
                else if (score > 10) level = 2;
                else if (score > 0) level = 1;
            }
            week.push(level);
            currentDate.setDate(currentDate.getDate() + 1);
        }
        weeks.push(week);
    }

    const getColor = (val) => {
        if (val === 0) return 'bg-[#1e1e1e]';
        if (val === 1) return 'bg-[#0e4429]';
        if (val === 2) return 'bg-[#006d32]';
        if (val === 3) return 'bg-[#26a641]';
        return 'bg-[#39d353]';
    };

    return (
        <div className="flex gap-1 overflow-x-auto pb-2">
            {weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-1">
                    {week.map((dayLevel, j) => (
                        <div key={j} className={`w-3 h-3 rounded-[2px] ${getColor(dayLevel)}`} />
                    ))}
                </div>
            ))}
        </div>
    );
};

const Analytics = () => {
    const [summary, setSummary] = useState(null);
    const [heatmap, setHeatmap] = useState([]);
    const [monthly, setMonthly] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const [sumRes, heatRes, monthRes, subRes] = await Promise.all([
                    API.get('/analytics/summary'),
                    API.get('/analytics/heatmap'),
                    API.get('/analytics/monthly'),
                    API.get('/analytics/subjects')
                ]);
                setSummary(sumRes.data);
                setHeatmap(heatRes.data);
                setMonthly(monthRes.data);
                setSubjects(subRes.data);
            } catch(e) { console.error(e) } finally { setLoading(false); }
        };
        fetchAnalytics();
    }, []);

    if (loading) return <div className="h-full flex items-center justify-center">Loading Analytics Pipeline...</div>;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            <h1 className="text-4xl font-black uppercase tracking-tight text-white border-b border-white/10 pb-6">Analytics Deep Dive</h1>
            
            {/* Top Stats */}
            <div className="grid grid-cols-4 gap-6">
                {[
                    { label: 'Total Study Hours', value: `${summary?.totalHours || 0}h`, color: 'text-primary' },
                    { label: 'Total XP Earned', value: summary?.totalXP || 0, color: 'text-success' },
                    { label: 'Avg Daily Focus', value: `${summary?.avgFocus || 0}h`, color: 'text-info' },
                    { label: 'Roadmap Completion', value: `${summary?.completionRate || 0}%`, color: 'text-warning' }
                ].map(s => (
                    <div key={s.label} className="glass-card p-6 flex flex-col items-center justify-center">
                        <span className={`text-3xl font-black ${s.color}`}>{s.value}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-2">{s.label}</span>
                    </div>
                ))}
            </div>

            {/* Heatmap */}
            <div className="glass-card p-6">
                <h3 className="font-bold text-sm mb-6 uppercase text-warning">Study Consistency (1 Year)</h3>
                <Heatmap data={heatmap} />
                <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                    <span>Less <div className="inline-block w-2 h-2 bg-[#1e1e1e] mx-1"></div><div className="inline-block w-2 h-2 bg-[#39d353] mx-1"></div> More</span>
                    <span>Activity Score Heatmap</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Bar Chart */}
                <div className="glass-card p-6">
                    <h3 className="font-bold text-sm mb-6 uppercase text-info">Monthly Progress (XP vs Focus)</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthly}>
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{backgroundColor: '#111', border: 'none', borderRadius: '8px', color: '#fff'}} />
                                <Bar dataKey="xp" fill="#2196F3" radius={[4,4,0,0]} name="XP Earned" />
                                <Bar dataKey="focus" fill="#FFC107" radius={[4,4,0,0]} name="Focus Hours" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Radar Chart */}
                <div className="glass-card p-6">
                    <h3 className="font-bold text-sm mb-6 uppercase text-accent">Subject-wise Mastery</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjects}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" tick={{fill: '#999', fontSize: 12}} />
                                <Radar name="Performance" dataKey="A" stroke="#9C27B0" fill="#9C27B0" fillOpacity={0.5} />
                                <Tooltip contentStyle={{backgroundColor: '#111', border: 'none', borderRadius: '8px', color: '#fff'}} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Analytics;
