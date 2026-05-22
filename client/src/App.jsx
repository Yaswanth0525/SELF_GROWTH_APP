import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import { AuthProvider, AuthContext } from './context/AuthContext';

// Import New Pages
import Learning from './pages/Learning';
import NotesVault from './pages/NotesVault';
import Roadmap from './pages/Roadmap';
import Analytics from './pages/Analytics';
import Achievements from './pages/Achievements';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="flex h-screen bg-background text-white overflow-hidden">
      {user && <Sidebar />}
      <div className="flex-1 overflow-y-auto p-8">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          
          <Route path="/learning/:subject" element={<PrivateRoute><Learning /></PrivateRoute>} />
          <Route path="/notes" element={<PrivateRoute><NotesVault /></PrivateRoute>} />
          <Route path="/roadmap" element={<PrivateRoute><Roadmap /></PrivateRoute>} />
          <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
          <Route path="/achievements" element={<PrivateRoute><Achievements /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          
          {/* Redirect old simple routes to learning dynamic route if they are visited directly */}
          <Route path="/aptitude" element={<Navigate to="/learning/aptitude" />} />
          <Route path="/dsa" element={<Navigate to="/learning/dsa" />} />
          <Route path="/oops" element={<Navigate to="/learning/oops" />} />
          <Route path="/os" element={<Navigate to="/learning/os" />} />
          <Route path="/dbms" element={<Navigate to="/learning/dbms" />} />
          <Route path="/communication" element={<Navigate to="/learning/communication" />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
