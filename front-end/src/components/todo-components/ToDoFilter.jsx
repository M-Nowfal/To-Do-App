import React, { useContext } from 'react';
import { TaskContext } from '../../App';

export const ToDoFilter = () => {

    const { setFilter } = useContext(TaskContext);

    return (
        <div className="d-flex">
            <h5 className="text-white mx-2 filter" onClick={() => setFilter("all")}>All</h5>
            <h5 className="text-white mx-2 filter" onClick={() => setFilter("completed")}>Completed</h5>
            <h5 className="text-white mx-2 filter" onClick={() => setFilter("pending")}>Pending</h5>
        </div>
    );
}