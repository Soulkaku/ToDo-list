import mongoose ,{ Types, Schema, version } from "mongoose";
import ITask from "./taskInterface.js";

const taskSchema = new Schema<ITask>({
    text: { type: String, required: true}
}, { versionKey: false });

export default mongoose.model<ITask>('Tasks', taskSchema);