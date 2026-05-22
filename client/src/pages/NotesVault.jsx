import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Plus, Book, Trash2, X } from 'lucide-react';
import API from '../api/axios';

const categories = ['All Notes', 'Aptitude', 'DSA', 'OOPS', 'Operating Systems', 'DBMS', 'Communication', 'Interview'];

const NotesVault = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSubject = queryParams.get('subject') || 'All Notes';
    const initialTopic = queryParams.get('topic') || '';
    const initialType = queryParams.get('type') || '';

    const [notes, setNotes] = useState([]);
    const [activeCategory, setActiveCategory] = useState(initialSubject);
    const [search, setSearch] = useState(initialTopic);
    const [showForm, setShowForm] = useState(initialType !== '');
    
    const [newTitle, setNewTitle] = useState(initialTopic ? `${initialTopic} - ${initialType}` : '');
    const [newSnippet, setNewSnippet] = useState('');

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await API.get('/notes');
                setNotes(data);
            } catch(e) { console.error(e) }
        };
        fetchNotes();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/notes', { 
                title: newTitle, 
                snippet: newSnippet, 
                category: activeCategory === 'All Notes' ? 'DSA' : activeCategory 
            });
            setNotes([data, ...notes]);
            setShowForm(false);
            setNewTitle('');
            setNewSnippet('');
        } catch(e) { console.error(e) }
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        try {
            await API.delete(`/notes/${id}`);
            setNotes(notes.filter(n => n._id !== id));
        } catch(e) { console.error(e) }
    };

    const filteredNotes = notes.filter(n => 
        (activeCategory === 'All Notes' || n.category === activeCategory) &&
        (n.title.toLowerCase().includes(search.toLowerCase()) || n.snippet.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-4rem)] flex gap-6 pb-6 relative">
            
            {/* Sidebar Categories */}
            <div className="w-64 glass-card p-4 flex flex-col h-full">
                <h2 className="font-bold text-lg mb-6 text-primary flex items-center"><Book size={18} className="mr-2" /> Vault Folders</h2>
                <div className="space-y-1 flex-1 overflow-y-auto">
                    {categories.map(cat => (
                        <div 
                            key={cat} 
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-2 rounded cursor-pointer text-sm font-medium transition ${activeCategory === cat ? 'bg-primary/20 text-primary border-l-2 border-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-black uppercase tracking-tight">{activeCategory}</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input 
                                type="text" 
                                placeholder="Search notes..." 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64 text-white"
                            />
                        </div>
                        <button onClick={() => setShowForm(true)} className="bg-primary text-black font-bold px-4 py-2 rounded-lg flex items-center hover:scale-105 transition">
                            <Plus size={16} className="mr-1" /> New Note
                        </button>
                    </div>
                </div>

                {/* Notes Grid */}
                <div className="grid grid-cols-3 gap-6 overflow-y-auto pr-2 pb-10">
                    {filteredNotes.length === 0 ? (
                        <div className="col-span-3 text-center py-20 text-gray-500">No notes found in this category.</div>
                    ) : (
                        filteredNotes.map(note => (
                            <motion.div key={note._id} whileHover={{ y: -5 }} className="glass-card p-5 flex flex-col border-t-2 border-transparent hover:border-primary transition group cursor-pointer h-48">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded bg-white/5 text-gray-400">{note.category}</span>
                                    <button onClick={(e) => handleDelete(note._id, e)} className="text-gray-600 hover:text-red-500 transition opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
                                </div>
                                <h3 className="font-bold text-lg text-white mb-2 line-clamp-1">{note.title}</h3>
                                <p className="text-sm text-gray-400 line-clamp-3 flex-1">{note.snippet}</p>
                                <div className="text-[10px] text-gray-600 mt-4 border-t border-white/5 pt-2">{new Date(note.createdAt).toLocaleDateString()}</div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Modal */}
            {showForm && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
                    <form onSubmit={handleCreate} className="glass-card p-8 w-[500px]">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Create Note in <span className="text-primary">{activeCategory === 'All Notes' ? 'DSA' : activeCategory}</span></h2>
                            <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
                        </div>
                        <input 
                            type="text" 
                            required 
                            placeholder="Note Title" 
                            className="w-full bg-black/40 border border-white/10 rounded p-3 text-white mb-4 focus:outline-none focus:border-primary"
                            value={newTitle} onChange={e => setNewTitle(e.target.value)}
                        />
                        <textarea 
                            required 
                            placeholder="Start typing your notes here..." 
                            rows={6}
                            className="w-full bg-black/40 border border-white/10 rounded p-3 text-white mb-6 focus:outline-none focus:border-primary"
                            value={newSnippet} onChange={e => setNewSnippet(e.target.value)}
                        ></textarea>
                        <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-yellow-400 transition">Save Note</button>
                    </form>
                </div>
            )}
        </motion.div>
    );
};

export default NotesVault;
