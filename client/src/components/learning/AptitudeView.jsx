import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, CheckCircle, Brain, BookOpen, AlertCircle, Edit3, MessageSquare, Book, FileText } from 'lucide-react';

const aptitudeTopics = {
    quantitative: ['Number System', 'Percentage', 'Profit & Loss', 'Ratio & Proportion', 'Average', 'Time & Work', 'Pipes & Cisterns', 'Time Speed Distance', 'Boats & Streams', 'Probability', 'Permutation & Combination', 'Geometry', 'Mensuration', 'Algebra', 'Data Interpretation'],
    logical: ['Blood Relations', 'Coding Decoding', 'Direction Sense', 'Seating Arrangement', 'Puzzles', 'Syllogism', 'Statement Conclusion', 'Data Sufficiency'],
    verbal: ['Reading Comprehension', 'Sentence Correction', 'Para Jumbles', 'Vocabulary', 'Synonyms', 'Antonyms']
};

const NoteActions = ({ subject, topic }) => (
    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=notes`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-300 hover:text-primary rounded transition">
            <Edit3 size={12}/> Notes
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=revision`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-warning/20 text-gray-300 hover:text-warning rounded transition">
            <Book size={12}/> Revision Notes
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=important`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-accent/20 text-gray-300 hover:text-accent rounded transition">
            <AlertCircle size={12}/> Important Points
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=interview`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-info/20 text-gray-300 hover:text-info rounded transition">
            <MessageSquare size={12}/> Interview Qs
        </Link>
    </div>
);

const AptitudeView = () => {
    const [activeTab, setActiveTab] = useState('quantitative');

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            {/* Header & Stats */}
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 glass-card p-6 flex flex-col justify-center border-l-4 border-warning">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center">
                        <Target size={28} className="mr-3 text-warning" /> Aptitude
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Master Quantitative, Logical & Verbal skills for placements.</p>
                </div>
                
                <div className="col-span-2 grid grid-cols-4 gap-4">
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-white">450</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Qs Solved</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-success/10"></div>
                        <span className="text-2xl font-black text-success z-10">82%</span>
                        <span className="text-[10px] text-success uppercase font-bold tracking-widest mt-1 z-10">Accuracy</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-info">12</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Mock Tests</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-lg font-bold text-gray-300">Data Int.</span>
                        <span className="text-[10px] text-red-400 uppercase tracking-widest mt-1 font-bold">Weakest Area</span>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-4 border-b border-white/10 pb-4">
                {[
                    { id: 'quantitative', label: 'Quantitative', icon: Brain },
                    { id: 'logical', label: 'Logical Reasoning', icon: Target },
                    { id: 'verbal', label: 'Verbal Ability', icon: BookOpen }
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-bold transition ${activeTab === tab.id ? 'bg-warning/20 text-warning border-b-2 border-warning' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <tab.icon size={18} /> {tab.label}
                    </button>
                ))}
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-2 gap-6">
                {aptitudeTopics[activeTab].map((topic, i) => (
                    <div key={i} className="glass-card p-5 border-t-2 border-transparent hover:border-warning transition">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-white text-lg">{topic}</h3>
                            <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-400 font-bold uppercase">Pending</span>
                        </div>
                        <div className="flex gap-4 text-xs text-gray-400 mb-4">
                            <span>0/20 Solved</span>
                            <span>0% Accuracy</span>
                        </div>
                        <NoteActions subject="Aptitude" topic={topic} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default AptitudeView;
