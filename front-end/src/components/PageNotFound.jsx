import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PageNotFound = () => {

    const navigate = useNavigate();

    return (
        <div className="d-flex pnf justify-content-center align-items-center vh-100 position-fixed">
            <div className="text-center">
                <h3 className="text-cyan">Page Not Found</h3>
                <button onClick={() => navigate("/")} className="btn btn-primary">Home</button>
            </div>
        </div>
    );
}