import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Circle, Clock, Map as MapIcon, ChevronDown, ChevronUp, Search, Filter, Star, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

const initialRoadmapData = [
    {
        id: 1,
        phase: 'Phase 1: Foundations',
        progress: 0,
        categories: [
            {
                name: 'Programming Fundamentals',
                topics: [
                    { name: 'Variables', status: 'pending', xp: 10, revisions: 0, estHours: 1 },
                    { name: 'Data Types', status: 'pending', xp: 10, revisions: 0, estHours: 1 },
                    { name: 'Operators', status: 'pending', xp: 10, revisions: 0, estHours: 1 },
                    { name: 'Loops', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Functions', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Arrays Basics', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Strings Basics', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Pointers', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                    { name: 'Memory Concepts', status: 'pending', xp: 25, revisions: 0, estHours: 2 },
                ]
            },
            {
                name: 'Mathematics & Logic',
                topics: [
                    { name: 'Basic Mathematics', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Number System', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Percentages', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Ratios', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Averages', status: 'pending', xp: 10, revisions: 0, estHours: 1 },
                    { name: 'Time & Work', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Time Speed Distance', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Probability', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Permutation & Combination', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Logical Thinking', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                ]
            },
            {
                name: 'Complexity Analysis',
                topics: [
                    { name: 'Time Complexity', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Space Complexity', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Big O Notation', status: 'pending', xp: 15, revisions: 0, estHours: 1 },
                    { name: 'Best Case', status: 'pending', xp: 10, revisions: 0, estHours: 1 },
                    { name: 'Average Case', status: 'pending', xp: 10, revisions: 0, estHours: 1 },
                    { name: 'Worst Case', status: 'pending', xp: 10, revisions: 0, estHours: 1 },
                ]
            }
        ]
    },
    {
        id: 2,
        phase: 'Phase 2: Core DSA',
        progress: 0,
        categories: [
            {
                name: 'Arrays',
                topics: [
                    { name: 'Traversal', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Prefix Sum', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Kadane Algorithm', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                    { name: 'Two Pointer', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Sliding Window', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                ]
            },
            {
                name: 'Strings',
                topics: [
                    { name: 'String Manipulation', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Hashing', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Pattern Matching', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Rabin Karp', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                    { name: 'KMP', status: 'pending', xp: 40, revisions: 0, estHours: 4 },
                ]
            },
            {
                name: 'Linked List',
                topics: [
                    { name: 'Singly Linked List', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Doubly Linked List', status: 'pending', xp: 25, revisions: 0, estHours: 2 },
                    { name: 'Circular Linked List', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                ]
            },
            {
                name: 'Stack & Queue',
                topics: [
                    { name: 'Monotonic Stack', status: 'pending', xp: 35, revisions: 0, estHours: 4 },
                    { name: 'Stack Applications', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Circular Queue', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Deque', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                ]
            },
            {
                name: 'Trees & Graphs',
                topics: [
                    { name: 'Binary Tree', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'BST', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                    { name: 'Traversals', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Lowest Common Ancestor', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                    { name: 'BFS & DFS', status: 'pending', xp: 35, revisions: 0, estHours: 4 },
                    { name: 'Topological Sort', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                    { name: 'Shortest Path', status: 'pending', xp: 40, revisions: 0, estHours: 4 },
                    { name: 'MST', status: 'pending', xp: 40, revisions: 0, estHours: 4 },
                    { name: 'Union Find', status: 'pending', xp: 35, revisions: 0, estHours: 3 },
                ]
            },
            {
                name: 'Advanced',
                topics: [
                    { name: 'Greedy', status: 'pending', xp: 35, revisions: 0, estHours: 4 },
                    { name: 'Dynamic Programming', status: 'pending', xp: 50, revisions: 0, estHours: 10 },
                    { name: 'Trie', status: 'pending', xp: 35, revisions: 0, estHours: 4 },
                    { name: 'Segment Tree', status: 'pending', xp: 45, revisions: 0, estHours: 5 },
                    { name: 'Bit Manipulation', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                ]
            }
        ]
    },
    {
        id: 3,
        phase: 'Phase 3: Core CS Subjects',
        progress: 0,
        categories: [
            {
                name: 'OOPS',
                topics: [
                    { name: 'Classes & Objects', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Constructors & Destructor', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Encapsulation', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Abstraction', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'Inheritance', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Polymorphism', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Interfaces', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                    { name: 'SOLID Principles', status: 'pending', xp: 30, revisions: 0, estHours: 3 },
                ]
            },
            {
                name: 'Operating Systems',
                topics: [
                    { name: 'Processes & Threads', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Scheduling', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Synchronization & Semaphores', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'Deadlocks', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Paging & Segmentation', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Virtual Memory', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'File Systems', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                ]
            },
            {
                name: 'DBMS',
                topics: [
                    { name: 'ER & Relational Model', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'SQL & Joins', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'Normalization', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Transactions & ACID', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Concurrency Control', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Indexing & Optimization', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                ]
            },
            {
                name: 'Computer Networks',
                topics: [
                    { name: 'OSI Model', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'TCP/IP', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'HTTP & HTTPS', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'DNS & Routing', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Switching & TCP vs UDP', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                ]
            }
        ]
    },
    {
        id: 4,
        phase: 'Phase 4: Development',
        progress: 0,
        categories: [
            {
                name: 'Frontend',
                topics: [
                    { name: 'HTML & CSS', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'JavaScript & ES6+', status: 'pending', xp: 30, revisions: 0, estHours: 5 },
                    { name: 'React & Router', status: 'pending', xp: 35, revisions: 0, estHours: 5 },
                    { name: 'State Management', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'Tailwind CSS', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                ]
            },
            {
                name: 'Backend',
                topics: [
                    { name: 'Node.js & Express.js', status: 'pending', xp: 35, revisions: 0, estHours: 5 },
                    { name: 'REST APIs', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Authentication & JWT', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                ]
            },
            {
                name: 'Database & DevOps',
                topics: [
                    { name: 'MongoDB & Mongoose', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'Git & GitHub', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'AWS Basics (EC2, S3)', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'CI/CD Basics', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                ]
            }
        ]
    },
    {
        id: 5,
        phase: 'Phase 5: Placement Preparation',
        progress: 0,
        categories: [
            {
                name: 'Aptitude & Reasoning',
                topics: [
                    { name: 'Quantitative Aptitude', status: 'pending', xp: 40, revisions: 0, estHours: 10 },
                    { name: 'Logical Reasoning', status: 'pending', xp: 30, revisions: 0, estHours: 8 },
                    { name: 'Verbal Ability', status: 'pending', xp: 30, revisions: 0, estHours: 6 },
                ]
            },
            {
                name: 'Interview Prep',
                topics: [
                    { name: 'Self Introduction & HR', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Behavioral (STAR Method)', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'Mock Interviews', status: 'pending', xp: 50, revisions: 0, estHours: 5 },
                ]
            },
            {
                name: 'Resume',
                topics: [
                    { name: 'Resume Building', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                    { name: 'LinkedIn Optimization', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                ]
            }
        ]
    },
    {
        id: 6,
        phase: 'Phase 6: Professional Growth',
        progress: 0,
        categories: [
            {
                name: 'Communication',
                topics: [
                    { name: 'Public Speaking', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Presentation Skills', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Professional Email Writing', status: 'pending', xp: 15, revisions: 0, estHours: 2 },
                ]
            },
            {
                name: 'System Design',
                topics: [
                    { name: 'Scalability Basics', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'Load Balancing & Caching', status: 'pending', xp: 30, revisions: 0, estHours: 4 },
                    { name: 'Microservices', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                ]
            },
            {
                name: 'Deloitte Preparation',
                topics: [
                    { name: 'Deloitte Training Notes', status: 'pending', xp: 25, revisions: 0, estHours: 3 },
                    { name: 'Analyst Trainee Skills', status: 'pending', xp: 20, revisions: 0, estHours: 3 },
                    { name: 'Corporate Readiness', status: 'pending', xp: 20, revisions: 0, estHours: 2 },
                ]
            }
        ]
    }
];

const calculateProgress = (topics) => {
    if (!topics || topics.length === 0) return 0;
    const completed = topics.filter(t => t.status === 'completed').length;
    return Math.round((completed / topics.length) * 100);
};

const Roadmap = () => {
    const [roadmap, setRoadmap] = useState(initialRoadmapData);
    const [expandedPhases, setExpandedPhases] = useState([1]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        const fetchRoadmap = async () => {
            try {
                const { data } = await API.get('/roadmap');
                
                // Merge db data into initial blueprint
                setRoadmap(prev => {
                    const next = JSON.parse(JSON.stringify(initialRoadmapData));
                    next.forEach(phase => {
                        let totalTopics = 0;
                        let completedTopics = 0;
                        phase.categories.forEach(cat => {
                            cat.topics.forEach(topic => {
                                const dbTopic = data.find(d => d.topicName === topic.name);
                                if (dbTopic) {
                                    topic.status = dbTopic.status;
                                    topic.revisions = dbTopic.revisions;
                                    topic.estHours = dbTopic.estHours;
                                }
                                totalTopics++;
                                if (topic.status === 'completed') completedTopics++;
                            });
                        });
                        phase.progress = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
                    });
                    return next;
                });
            } catch(e) { console.error(e) }
        };
        fetchRoadmap();
    }, []);

    const togglePhase = (id) => {
        setExpandedPhases(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
    };

    const handleTopicUpdate = async (phaseId, catIndex, topicIndex, newStatus, isRevision = false) => {
        const next = [...roadmap];
        const phase = next.find(p => p.id === phaseId);
        const category = phase.categories[catIndex];
        const topic = category.topics[topicIndex];
        
        if (!isRevision) topic.status = newStatus;
        if (isRevision) topic.revisions += 1;

        // Recalculate phase progress
        let totalTopics = 0;
        let completedTopics = 0;
        phase.categories.forEach(c => {
            totalTopics += c.topics.length;
            completedTopics += c.topics.filter(t => t.status === 'completed').length;
        });
        phase.progress = Math.round((completedTopics / totalTopics) * 100);
        
        setRoadmap(next);

        try {
            await API.put('/roadmap/topic', {
                phaseId,
                categoryName: category.name,
                topicName: topic.name,
                status: topic.status,
                xp: topic.xp,
                estHours: topic.estHours,
                isRevision
            });
        } catch(e) { console.error(e) }
    };

    const totalProgress = useMemo(() => {
        let completed = 0;
        let total = 0;
        roadmap.forEach(p => {
            p.categories.forEach(c => {
                total += c.topics.length;
                completed += c.topics.filter(t => t.status === 'completed').length;
            });
        });
        return total > 0 ? Math.round((completed / total) * 100) : 0;
    }, [roadmap]);

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-screen-xl mx-auto space-y-8 pb-10">
            {/* Header */}
            <div className="flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl font-black uppercase tracking-tight flex items-center"><MapIcon size={32} className="mr-3 text-primary" /> Career Roadmap</h1>
                    <p className="text-gray-400 mt-2">Your complete software engineering journey to professional growth.</p>
                </div>
                <div className="glass-card px-6 py-3 flex flex-col items-center border-t-2 border-success">
                    <span className="text-xl font-bold text-success">{totalProgress}%</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total Completion</span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search roadmap topics..." 
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-primary text-white"
                    />
                </div>
                <div className="relative">
                    <Filter size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                    <select 
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                        className="appearance-none bg-black/40 border border-white/10 rounded-lg pl-10 pr-8 py-3 text-sm focus:outline-none focus:border-primary text-white cursor-pointer"
                    >
                        <option value="all">All Status</option>
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="pending">Not Started</option>
                    </select>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-white/10 ml-6 pl-8 space-y-12">
                {roadmap.map((phase) => {
                    const isExpanded = expandedPhases.includes(phase.id);
                    
                    const filteredCategories = phase.categories.map(cat => ({
                        ...cat,
                        topics: cat.topics.filter(t => {
                            const matchQuery = t.name.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchStatus = statusFilter === 'all' || t.status === statusFilter;
                            return matchQuery && matchStatus;
                        })
                    })).filter(cat => cat.topics.length > 0);

                    if ((searchQuery || statusFilter !== 'all') && filteredCategories.length === 0) return null;

                    return (
                        <div key={phase.id} className="relative">
                            <div className={`absolute -left-[41px] top-0 w-6 h-6 rounded-full border-4 border-background flex items-center justify-center ${phase.progress === 100 ? 'bg-success' : phase.progress > 0 ? 'bg-warning' : 'bg-gray-600'}`}>
                                {phase.progress === 100 && <CheckCircle size={12} className="text-background" />}
                            </div>
                            
                            <div className="glass-card border-t-2 border-transparent hover:border-primary transition overflow-hidden">
                                <div 
                                    className="p-6 cursor-pointer flex justify-between items-center bg-black/20 hover:bg-black/40 transition"
                                    onClick={() => togglePhase(phase.id)}
                                >
                                    <div>
                                        <h2 className="text-xl font-bold text-white uppercase">{phase.phase}</h2>
                                        <div className="flex items-center gap-4 mt-2">
                                            <div className="w-48 bg-black/60 h-2 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary" style={{width: `${phase.progress}%`}}></div>
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-400">{phase.progress}%</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-400">
                                        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="p-6 pt-0 space-y-8"
                                        >
                                            {filteredCategories.map((cat, catIndex) => {
                                                const catProgress = calculateProgress(cat.topics);
                                                return (
                                                    <div key={cat.name} className="mt-6 border-l border-white/5 pl-4">
                                                        <div className="flex justify-between items-end mb-4">
                                                            <h3 className="text-md font-bold text-primary uppercase tracking-wider">{cat.name}</h3>
                                                            <span className="text-[10px] text-gray-500 font-bold">{catProgress}% Done</span>
                                                        </div>
                                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                            {cat.topics.map((topic, topicIndex) => (
                                                                <div key={topic.name} className="flex flex-col p-4 bg-black/40 rounded-lg border border-white/5 hover:bg-white/5 transition group">
                                                                    
                                                                    <div className="flex items-center justify-between mb-3">
                                                                        <div className="flex items-center gap-3">
                                                                            <button onClick={() => handleTopicUpdate(phase.id, catIndex, topicIndex, topic.status === 'completed' ? 'pending' : 'completed')}>
                                                                                {topic.status === 'completed' ? <CheckCircle size={20} className="text-success" /> : topic.status === 'in-progress' ? <Clock size={20} className="text-warning" /> : <Circle size={20} className="text-gray-600 hover:text-white" />}
                                                                            </button>
                                                                            <span className={`text-sm font-bold ${topic.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-200'}`}>{topic.name}</span>
                                                                        </div>
                                                                        <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded">+{topic.xp} XP</span>
                                                                    </div>

                                                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                                                                        <div className="flex items-center gap-4">
                                                                            <select 
                                                                                value={topic.status}
                                                                                onChange={(e) => handleTopicUpdate(phase.id, catIndex, topicIndex, e.target.value)}
                                                                                className="text-[10px] bg-transparent text-gray-400 focus:outline-none cursor-pointer uppercase font-bold"
                                                                            >
                                                                                <option value="pending">Not Started</option>
                                                                                <option value="in-progress">In Progress</option>
                                                                                <option value="completed">Completed</option>
                                                                            </select>
                                                                            
                                                                            <span className="text-[10px] text-gray-500 flex items-center gap-1" title="Estimated Hours">
                                                                                <Clock size={12} /> {topic.estHours}h
                                                                            </span>
                                                                        </div>

                                                                        <div className="flex items-center gap-3">
                                                                            <button onClick={() => handleTopicUpdate(phase.id, catIndex, topicIndex, topic.status, true)} className="text-[10px] text-gray-500 hover:text-warning flex items-center gap-1 transition" title="Add Revision">
                                                                                <Star size={12} className={topic.revisions > 0 ? "text-warning" : ""} /> Rev: {topic.revisions}
                                                                            </button>
                                                                            <Link to={`/notes?category=${cat.name}`} className="text-[10px] text-gray-500 hover:text-info flex items-center gap-1 transition">
                                                                                <FileText size={12} /> Notes
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default Roadmap;
