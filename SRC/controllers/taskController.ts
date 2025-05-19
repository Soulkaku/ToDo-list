import { Request, Response } from "express";
import taskService from "../services/taskService.js";
import ITask from "../models/taskInterface.js";

export default class {

    static async getAllTasks(req: Request, res: Response) {
        try {
            const tasks = await taskService.getAllTasks();

            res.status(200).json({tasks});
        } catch (error) {
            res.status(400).json({ message: error});
        }
    }

    static async createTask(req: Request, res: Response) {
        try {
            const { text } = <ITask>req.body;
            const taskCreated = await taskService.createTask(text);

            if(!taskCreated) {
                return console.log("this task don't have all attributes necessaries");
            }

            res.status(201).json(taskCreated);
        } catch (error) {
            res.status(500).json({ message: "ERROR IN CREATING A TASK " + error});
        }
    }

}