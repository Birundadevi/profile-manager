// src/App.tsx
import React, { useState, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Layout from './layout/Layout';
import Dashboard from './pages/Dashboard';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  githubUsername?: string;
}

const AppContent: React.FC = () => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [initialLoad, setInitialLoad] = useState<boolean>(true);
    const navigate = useNavigate();

    const API_URL = `${import.meta.env.REACT_APP_BACKEND_BASEURL}/api/users`;

    useEffect(() => {
        const userId = localStorage.getItem('user-id');
        if (userId) {
            const fetchUserProfile = async () => {
                try {
                    const response = await fetch(`${API_URL}/${userId}`);
                    const data = await response.json();
                    if (response.ok) {
                        setUser(data);
                    } else {
                        localStorage.removeItem('user-id');
                        // Invalidate local cache and redirect to login if user not found
                        localStorage.clear();
                        navigate('/');
                    }
                } catch (err) {
                    console.error('Failed to fetch user profile:', err);
                    localStorage.removeItem('user-id');
                    // Invalidate local cache and redirect to login on error
                    localStorage.clear();
                    navigate('/');
                } finally {
                    setInitialLoad(false);
                }
            };
            fetchUserProfile();
        } else {
            setInitialLoad(false);
        }
    }, [API_URL, navigate]);

    const handleLogin = (loggedInUser: UserProfile) => {
        setUser(loggedInUser);
        navigate('/profile');
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.clear(); // Clear all items from localStorage
        navigate('/'); // Navigate to the login page
    };

    const handleProfileUpdate = (updatedUser: UserProfile) => {
        setUser(updatedUser);
    };

    if (initialLoad) {
        return <div className="container"><p className="info">Loading...</p></div>;
    }

    return (
        <Routes>
            <Route path="/" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            {/* Protected route for Dashboard */}
            <Route
                path="/dashboard"
                element={
                    user ? (
                        <Layout onLogout={handleLogout}>
                            <Dashboard user={user} />
                        </Layout>
                    ) : (
                        <div className="container">
                            <p className="error">Please log in to view your dashboard.</p>
                        </div>
                    )
                }
            />
            <Route
                path="/profile"
                element={
                    user ? (
                        <Layout onLogout={handleLogout}>
                            <Profile user={user} onProfileUpdate={handleProfileUpdate} />
                        </Layout>
                    ) : (
                        <div className="container">
                            <p className="error">Please log in to view your profile.</p>
                        </div>
                    )
                }
            />
        </Routes>
    );
};

const App: React.FC = () => (
    <BrowserRouter>
        <AppContent />
    </BrowserRouter>
);

export default App;