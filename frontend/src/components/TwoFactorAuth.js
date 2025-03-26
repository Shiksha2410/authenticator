import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuth = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const Base_Url = process.env.REACT_APP_BASE_URL;

    const handleVerifyOtp = async () => {
        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
        try {
            const response = await axios.post(`${Base_Url}/auth/verify-2fa`, { userId, token: otp });
            localStorage.setItem('token', response.data.token); // Store JWT token
            alert('Two-factor authentication successful');
            navigate('/dashboard'); // Redirect to Dashboard
        } catch (error) {
            alert('Error verifying OTP');
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Two-Factor Authentication</h2>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Enter OTP</label>
                    <input
                        type="text"
                        placeholder="OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '5px',
                            border: '1px solid #ccc'
                        }}
                    />
                </div>
                <button
                    onClick={handleVerifyOtp}
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
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default TwoFactorAuth;
