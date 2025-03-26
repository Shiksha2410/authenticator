import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const Base_Url = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${Base_Url}/auth/register`, { email, phone, username, password });
            alert('User registered successfully');
            navigate('/login'); // Redirect to login after successful registration
        } catch (error) {
            alert(error.response?.data?.message || 'Error registering user');
        }
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            backgroundColor: '#f0f4f8', 
            fontFamily: 'Arial, sans-serif' 
        }}>
            <div style={{ 
                backgroundColor: '#fff', 
                padding: '30px', 
                borderRadius: '10px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                width: '300px' 
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email</label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '5px', 
                                border: '1px solid #ccc' 
                            }} 
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Phone Number</label>
                        <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '5px', 
                                border: '1px solid #ccc' 
                            }} 
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Username</label>
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '5px', 
                                border: '1px solid #ccc' 
                            }} 
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password</label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ 
                                width: '100%', 
                                padding: '10px', 
                                borderRadius: '5px', 
                                border: '1px solid #ccc' 
                            }} 
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        style={{ 
                            width: '100%', 
                            padding: '10px', 
                            backgroundColor: '#28a745', 
                            color: '#fff', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer', 
                            fontSize: '16px' 
                        }}
                    >
                        Register
                    </button>
                </form>
                <p style={{ marginTop: '20px', color: '#555', textAlign: 'center' }}>
                    Already registered?{' '}
                    <button 
                        onClick={() => navigate('/login')} 
                        style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#007bff', 
                            cursor: 'pointer', 
                            textDecoration: 'underline', 
                            fontSize: '14px' 
                        }}
                    >
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
