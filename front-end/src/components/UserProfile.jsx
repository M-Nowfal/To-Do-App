import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="user-auth-profile position-fixed">
                <div className="inner-user-1 d-flex align-items-center vh-100">
                    <div className="inner-user-2">
                        <h4 onClick={() => navigate("/logout")}>Log-Out</h4>
                        <h4 onClick={() => navigate("/signout")}>Sign-Out</h4>
                    </div>
                </div>
            </div>
        </>
    );
}