import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Target, 
  Code2, 
  Database, 
  Server, 
  Monitor, 
  MessageSquare, 
  BookOpen, 
  Map, 
  Award, 
  BarChart, 
  User
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: Home, path: '/' },
  { name: 'Aptitude', icon: Target, path: '/learning/aptitude' },
  { name: 'DSA', icon: Code2, path: '/learning/dsa' },
  { name: 'OOPS', icon: Database, path: '/learning/oops' },
  { name: 'Operating Systems', icon: Server, path: '/learning/os' },
  { name: 'DBMS', icon: Monitor, path: '/learning/dbms' },
  { name: 'Communication', icon: MessageSquare, path: '/learning/communication' },
  { name: 'Notes Vault', icon: BookOpen, path: '/notes' },
  { name: 'Roadmap', icon: Map, path: '/roadmap' },
  { name: 'Achievements', icon: Award, path: '/achievements' },
  { name: 'Analytics', icon: BarChart, path: '/analytics' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-card h-full border-r border-white/10 flex flex-col pt-8">
      <div className="px-6 mb-10">
        <h1 className="text-2xl font-bold tracking-wider text-primary">GROWTH<span className="text-white">OS</span></h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">No Excuses. Just Progress.</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-2 no-scrollbar pb-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link to={item.path} key={item.name}>
              <motion.div 
                whileHover={{ x: 5 }}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-primary' : 'text-gray-500'} />
                <span className="font-medium text-sm">{item.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User Profile at Bottom */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <User size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-white">B . Yaswanth</p>
            <p className="text-[10px] text-gray-400">Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
