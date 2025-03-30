import axios from 'axios';
import React, { useContext } from 'react';
import { TaskContext } from '../../App';
import { toast } from "sonner";

export const ToDoItem = ({ task, setRes }) => {

    const { user, setTask } = useContext(TaskContext);

    const removeTask = async () => {
        try {
            setRes(false);
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/removetask/${user}/${task._id}`);
            if (response.status == 200) {
                setTask(response.data.newTasks);
                setRes(true);
            }
        } catch (err) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.response.data.error || err.message);
                toast.error("Something went weong");
            }
            setRes(true);
        }
    }

    const updateTask = async () => {
        try {
            setRes(false);
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/updatetask?user=${user}&task=${task._id}&completed=${!task.completed}`);
            if (response.status == 200) {
                setTask(response.data.updatedTask);
                setRes(true);
            }
        } catch (err) {
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                console.log(err.response.data.error || err.message);
                toast.error("Something went weong");
            }
            setRes(true);
        }
    }

    return (
        <>
            <div className="col-12 col-md-6">
                <div className="d-flex align-items-center">
                    <div className="todo-item-date">
                        {<h6 className="text-warning ps-2">{task.date.slice(0, 21)}</h6>}
                    </div>
                    <div className="ms-auto px-1 todo-item p-0 m-0">
                        <h5 className={`text-center ${task.preority == "low" ? "text-success" : task.preority == "medium" ? "text-primary" : "text-danger"}`}>{task.preority.toUpperCase()}</h5>
                    </div>
                </div>
                <div className={`todo-item ${task.preority}`}>
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="col-2 text-start">
                            <input type="checkbox" name="check-box" className="checked-item" checked={task.completed} onChange={updateTask} />
                        </div>
                        <div className="col-8 text-center">
                            <p className={`text-white text-truncate ${task.completed && "text-decoration-line-through"}`}>{task.task}</p>
                        </div>
                        <div className="col-2 text-end">
                            <i className="fa-solid fa-trash-can trash-icon" onClick={removeTask} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}