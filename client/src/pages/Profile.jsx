import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { User, Flame, Star, Trophy, Clock, Target } from 'lucide-react';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            <h1 className="text-4xl font-black uppercase tracking-tight text-white border-b border-white/10 pb-6 flex items-center">
                <User size={32} className="mr-3 text-info" /> Developer Profile
            </h1>

            <div className="grid grid-cols-3 gap-8">
                {/* ID Card */}
                <div className="col-span-1 glass-card p-8 flex flex-col items-center text-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-info/20 to-transparent"></div>
                    <div className="w-32 h-32 rounded-full border-4 border-info bg-black/50 flex items-center justify-center mb-6 z-10">
                        <User size={48} className="text-info" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">{user?.name || 'Developer'}</h2>
                    <p className="text-sm text-gray-400 mb-6">{user?.email || 'dev@growthos.com'}</p>
                    
                    <div className="w-full bg-black/40 rounded-lg p-4 border border-white/5">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs text-gray-400 font-bold uppercase">Current Level</span>
                            <span className="text-sm font-black text-info">Lvl {user?.level || 1}</span>
                        </div>
                        <div className="w-full bg-black/60 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-info w-3/4 rounded-full"></div>
                        </div>
                        <div className="text-right mt-1 text-[10px] text-gray-500">{user?.xp || 0} / {(user?.level || 1) * 100} XP</div>
                    </div>
                </div>

                {/* Stats */}
                <div className="col-span-2 space-y-6">
                    <h3 className="font-bold tracking-wider text-sm">LIFETIME STATISTICS</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { icon: Flame, label: 'Current Streak', val: '23 Days', c: 'text-warning' },
                            { icon: Trophy, label: 'Longest Streak', val: '45 Days', c: 'text-accent' },
                            { icon: Star, label: 'Total XP Earned', val: user?.xp || '1,250', c: 'text-primary' },
                            { icon: Clock, label: 'Focus Hours', val: '142h', c: 'text-success' },
                            { icon: Target, label: 'Tasks Completed', val: '430', c: 'text-white' },
                            { icon: Award, label: 'Badges Unlocked', val: '12', c: 'text-info' }
                        ].map((s, i) => (
                            <div key={i} className="glass-card p-6 flex items-center gap-4">
                                <div className={`w-12 h-12 rounded bg-black/40 flex items-center justify-center border border-white/5`}>
                                    <s.icon size={20} className={s.c} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{s.label}</p>
                                    <p className="text-xl font-black text-white">{s.val}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Profile;
