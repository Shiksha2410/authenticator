import React, { useState } from 'react';



const Verify2FA = ({ userId, handleTwoFactorAuth }) => {
    const [otp, setOtp] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleTwoFactorAuth(otp);
    };

    return (
        <div>
            <h2>Verify Two-Factor Authentication</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                <button type="submit">Verify</button>
            </form>
        </div>
    );
};

export default Verify2FA;
