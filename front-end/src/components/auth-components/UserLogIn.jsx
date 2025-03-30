import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { TaskContext } from '../../App';

export const UserLogIn = () => {

    const { setUser } = useContext(TaskContext);
    const [view, setView] = useState(false);
    const [userDetails, setUserDetails] = useState({ name: "", password: "" });
    const [focused, setFocused] = useState({ name: false, password: false });
    const navigate = useNavigate();

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

    const handleUserLogin = async () => {
        try{
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, { userDetails });
            if(response.status == 201) {
                localStorage.setItem("user", response.data.user);
                setUser(response.data.user);
                toast.success(response.data.message);
                navigate("/");
            }else {
                toast.error(response.data.message);
            }
        }catch(err){
            if(err.response && err.response.data && err.response.data.message) {
                toast.error(err.response.data.message);
            }else{
                console.log(err.response.data.error || err.message);
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <div className="d-flex align-items-center vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-6">
                        <div className="auth-container">
                            <h2 className="text-center auth-title">User Log-In</h2>
                            <form onSubmit={(e) => { e.preventDefault(); handleUserLogin() }}>
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

                                <div className="mt-2">
                                    <div className="text-center">
                                        <input
                                            className="auth-sub-btn"
                                            type="submit"
                                            name="sub"
                                            value="Submit"
                                        />
                                    </div>
                                    <div className="d-flex">
                                        <div className="me-auto">
                                            <Link to="/forgotpassword" className="link" >Forgot Password?</Link>
                                        </div>
                                        <div className="ms-auto">
                                            <Link to="/signin" className="link" >Don't have Account?</Link>
                                        </div>
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