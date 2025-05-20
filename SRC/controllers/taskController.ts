import { Request, Response } from "express";
import taskService from "../services/taskService.js";
import ITask from "../models/taskInterface.js";

export default class {

    static async getAllTasks(req: Request, res: Response): Promise<any> {
        try {
            const tasks = await taskService.getAllTasks();

            return res.status(200).json({tasks});
        } catch (error) {
            res.status(400).json({ message: error});
        }
    }

    static async createTask(req: Request, res: Response): Promise<any> {
        try {
            const { text } = req.body as Partial<ITask>;


            if(!text || typeof text !== 'string' ) {
                return res.status(400).json({ message: " text field must be a non-empty string"});
            }

            const taskCreated = await taskService.createTask(text);

            return res.status(201).json(taskCreated);
        } catch (error) {
            return res.status(500).json({ message: "ERROR IN CREATING A TASK " + error});
        }
    }

    static async updateTask( req: Request, res: Response) {
        try {
            const taskAttr = req.body as ITask;
            const updateTask = await taskService.updateTask(taskAttr);

            console.log(updateTask);
        } catch (error) {
            res.status(500).json({ message : error});
        }
    }

    static async deleteTask( req: Request, res: Response) : Promise<void> {
        try {
            const taskId : string = req.params.id;

            await taskService.deleteTask(taskId);

            res.status(200).json(taskId);
        } catch(error) {
            res.status(500).json({ message : error });
        }
    }

}