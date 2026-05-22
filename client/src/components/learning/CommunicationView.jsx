import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, FileText, CheckCircle, Mic, Clock } from 'lucide-react';

const commTopics = [
    'Self Introduction', 'HR Questions', 'Behavioral Questions', 'STAR Method', 
    'Group Discussion', 'Presentation Skills', 'Public Speaking', 
    'Professional Communication', 'Email Writing', 'Vocabulary Building', 'Mock Interviews'
];

const NoteActions = ({ subject, topic }) => (
    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=interview`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-info/20 text-gray-300 hover:text-info rounded transition">
            <Mic size={12}/> Prepare Scripts
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=notes`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-300 hover:text-primary rounded transition">
            <FileText size={12}/> Notes
        </Link>
    </div>
);

const CommunicationView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1 glass-card p-6 flex flex-col justify-center border-l-4 border-[#00BCD4]">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center">
                        <MessageSquare size={28} className="mr-3 text-[#00BCD4]" /> Communication
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Professional HR & Interview Prep.</p>
                </div>
                
                <div className="col-span-2 grid grid-cols-4 gap-4">
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-white">14</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Practice Sessions</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-[#00BCD4]">3</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Mock Interviews</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-success/10"></div>
                        <span className="text-2xl font-black text-success z-10">85%</span>
                        <span className="text-[10px] text-success uppercase font-bold tracking-widest mt-1 z-10">Comm Score</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-warning">90%</span>
                        <span className="text-[10px] text-warning uppercase tracking-widest mt-1 font-bold">Confidence</span>
                    </div>
                </div>
            </div>

            {/* HR Trackers */}
            <div className="grid grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col">
                    <h3 className="font-bold text-sm uppercase text-white mb-4">Self Introduction</h3>
                    <p className="text-xs text-gray-400 mb-4 flex-1">Is your 60-second elevator pitch ready, rehearsed, and recorded?</p>
                    <button className="bg-success/20 text-success py-2 rounded text-xs font-bold border border-success/30 flex justify-center items-center"><CheckCircle size={14} className="mr-2"/> Prepared</button>
                </div>
                <div className="glass-card p-6 flex flex-col">
                    <h3 className="font-bold text-sm uppercase text-white mb-4">STAR Method</h3>
                    <p className="text-xs text-gray-400 mb-4 flex-1">Situation, Task, Action, Result. Have you mapped your experiences?</p>
                    <button className="bg-warning/20 text-warning py-2 rounded text-xs font-bold border border-warning/30 flex justify-center items-center"><Clock size={14} className="mr-2"/> Drafting</button>
                </div>
                <div className="glass-card p-6 flex flex-col">
                    <h3 className="font-bold text-sm uppercase text-white mb-4">Top 10 HR Qs</h3>
                    <p className="text-xs text-gray-400 mb-4 flex-1">"Why should we hire you?" "What are your weaknesses?"</p>
                    <button className="bg-white/10 text-gray-300 py-2 rounded text-xs font-bold border border-white/20 flex justify-center items-center">Start Preparing</button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
                {commTopics.map((topic, i) => (
                    <div key={i} className="glass-card p-5 flex flex-col justify-between hover:bg-white/5 transition">
                        <h3 className="font-bold text-white text-md mb-4">{topic}</h3>
                        <NoteActions subject="Communication" topic={topic} />
                    </div>
                ))}
            </div>

        </motion.div>
    );
};

export default CommunicationView;
