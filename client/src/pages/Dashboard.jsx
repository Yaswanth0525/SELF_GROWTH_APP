import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axios';
import { Play, Pause, Square, CheckCircle, Circle, Flame, Star, Trophy } from 'lucide-react';

const SvgRing = ({ progress, color }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
    return (
        <div className="relative w-12 h-12 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="24" cy="24" r={radius} stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="transparent" />
                <circle cx="24" cy="24" r={radius} stroke={color} strokeWidth="4" fill="transparent"
                    strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} className="transition-all duration-1000 ease-out" />
            </svg>
            <span className="absolute text-[10px] font-bold">{progress}%</span>
        </div>
    );
};

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [streak, setStreak] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Timer state
  const [selectedMinutes, setSelectedMinutes] = useState(45);
  const [timeLeft, setTimeLeft] = useState(selectedMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  // New task/mission state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [missionInputs, setMissionInputs] = useState({ Primary: '', Secondary: '', Bonus: '' });

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      handleSessionComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
      if (!isActive) {
          setTimeLeft(selectedMinutes * 60);
      }
  }, [selectedMinutes]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => { setIsActive(false); setTimeLeft(selectedMinutes * 60); };

  const handleSessionComplete = async () => {
    try {
        await API.post('/focus', { durationMinutes: selectedMinutes });
        fetchDashboardData();
    } catch(e) { console.error(e) }
  };

  const fetchDashboardData = async () => {
    try {
      const [tasksRes, streakRes] = await Promise.all([
        API.get('/tasks'),
        API.get('/streaks')
      ]);
      setTasks(tasksRes.data);
      setStreak(streakRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  const handleCompleteTask = async (id) => {
    try {
      const { data } = await API.put(`/tasks/${id}/complete`);
      setTasks(tasks.map(t => t._id === id ? data.task : t));
      if(user) { user.xp = data.xp; user.level = data.level; }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (e, isMission = false, priority = 'Normal') => {
    if (e) e.preventDefault();
    const title = isMission ? missionInputs[priority] : newTaskTitle;
    if (!title.trim()) return;

    let xpReward = 10;
    if (priority === 'Primary') xpReward = 50;
    if (priority === 'Secondary') xpReward = 30;
    if (priority === 'Bonus') xpReward = 20;

    try {
      const { data } = await API.post('/tasks', {
        title,
        category: 'Other',
        duration: 30,
        xpReward,
        priority
      });
      setTasks([...tasks, data]);
      if (isMission) {
          setMissionInputs({...missionInputs, [priority]: ''});
      } else {
          setNewTaskTitle('');
      }
    } catch (error) {
      alert('Failed to add task');
    }
  };

  if (loading) return <div className="flex h-full items-center justify-center">Loading interface...</div>;

  const missions = tasks.filter(t => t.priority !== 'Normal');
  const planTasks = tasks.filter(t => t.priority === 'Normal');
  
  const getMission = (priority) => missions.find(m => m.priority === priority);

  const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const calcProgress = (cat) => {
      const catTasks = tasks.filter(t => t.category === cat);
      if (catTasks.length === 0) return 0;
      return Math.round((catTasks.filter(t => t.completed).length / catTasks.length) * 100);
  };

  return (
    <div className="flex flex-col gap-6 max-w-screen-2xl mx-auto pb-10">
      
      {/* Top Header Row */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div>
              <h2 className="text-xl font-bold text-white">Good Morning, {user?.name}!</h2>
              <p className="text-sm text-gray-400">Today's Mission: <span className="text-primary font-bold">Be 1% better than yesterday.</span></p>
          </div>
          <div className="flex gap-4">
              <div className="glass-card px-4 py-2 flex items-center gap-2 border-warning/30">
                  <Flame size={16} className="text-warning" />
                  <span className="font-bold text-sm">{streak?.currentStreak || 0} Day Streak</span>
              </div>
              <button onClick={logout} className="text-xs text-gray-500 hover:text-white">Logout</button>
          </div>
      </div>

      {/* Main Grid: 3 columns */}
      <div className="grid grid-cols-12 gap-6">
          
          {/* Column 1: Subjects */}
          <div className="col-span-3 space-y-3">
              {[
                  { name: 'Aptitude', desc: 'Sharpen your logic.', color: '#FFC107' },
                  { name: 'DSA', desc: 'Solve problems.', color: '#4CAF50' },
                  { name: 'OOPS', desc: 'Code with clarity.', color: '#2196F3' },
                  { name: 'OS', desc: 'Learn processes.', color: '#9C27B0' },
                  { name: 'DBMS', desc: 'Work with data.', color: '#FF5722' },
                  { name: 'Communication', desc: 'Express ideas.', color: '#00BCD4' }
              ].map(s => (
                  <div key={s.name} className="glass-card p-3 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer border-l-4" style={{borderLeftColor: s.color}}>
                      <div>
                          <h4 className="text-sm font-bold uppercase" style={{color: s.color}}>{s.name}</h4>
                          <p className="text-[10px] text-gray-400">{s.desc}</p>
                      </div>
                      <SvgRing progress={calcProgress(s.name)} color={s.color} />
                  </div>
              ))}
          </div>

          {/* Column 2: Center Content */}
          <div className="col-span-6 flex flex-col gap-6">
              {/* Hero Title */}
              <div className="text-center py-4">
                  <Trophy size={32} className="text-primary mx-auto mb-2" />
                  <h1 className="text-5xl font-extrabold tracking-tighter text-white uppercase drop-shadow-lg leading-none">
                      Daily Discipline<br/>
                      <span className="text-primary">Builds My Future</span>
                  </h1>
                  <p className="text-xs text-gray-400 tracking-[0.2em] mt-3 uppercase font-bold">
                      Study Today. <span className="text-success px-2">Grow Tomorrow.</span> Achieve Forever.
                  </p>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-4 gap-4">
                  <div className="glass-card p-4 flex flex-col items-center justify-center border border-accent/20">
                      <span className="text-accent font-black text-2xl">{user?.level || 1}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Lvl &bull; {user?.xp || 0} XP</span>
                  </div>
                  <div className="glass-card p-4 flex flex-col items-center justify-center">
                      <span className="text-warning flex items-center font-bold text-xl"><Flame size={20} className="mr-1"/> {streak?.currentStreak || 0}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Current Streak</span>
                  </div>
                  <div className="glass-card p-4 flex flex-col items-center justify-center">
                      <span className="text-primary flex items-center font-bold text-xl"><Star size={20} className="mr-1"/> {user?.xp || 0}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Total XP</span>
                  </div>
                  <div className="glass-card p-4 flex flex-col items-center justify-center">
                      <span className="text-success font-bold text-xl">{tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length)*100) : 0}%</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Daily Progress</span>
                  </div>
              </div>

              {/* Missions & Plan */}
              <div className="grid grid-cols-2 gap-6 flex-1">
                  {/* Missions */}
                  <div className="glass-card p-5 flex flex-col relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full pointer-events-none"></div>
                      <h3 className="font-bold text-sm tracking-wider mb-4 flex items-center"><Trophy size={16} className="text-accent mr-2"/> TODAY'S MISSION</h3>
                      
                      <div className="space-y-3 flex-1">
                          {[
                              { label: 'Primary', task: getMission('Primary'), color: 'text-primary', border: 'border-primary', xp: 50 },
                              { label: 'Secondary', task: getMission('Secondary'), color: 'text-success', border: 'border-success', xp: 30 },
                              { label: 'Bonus', task: getMission('Bonus'), color: 'text-info', border: 'border-info', xp: 20 }
                          ].map(m => (
                              <div key={m.label} className={`bg-black/40 p-3 rounded-lg border-l-2 ${m.border} ${m.task?.completed ? 'opacity-50' : ''}`}>
                                  <div className="flex justify-between items-start mb-1">
                                      <span className={`text-[10px] font-bold uppercase ${m.color}`}>{m.label} Mission</span>
                                      <span className={`text-[10px] font-bold ${m.color}`}>+{m.xp} XP</span>
                                  </div>
                                  
                                  {m.task ? (
                                      <div className="flex justify-between items-center mt-1">
                                          <p className={`text-xs font-semibold ${m.task.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{m.task.title}</p>
                                          {!m.task.completed ? (
                                              <button onClick={() => handleCompleteTask(m.task._id)} className="text-[10px] bg-white/10 px-2 py-1 rounded hover:bg-white/20">Done</button>
                                          ) : (
                                              <CheckCircle size={14} className="text-success" />
                                          )}
                                      </div>
                                  ) : (
                                      <div className="flex gap-2 mt-1">
                                          <input 
                                            type="text" 
                                            placeholder={`Set ${m.label}...`}
                                            className="bg-white/5 border border-white/10 text-xs px-2 py-1 flex-1 rounded focus:outline-none focus:border-white/30 text-white"
                                            value={missionInputs[m.label]}
                                            onChange={(e) => setMissionInputs({...missionInputs, [m.label]: e.target.value})}
                                          />
                                          <button onClick={(e) => handleAddTask(e, true, m.label)} className="bg-white/10 text-[10px] px-2 rounded hover:bg-white/20">Add</button>
                                      </div>
                                  )}
                              </div>
                          ))}
                      </div>
                  </div>

                  {/* Checklist */}
                  <div className="glass-card p-5 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                          <h3 className="font-bold text-sm tracking-wider flex items-center"><CheckCircle size={16} className="text-success mr-2"/> TODAY'S PLAN</h3>
                          <form onSubmit={(e) => handleAddTask(e, false, 'Normal')} className="flex max-w-[120px]">
                              <input 
                                  type="text" 
                                  placeholder="Add..." 
                                  className="bg-black/40 border border-white/10 rounded-l px-2 py-1 text-[10px] w-full focus:outline-none focus:border-primary"
                                  value={newTaskTitle}
                                  onChange={(e) => setNewTaskTitle(e.target.value)}
                              />
                              <button type="submit" className="bg-primary/20 text-primary px-2 py-1 rounded-r text-[10px] hover:bg-primary/40">+</button>
                          </form>
                      </div>
                      
                      <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                          {planTasks.length === 0 && <p className="text-xs text-gray-500">No tasks planned.</p>}
                          {planTasks.map(task => (
                              <div key={task._id} onClick={() => !task.completed && handleCompleteTask(task._id)}
                                  className="flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 p-2 rounded transition">
                                  <div className="flex items-center gap-3 truncate max-w-[70%]">
                                      {task.completed ? <CheckCircle size={14} className="text-success shrink-0"/> : <Circle size={14} className="text-gray-500 shrink-0"/>}
                                      <span className={`truncate ${task.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>{task.title}</span>
                                  </div>
                                  <span className="text-success font-bold text-[10px] shrink-0">+{task.xpReward} XP</span>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>

          {/* Column 3: Right Side */}
          <div className="col-span-3 flex flex-col gap-6">
              
              {/* Focus Session */}
              <div className="glass-card p-6 flex flex-col items-center justify-center text-center relative border-t-4 border-t-primary">
                  <h3 className="text-xs font-bold tracking-widest text-gray-400 mb-6 uppercase">Focus Session</h3>
                  
                  {/* Huge Timer */}
                  <div className="relative w-48 h-48 flex flex-col items-center justify-center rounded-full border-8 border-black/40 shadow-inner group">
                      <svg className="absolute w-full h-full transform -rotate-90 pointer-events-none">
                          <circle cx="50%" cy="50%" r="46%" stroke="#FFC107" strokeWidth="8" fill="transparent" 
                              strokeDasharray="289" strokeDashoffset={289 - (((selectedMinutes*60) - timeLeft)/(selectedMinutes*60))*289} className="transition-all duration-1000" />
                      </svg>
                      <div className="flex flex-col items-center z-10">
                          <span className="text-5xl font-black text-white font-mono tracking-tighter">{formatTime(timeLeft)}</span>
                          
                          {/* Customizable Minutes Input */}
                          {!isActive && timeLeft === selectedMinutes * 60 ? (
                              <div className="flex items-center gap-1 mt-2">
                                  <input 
                                      type="number" 
                                      value={selectedMinutes} 
                                      onChange={(e) => setSelectedMinutes(Math.max(1, parseInt(e.target.value) || 1))}
                                      className="w-10 bg-transparent text-center text-xs border-b border-gray-600 focus:outline-none focus:border-primary text-gray-400"
                                  />
                                  <span className="text-[10px] text-gray-500 uppercase">Min</span>
                              </div>
                          ) : (
                              <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Focus Time</span>
                          )}
                      </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-4 mt-6">
                      <button onClick={toggleTimer} className="w-12 h-12 bg-primary text-black rounded-full flex items-center justify-center hover:scale-105 transition shadow-lg shadow-primary/20">
                          {isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                      </button>
                      <button onClick={resetTimer} className="w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition">
                          <Square size={16} fill="currentColor" />
                      </button>
                  </div>
              </div>

              {/* Progress Bars */}
              <div className="glass-card p-5">
                  <h3 className="font-bold text-sm mb-4">TRACK YOUR PROGRESS</h3>
                  <div className="space-y-3 text-xs font-semibold">
                      {[ {n: 'Aptitude', p: calcProgress('Aptitude'), c: '#FFC107'}, {n: 'DSA', p: calcProgress('DSA'), c: '#4CAF50'}, {n: 'OOPS', p: calcProgress('OOPS'), c: '#2196F3'}, {n: 'OS', p: calcProgress('OS'), c: '#9C27B0'} ].map(s => (
                          <div key={s.n} className="flex items-center gap-3">
                              <span className="w-16 text-gray-400">{s.n}</span>
                              <div className="flex-1 bg-black/50 h-2 rounded-full overflow-hidden relative">
                                  <motion.div initial={{width:0}} animate={{width:`${s.p}%`}} className="h-full rounded-full" style={{backgroundColor: s.c}}></motion.div>
                              </div>
                              <span className="w-8 text-right">{s.p}%</span>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
