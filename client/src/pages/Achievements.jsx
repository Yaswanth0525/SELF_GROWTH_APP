import React from 'react';
import { motion } from 'framer-motion';
import { Award, Flame, Lock, Star, Target, Zap } from 'lucide-react';

const achievementsData = [
    { id: 1, title: 'First Blood', desc: 'Complete your first task', icon: Target, unlocked: true, color: 'text-success' },
    { id: 2, title: 'Consistency King', desc: 'Reach a 7-day streak', icon: Flame, unlocked: true, color: 'text-warning' },
    { id: 3, title: 'Focus Master', desc: 'Log 10 hours of deep work', icon: Zap, unlocked: true, color: 'text-info' },
    { id: 4, title: 'DSA Initiate', desc: 'Solve 50 DSA problems', icon: Star, unlocked: false, color: 'text-gray-500' },
    { id: 5, title: 'Unstoppable', desc: 'Reach a 30-day streak', icon: Flame, unlocked: false, color: 'text-gray-500' },
    { id: 6, title: 'Grandmaster', desc: 'Reach Level 50', icon: Award, unlocked: false, color: 'text-gray-500' },
];

const Achievements = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            <h1 className="text-4xl font-black uppercase tracking-tight text-white border-b border-white/10 pb-6 flex items-center">
                <Award size={32} className="mr-3 text-accent" /> Achievements Vault
            </h1>

            <div className="grid grid-cols-3 gap-6">
                {achievementsData.map(badge => (
                    <div key={badge.id} className={`glass-card p-6 flex items-center gap-6 transition ${badge.unlocked ? 'border-l-4 border-l-primary hover:bg-white/5' : 'opacity-60 grayscale'}`}>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-black/40 ${badge.unlocked ? 'border border-primary' : 'border border-gray-600'}`}>
                            {badge.unlocked ? <badge.icon size={28} className={badge.color} /> : <Lock size={24} className="text-gray-600" />}
                        </div>
                        <div>
                            <h3 className={`text-lg font-bold ${badge.unlocked ? 'text-white' : 'text-gray-500'}`}>{badge.title}</h3>
                            <p className="text-xs text-gray-400 mt-1">{badge.desc}</p>
                            {badge.unlocked && <span className="inline-block mt-2 text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-1 rounded">Unlocked</span>}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Achievements;
