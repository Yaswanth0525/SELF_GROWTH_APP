import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code2, Flame, Edit3, Book, AlertCircle, MessageSquare } from 'lucide-react';

const dsaTopics = [
    'Arrays', 'Strings', 'Hashing', 'Two Pointer', 'Sliding Window', 'Linked List', 
    'Stack', 'Queue', 'Binary Search', 'Recursion', 'Backtracking', 'Trees', 'BST', 
    'Heap', 'Graph', 'BFS', 'DFS', 'Union Find', 'Greedy', 'Dynamic Programming', 'Trie', 'Segment Tree'
];

const NoteActions = ({ subject, topic }) => (
    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=notes`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-300 hover:text-primary rounded transition">
            <Edit3 size={12}/> Notes
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=interview`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-info/20 text-gray-300 hover:text-info rounded transition">
            <MessageSquare size={12}/> Interview Qs
        </Link>
    </div>
);

const DSAView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            {/* Header & LeetCode Style Stats */}
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 glass-card p-6 flex flex-col justify-center border-l-4 border-success">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center">
                        <Code2 size={28} className="mr-3 text-success" /> Data Structures
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Track your problem solving and coding milestones.</p>
                </div>
                
                <div className="col-span-8 glass-card p-6 grid grid-cols-4 gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Solved</span>
                        <span className="text-3xl font-black text-white">124</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-bold text-success uppercase tracking-widest mb-1">Easy</span>
                        <span className="text-2xl font-bold text-white">62</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-bold text-warning uppercase tracking-widest mb-1">Medium</span>
                        <span className="text-2xl font-bold text-white">45</span>
                    </div>
                    <div className="flex flex-col border-l border-white/10 pl-4">
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">Hard</span>
                        <span className="text-2xl font-bold text-white">17</span>
                    </div>
                </div>
            </div>

            {/* Topic Progress Heatmap */}
            <div className="glass-card p-6">
                <h3 className="text-sm font-bold uppercase text-white mb-6">Topic Progress Heatmap</h3>
                <div className="grid grid-cols-6 gap-3">
                    {['Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'DP'].map(t => (
                        <div key={t} className="bg-black/40 border border-white/5 rounded p-3 text-center">
                            <span className="block text-xs font-bold text-gray-300 mb-2">{t}</span>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-success h-full" style={{width: `${Math.random() * 100}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Topics Grid */}
            <div className="grid grid-cols-3 gap-6">
                {dsaTopics.map((topic, i) => (
                    <div key={i} className="glass-card p-5 hover:bg-white/5 transition flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-white">{topic}</h3>
                            </div>
                            <div className="flex gap-2 mb-4">
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-success/10 text-success">E: 0</span>
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-warning/10 text-warning">M: 0</span>
                                <span className="text-[10px] font-bold px-2 py-1 rounded bg-red-500/10 text-red-500">H: 0</span>
                            </div>
                        </div>
                        <NoteActions subject="DSA" topic={topic} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default DSAView;
