import React, { useContext, useState } from 'react';
import { TaskContext } from '../../App';
import { ToDoItem } from './ToDoItem';
import BeatLoader from 'react-spinners/BeatLoader';

export const ToDoList = () => {

    const { filteredTask } = useContext(TaskContext);
    const [res, setRes] = useState(true);

    return (
        filteredTask.length > 0 ? (
            <>
                {!res && <div className="loader">
                    <BeatLoader size={20} color="cyan" />
                    <BeatLoader size={20} color="cyan" />
                </div>}
                <div className="row mt-5">
                    <div className="position-relative">
                        <h1 className="text-center text-light mt-5">
                            Task Items
                        </h1>
                        <div className="row">
                            {filteredTask.map((item, index) => <ToDoItem key={index} task={item} setRes={setRes} />)}
                        </div>
                    </div>
                </div>
            </>
        ) : (
            <div className="row mt-5">
                <h1 className="text-center text-light mt-5">
                    Empty List
                </h1>
            </div>
        )
    );
}