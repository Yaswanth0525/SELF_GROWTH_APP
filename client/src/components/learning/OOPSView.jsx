import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Database, CheckCircle, Clock, FileText, Briefcase } from 'lucide-react';

const oopsTopics = [
    'Classes & Objects', 'Constructors', 'Destructors', 'Encapsulation', 'Abstraction', 
    'Inheritance', 'Polymorphism', 'Method Overloading', 'Method Overriding', 'Interfaces', 
    'Association', 'Aggregation', 'Composition', 'SOLID Principles'
];

const NoteActions = ({ subject, topic }) => (
    <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/5">
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=notes`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-primary/20 text-gray-300 hover:text-primary rounded transition">
            <FileText size={12}/> Notes
        </Link>
        <Link to={`/notes?subject=${subject}&topic=${topic}&type=interview`} className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 bg-white/5 hover:bg-info/20 text-gray-300 hover:text-info rounded transition">
            <Briefcase size={12}/> Interview Qs
        </Link>
    </div>
);

const OOPSView = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            
            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-2 glass-card p-6 flex flex-col justify-center border-l-4 border-info">
                    <h1 className="text-3xl font-black uppercase tracking-tight text-white flex items-center">
                        <Database size={28} className="mr-3 text-info" /> OOPS
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">Object Oriented Programming Concepts.</p>
                </div>
                
                <div className="glass-card p-4 flex flex-col justify-center items-center">
                    <span className="text-3xl font-black text-info">42%</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Interview Readiness</span>
                </div>
                <div className="glass-card p-4 flex flex-col justify-center items-center">
                    <span className="text-3xl font-black text-white">8/14</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Concepts Mastered</span>
                </div>
            </div>

            {/* Concept Dependency Flow */}
            <div className="glass-card p-8">
                <h3 className="text-sm font-bold uppercase text-white mb-8 text-center tracking-widest">Concept Dependency Flow</h3>
                <div className="flex justify-center items-center gap-4 text-xs font-bold text-gray-300">
                    <span className="px-4 py-2 bg-success/20 text-success rounded border border-success/30">Classes</span>
                    <span className="text-gray-600">→</span>
                    <span className="px-4 py-2 bg-success/20 text-success rounded border border-success/30">Objects</span>
                    <span className="text-gray-600">→</span>
                    <span className="px-4 py-2 bg-warning/20 text-warning rounded border border-warning/30">Inheritance</span>
                    <span className="text-gray-600">→</span>
                    <span className="px-4 py-2 bg-white/5 rounded border border-white/10 text-gray-500">Polymorphism</span>
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {oopsTopics.map((topic, i) => (
                    <div key={i} className="glass-card p-5 flex flex-col justify-between hover:bg-white/5 transition">
                        <div>
                            <h3 className="font-bold text-white text-md mb-2">{topic}</h3>
                        </div>
                        <NoteActions subject="OOPS" topic={topic} />
                    </div>
                ))}
            </div>

        </motion.div>
    );
};

export default OOPSView;
