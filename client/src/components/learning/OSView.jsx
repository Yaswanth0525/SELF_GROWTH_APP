import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Server, FileText, MessageSquare, Book, AlertCircle } from 'lucide-react';

const osTopics = [
    'Processes', 'Threads', 'CPU Scheduling', 'Synchronization', 'Semaphores', 
    'Deadlocks', 'Paging', 'Segmentation', 'Virtual Memory', 'File Systems', 
    'Disk Scheduling', 'System Calls'
];

const NoteActions = ({ subject, topic }) => (
    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=notes`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-300 hover:text-primary rounded transition">
            <FileText size={12}/> Notes
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=important`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-accent/20 text-gray-300 hover:text-accent rounded transition">
            <AlertCircle size={12}/> Important Pts
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=interview`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-info/20 text-gray-300 hover:text-info rounded transition">
            <MessageSquare size={12}/> Interview Qs
        </Link>
    </div>
);

const OSView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-5 glass-card p-6 flex flex-col justify-center border-l-4 border-[#9C27B0]">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center">
                        <Server size={28} className="mr-3 text-[#9C27B0]" /> Operating Systems
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Deep dive into core OS principles.</p>
                </div>
                
                <div className="col-span-7 grid grid-cols-3 gap-6">
                    <div className="glass-card p-4 flex flex-col justify-center items-center text-center">
                        <span className="text-2xl font-black text-white">4/12</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Topics</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col justify-center items-center text-center">
                        <span className="text-2xl font-black text-[#9C27B0]">18</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Revisions</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col justify-center items-center text-center relative overflow-hidden">
                        <div className="absolute bottom-0 w-full bg-[#9C27B0]/20 h-1/3"></div>
                        <span className="text-2xl font-black text-white z-10">35%</span>
                        <span className="text-[10px] font-bold text-[#9C27B0] uppercase tracking-widest mt-1 z-10">Readiness</span>
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="glass-card p-6 border-l-2 border-warning">
                <h3 className="text-sm font-bold uppercase text-white mb-4 flex items-center"><MessageSquare size={16} className="mr-2 text-warning"/> Frequently Asked Interview Questions</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-start gap-2"><span className="text-warning">Q:</span> What is the difference between a process and a thread?</li>
                    <li className="flex items-start gap-2"><span className="text-warning">Q:</span> Explain the conditions for Deadlock.</li>
                    <li className="flex items-start gap-2"><span className="text-warning">Q:</span> What is Virtual Memory and how is it implemented?</li>
                </ul>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {osTopics.map((topic, i) => (
                    <div key={i} className="glass-card p-5 flex flex-col justify-between hover:bg-white/5 transition">
                        <h3 className="font-bold text-white text-md mb-4">{topic}</h3>
                        <NoteActions subject="OS" topic={topic} />
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default OSView;
