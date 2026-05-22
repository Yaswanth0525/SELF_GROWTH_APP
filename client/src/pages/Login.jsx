import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const { login, register } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password);
            }
        } catch (error) {
            alert('Authentication failed! Check console.');
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-background text-white">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card w-[400px] p-8 flex flex-col items-center"
            >
                <h1 className="text-3xl font-bold text-primary mb-2">GrowthOS</h1>
                <p className="text-sm text-gray-400 mb-8">{isLogin ? 'Welcome back to your command center' : 'Start your journey today'}</p>

                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    {!isLogin && (
                        <div>
                            <input 
                                type="text" 
                                placeholder="Your Name" 
                                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors mt-4"
                    >
                        {isLogin ? 'LOGIN' : 'START GROWING'}
                    </button>
                </form>

                <button 
                    onClick={() => setIsLogin(!isLogin)} 
                    className="text-xs text-gray-400 mt-6 hover:text-white transition-colors"
                >
                    {isLogin ? "Don't have an account? Register here" : "Already have an account? Login here"}
                </button>
            </motion.div>
        </div>
    );
};

export default Login;
