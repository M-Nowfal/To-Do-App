import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: [{
        task: { type: String, required: true },
        preority: { type: String, required: true, default: "low" },
        completed: { type: Boolean, required: true, default: false },
        date: { type: String, required: true }
    }]
});

const taskModel = mongoose.model("Task", taskSchema);

export default taskModel;