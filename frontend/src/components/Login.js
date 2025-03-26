import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TwoFactorAuth from './TwoFactorAuth';  // Import the TwoFactorAuth component


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [isTwoFactorAuth, setIsTwoFactorAuth] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const Base_Url = process.env.REACT_APP_BASE_URL;
    console.log('Base URL:', Base_Url);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Send login request
            const response = await axios.post(`${Base_Url}/auth/login`, { 
                email: email.trim(), 
                password: password.trim() 
            });

            console.log('Login Response:', response.data);

            if (response.data.twoFactorRequired) {
                // Send setup-2fa request if 2FA is required
                console.log('Sending 2FA setup request');
                const setupResponse = await axios.post(`${Base_Url}/auth/setup-2fa`, { email: email.trim() , userId: response.data.userId });
                console.log('2FA Setup Response:', setupResponse.data);

                setUserId(response.data.userId);
                localStorage.setItem('userId', response.data.userId);
                setIsTwoFactorAuth(true); // Show the TwoFactorAuth component
            } else {
                localStorage.setItem('token', response.data.token);
                alert('Login successful');
                navigate('/dashboard'); // Redirect to Dashboard without 2FA
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Error logging in');
        } finally {
            setLoading(false);
        }
    };

    // const handleForgotPassword = async () => {
    //     setLoading(true);
    //     try {
    //         await axios.post('http://localhost:3010/auth/send-otp', { email: email.trim() });
    //         setIsOtpSent(true);
    //         alert('OTP sent to your email');
    //     } catch (error) {
    //         alert(error.response?.data?.message || 'Error sending OTP');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleVerifyOtp = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${Base_Url}/auth/verify-otp`, { email: email.trim(), otp });
            if (response.data.success) {
                setIsOtpVerified(true);
                alert('OTP verified. You can now reset your password.');
                navigate('/reset-password');
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            alert(error.response?.data?.message || 'Error verifying OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleTwoFactorAuth = async (otp) => {
        setLoading(true);
        try {
            const response = await axios.post(`${Base_Url}/auth/verify-2fa`, { email: email.trim() , token: otp });
            localStorage.setItem('token', response.data.token);
            alert('Two-factor authentication successful');
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Error verifying OTP');
        } finally {
            setLoading(false);
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
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Login</h2>
                {!isTwoFactorAuth ? (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '5px',
                                    border: '1px solid #ccc'
                                }}
                            />
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%',
                                padding: '10px',
                                backgroundColor: loading ? '#ccc' : '#007bff',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <TwoFactorAuth
                        userId={userId}
                        handleTwoFactorAuth={handleTwoFactorAuth}
                    />
                )}
                {/* <p style={{ marginTop: '20px', color: '#555', textAlign: 'center' }}>
                    {!isOtpSent && (
                        <button
                            onClick={handleForgotPassword}
                            disabled={loading}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007bff',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                textDecoration: 'underline',
                                fontSize: '14px'
                            }}
                        >
                            Forgot Password?
                        </button>
                    )}
                </p> */}
                <p style={{ marginTop: '20px', color: '#555', textAlign: 'center' }}>
                    Not registered yet?{' '}
                    <button
                        onClick={() => navigate('/register')}
                        disabled={loading}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#007bff',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            textDecoration: 'underline',
                            fontSize: '14px'
                        }}
                    >
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
