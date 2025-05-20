import { Router } from "express";
import taskController from "../controllers/taskController.js";
const routes = Router();
routes.get('/getTasks', taskController.getAllTasks);
routes.post('/createTask', taskController.createTask);
routes.put('/updateTask', taskController.updateTask);
routes.delete('/deleteTask/:id', taskController.deleteTask);
export default routes;
