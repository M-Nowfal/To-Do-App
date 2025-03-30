import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TaskContext } from '../../App';
import axios from 'axios';
import { toast } from 'sonner';

export const UserSignOut = () => {

    const { user, setUser } = useContext(TaskContext);
    const [view, setView] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: "", phone: "", password: "", user });
    const [focused, setFocused] = useState({ name: false, phone: false, password: false });
    const navigate = useNavigate();

    const handleUserSignOut = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/signout`, { userDetails });
            if (response.status == 200) {
                setUser("");
                localStorage.clear();
                toast.success(response.data.message);
                navigate("/");
            }
        } catch (err) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.response.data.error || err.message);
                toast.error("Something went weong");
            }
        }
    }

    function handleUserDetails(e) {
        setUserDetails(prev => ({
            ...prev, [e.target.name]: e.target.value
        }));
    }

    function handleFocusBlur(e) {
        setFocused(prev => ({
            ...prev, [e.target.name]: !prev[e.target.name]
        }));
    }

    return (
        <div className="d-flex align-items-center vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="auth-container">
                            <h2 className="text-center auth-title">User Sign-Out</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleUserSignOut(); }}>
                                <div className="input-container">
                                    <label className={`${focused.name ? "auth-label-focused" : !userDetails.name ? "auth-label" : "auth-label-focused"}`} htmlFor="user-name">User Name</label>
                                    <input
                                        className="auth-input"
                                        type="text"
                                        name="name"
                                        id="user-name"
                                        minLength={6}
                                        maxLength={10}
                                        value={userDetails.name}
                                        onChange={handleUserDetails}
                                        onFocus={handleFocusBlur}
                                        onBlur={handleFocusBlur}
                                        required
                                    />
                                    {!focused.name && !userDetails.name && <i className="fa-solid fa-user icons" />}
                                </div>
                                <div className="input-container">
                                    <label className={`${focused.phone ? "auth-label-focused" : !userDetails.phone ? "auth-label" : "auth-label-focused"}`} htmlFor="phone-no">Phone</label>
                                    <input
                                        className="auth-input"
                                        type="number"
                                        name="phone"
                                        id="phone-no"
                                        min={999999999}
                                        max={9999999999}
                                        value={userDetails.phone}
                                        onChange={handleUserDetails}
                                        onFocus={handleFocusBlur}
                                        onBlur={handleFocusBlur}
                                        required
                                    />
                                    {!focused.phone && !userDetails.phone && <i className="fa-solid fa-phone icons" />}
                                </div>
                                <div className="input-container">
                                    <label className={`${focused.password ? "auth-label-focused" : !userDetails.password ? "auth-label" : "auth-label-focused"}`} htmlFor="pw">Password</label>
                                    <input
                                        className="auth-input"
                                        type={`${view ? "text" : "password"}`}
                                        name="password"
                                        id="pw"
                                        minLength={6}
                                        maxLength={12}
                                        value={userDetails.password}
                                        onChange={handleUserDetails}
                                        onFocus={handleFocusBlur}
                                        onBlur={handleFocusBlur}
                                        required
                                    />
                                    {!focused.password && !userDetails.password && <i className="fa-solid fa-key icons" />}
                                    <i
                                        className={`${view ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} eye`}
                                        onClick={() => setView(prev => !prev)}
                                    />
                                </div>
                                <div className="d-flex align-items-center mt-2">
                                    <div className="me-auto">
                                        <input
                                            className="auth-sub-btn"
                                            type="submit"
                                            name="sub"
                                            value="Submit"
                                        />
                                    </div>
                                    <div className="ms-auto">
                                        <Link to="/forgotpassword" className="link" >Forgot Password?</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}