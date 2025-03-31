import taskModel from "./taskModel.js";
import bcryptjs from "bcryptjs";

// Auth Controller
export const userSignIn = async (req, res, next) => {
    try {
        const { name, phone, password, confirmPw } = req.body.userDetails;
        if (password !== confirmPw)
            return res.status(409).json({ message: "Password doesn't match" });
        const userExist = await taskModel.findOne({ name });
        if (userExist) {
            return res.status(403).json({ message: "User Name already exists" });
        }
        const hashedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
        const user = await taskModel.create({ name, phone, password: hashedPassword, tasks: [] });
        return res.status(201).json({ message: "Successfully Signed In", user: user._id });
    } catch (err) {
        next(err);
    }
}

export const userSignOut = async (req, res, next) => {
    try {
        const { name, phone, password, user } = req.body.userDetails;
        const userInfo = await taskModel.findById(user);
        if (userInfo) {
            if (name == userInfo.name && phone == userInfo.phone) {
                if (bcryptjs.compareSync(password, userInfo.password)) {
                    await taskModel.findByIdAndDelete(user);
                    return res.status(200).json({ message: "Successfully Signed Out" });
                }
                return res.status(409).json({ message: "Incorrect Password" });
            }
            return res.status(409).json({ message: "Incorrect User Name or Phone" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        next(err);
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { name, password } = req.body.userDetails;
        const user = await taskModel.findOne({ name });
        if (user) {
            if (bcryptjs.compareSync(password, user.password)) {
                return res.status(201).json({ message: "Successfully Logged In", user: user._id });
            }
            return res.status(409).json({ message: "Incorrect Password" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        next(err);
    }
}

export const userLogOut = async (req, res, next) => {
    try {
        const { name, password, user } = req.body.userDetails;
        const userInfo = await taskModel.findById(user);
        if (userInfo) {
            if (name == userInfo.name) {
                if (bcryptjs.compareSync(password, userInfo.password)) {
                    return res.status(200).json({ message: "Successfully Logged out" });
                }
                return res.status(409).json({ message: "Incorrect Password" });
            }
            return res.status(409).json({ message: "Incorrect User Name" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        next(err);
    }
}

// Task Controller

export const getTask = async (req, res, next) => {
    try {
        const { user } = req.params;
        if (user) {
            const tasks = await taskModel.findById(user);
            if (tasks)
                return res.status(200).json({ tasks: tasks.tasks });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        next(err);
    }
}

export const addTask = async (req, res, next) => {
    try {
        const { task } = req.body;
        const updatedTask = await taskModel.findOneAndUpdate({ _id: task.user }, {
            $push: {
                tasks: {
                    task: task.task,
                    preority: task.preority,
                    completed: task.completed,
                    date: task.date
                }
            }
        }, { new: true });
        return res.status(201).json({ message: "Successfully Added", newTasks: updatedTask.tasks });
    } catch (err) {
        next(err);
    }
}


export const removeTask = async (req, res, next) => {
    try {
        const { user, task } = req.params;
        const updatedTask = await taskModel.findOneAndUpdate(
            { _id: user },
            { $pull: { tasks: { _id: task } } },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ message: "Successfully Removed", newTasks: updatedTask.tasks });
    } catch (err) {
        next(err);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { user, task, completed } = req.query;
        const updatedTask = await taskModel.findOneAndUpdate(
            { _id: user, "tasks._id": task },
            { $set: { "tasks.$.completed": completed } },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Something went wrong" });
        }
        return res.status(200).json({ message: "Successfully Updated", updatedTask: updatedTask.tasks });
    } catch (err) {
        next(err);
    }
}

// Update Password

export const updatePassword = async (req, res, next) => {
    try {
        const { name, phone, password, confirmPw, user } = req.body.userDetails;
        let userTask;
        if (user)
            userTask = await taskModel.findById(user);
        else
            userTask = await taskModel.findOne({ name });
        if (password !== confirmPw)
            return res.status(409).json({ message: "Password Missmatch" });
        if (userTask.name == name) {
            if (userTask.phone == phone) {
                const newPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
                await taskModel.findByIdAndUpdate({ _id: userTask._id }, { $set: { password: newPassword } });
                return res.status(200).json({ message: "Password Updated" });
            }
            return res.status(409).json({ message: "Incorrect Phone" });
        }
        return res.status(404).json({ message: "User not found" });
    } catch (err) {
        next(err);
    }
}