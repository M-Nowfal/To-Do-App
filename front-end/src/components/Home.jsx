import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import BeatLoader from 'react-spinners/BeatLoader';
import { ToDoInput } from './todo-components/ToDoInput';
import { ToDoList } from './todo-components/ToDoList';
import { ToDoFilter } from './todo-components/ToDoFilter';
import { UserProfile } from './UserProfile';
import { toast } from 'sonner';
import { TaskContext } from '../App';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

    const { user, setTask } = useContext(TaskContext);
    const [open, setOpen] = useState(false);
    const [got, setGot] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        const getTasks = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/${user}`);
                if (response.status == 200) {
                    setTask(response.data.tasks || []);
                    setGot(true);
                }
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message)
                    toast.err(err.response.data.message);
                console.log(err.response.data.error || err.message);
                toast.error("Somthing went wrong");
            }
        }
        getTasks();
    }, []);

    return (
        <>
            <div className="profile" onClick={() => setOpen(!open)} >
                <i className="fa-solid fa-user fs-2 user-profile" />
            </div>
            {open && <UserProfile />}
            <div className="todo-filter px-2">
                <ToDoFilter />
            </div>
            <div className="add-task-input">
                <ToDoInput />
            </div>
            {got ? (
                <div className="container">
                    <div className="pt-5">
                        <ToDoList />
                    </div>
                </div>
            ) : (
                <div className="loader">
                    <BeatLoader size={20} color="cyan" />
                    <BeatLoader size={20} color="cyan" />
                </div>
            )}
        </>
    );
}
