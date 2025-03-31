import React, { useContext, useState } from 'react';
import { TaskContext } from '../../App';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

export const ToDoInput = () => {

    const { user } = useContext(TaskContext);
    const { setTask } = useContext(TaskContext);
    const [focused, setFocused] = useState(false);
    const [toDo, setToDo] = useState({ task: "", preority: "low" });
    const [response, setResponse] = useState(true);

    const addTask = async () => {
        if (!toDo.task.trim())
            return;
        setResponse(false);
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/addtask`, { task: { ...toDo, date: Date(), completed: false, user } });
        if (response.status == 201) {
            setTask(response.data.newTasks);
            setResponse(true);
        }
        setToDo({ task: "", preority: toDo.preority });
    }

    return (
        <>
            {!response && <div className="loader">
                <BeatLoader size={20} color="cyan" />
                <BeatLoader size={20} color="cyan" />
            </div>}
            <div className="d-flex justify-content-center mt-5">
                <div className="col-12 col-lg-6">
                    <form onSubmit={(e) => { e.preventDefault(); addTask() }}>
                        <div className="input-container">
                            <label className={`${focused ? "todo-label-focused" : !toDo.task ? "todo-label" : "todo-label-focused"}`} htmlFor="todo-input">Enter Task</label>
                            <input
                                className="todo-input form-control py-3"
                                type="text"
                                name="toDoInput"
                                id="todo-input"
                                onFocus={() => setFocused(true)}
                                onBlur={() => setFocused(false)}
                                value={toDo.task}
                                onChange={(e) => setToDo({ ...toDo, task: e.target.value })}
                                required
                            />
                            <select name="preority" className="preority" onChange={(e) => setToDo({ ...toDo, preority: e.target.value })}>
                                <option value="low">&nbsp;Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">&nbsp;High</option>
                            </select>
                            {!focused && !toDo.task && <i className="fa-solid fa-pencil pen-icon" />}
                            <i className="fa-solid fa-square-plus plus-icon" onClick={addTask} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
