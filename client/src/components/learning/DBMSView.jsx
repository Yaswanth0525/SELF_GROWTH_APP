import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Monitor, FileText, Book, Database, CheckCircle } from 'lucide-react';

const dbmsTopics = [
    'ER Model', 'Relational Model', 'SQL Basics', 'Joins', 'Normalization', 
    'Transactions', 'ACID Properties', 'Concurrency Control', 'Indexing', 
    'B+ Trees', 'Query Optimization', 'Stored Procedures', 'Triggers', 'Views'
];

const NoteActions = ({ subject, topic }) => (
    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=notes`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-300 hover:text-primary rounded transition">
            <FileText size={12}/> Notes
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=revision`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-warning/20 text-gray-300 hover:text-warning rounded transition">
            <Book size={12}/> Revision
        </Link>
    </div>
);

const DBMSView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 glass-card p-6 flex flex-col justify-center border-l-4 border-[#FF5722]">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center">
                        <Monitor size={28} className="mr-3 text-[#FF5722]" /> DBMS
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Database Management Systems mastery.</p>
                </div>
                
                <div className="col-span-8 glass-card p-6 grid grid-cols-4 gap-6 text-center">
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Concepts</span>
                        <span className="text-3xl font-black text-white">4/14</span>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-[#FF5722] uppercase tracking-widest block mb-1">SQL Solved</span>
                        <span className="text-3xl font-black text-white">45</span>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Revisions</span>
                        <span className="text-3xl font-black text-white">12</span>
                    </div>
                    <div>
                        <span className="text-[10px] font-bold text-success uppercase tracking-widest block mb-1">Readiness</span>
                        <span className="text-3xl font-black text-white">60%</span>
                    </div>
                </div>
            </div>

            {/* SQL Practice Tracker */}
            <div className="glass-card p-6">
                <h3 className="text-sm font-bold uppercase text-white mb-6 flex items-center"><Database size={16} className="mr-2 text-[#FF5722]"/> SQL Practice Tracker</h3>
                <div className="grid grid-cols-4 gap-4">
                    {['Joins', 'Normalization', 'Transactions', 'Indexing'].map(t => (
                        <div key={t} className="bg-black/40 border border-white/5 rounded p-4 flex justify-between items-center">
                            <span className="text-sm font-bold text-gray-300">{t}</span>
                            <CheckCircle size={18} className="text-success" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {dbmsTopics.map((topic, i) => (
                    <div key={i} className="glass-card p-5 flex flex-col justify-between hover:bg-white/5 transition">
                        <h3 className="font-bold text-white text-md mb-4">{topic}</h3>
                        <NoteActions subject="DBMS" topic={topic} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default DBMSView;
