import { Router } from "express";
import taskController from "../controllers/taskController.js";
const routes = Router();
routes.get('/getTasks', taskController.getAllTasks);
routes.post('/createTask', taskController.createTask);
export default routes;
