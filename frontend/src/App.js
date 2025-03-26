import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import VerifyOTP from './components/VerifyOTP';
import Verify2FA from './components/Verify2FA';
import Dashboard from './components/Dashboard';
import TwoFactorAuth from './components/TwoFactorAuth';

function Home() {
    const navigate = useNavigate();
    return (
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100vh', 
            backgroundColor: '#f0f4f8', 
            fontFamily: 'Arial, sans-serif' 
        }}>
            <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '20px' }}>Welcome to My Page</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <button 
                    style={{ 
                        padding: '15px 30px', 
                        fontSize: '1rem', 
                        color: '#fff', 
                        backgroundColor: '#007bff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s' 
                    }} 
                    onClick={() => navigate('/login')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Login
                </button>
                <button 
                    style={{ 
                        padding: '15px 30px', 
                        fontSize: '1rem', 
                        color: '#fff', 
                        backgroundColor: '#28a745', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        transition: 'background-color 0.3s' 
                    }} 
                    onClick={() => navigate('/register')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1e7e34'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                >
                    Register
                </button>
            </div>
        </div>
    );
}

function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/verify-2fa" element={<Verify2FA />} />
                <Route path="/2fa" element={<TwoFactorAuth />} />
                <Route 
                    path="/dashboard" 
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;