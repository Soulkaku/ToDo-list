import taskModel from "../models/TaskModel.js";
import { Types } from "mongoose";
import ITask from "../models/taskInterface.js";

export default new class taskService {
    
    async getAllTasks() : Promise<object[]> {
        const tasks = await taskModel.find().select({ _id : Types.ObjectId, text: String});
        return tasks.map(attr => ({
            _id : attr._id,
            text: attr.text
        }));
    }

    async createTask(text : string) : Promise<ITask> {
        return await taskModel.create({ text : text});
    }

    async updateTask(task : ITask) : Promise<ITask | null> {
        const { _id, text } = task;

        return await taskModel.findByIdAndUpdate(_id, {text : text}, { new: true});
    }

    async deleteTask(_id : string) : Promise<void> {
        await taskModel.findByIdAndDelete(_id);
    }
}