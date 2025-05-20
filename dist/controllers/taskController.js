import taskService from "../services/taskService.js";
export default class {
    static async getAllTasks(req, res) {
        try {
            const tasks = await taskService.getAllTasks();
            return res.status(200).json({ tasks });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    static async createTask(req, res) {
        try {
            const { text } = req.body;
            if (!text || typeof text !== 'string') {
                return res.status(400).json({ message: " text field must be a non-empty string" });
            }
            const taskCreated = await taskService.createTask(text);
            return res.status(201).json(taskCreated);
        }
        catch (error) {
            return res.status(500).json({ message: "ERROR IN CREATING A TASK " + error });
        }
    }
    static async updateTask(req, res) {
        try {
            const taskAttr = req.body;
            const updateTask = await taskService.updateTask(taskAttr);
            console.log(updateTask);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }
    static async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            await taskService.deleteTask(taskId);
            res.status(200).json(taskId);
        }
        catch (error) {
            res.status(500).json({ message: error });
        }
    }
}
