import taskModel from "../models/TaskModel.js";
import { Types } from "mongoose";

export default new class taskService {
    
    async getAllTasks() : Promise<object[]> {
        const tasks = await taskModel.find().select({ _id : Types.ObjectId, text: String});
        return tasks.map(attr => ({
            _id : attr._id,
            text: attr.text
        }));
    }

    async createTask(text : string) : Promise<object> {
        const newTask = await taskModel.create({ text : text});

        return newTask;
    }
}