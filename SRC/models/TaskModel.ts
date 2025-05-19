import mongoose ,{ Types, Schema, version } from "mongoose";
import ITask from "./taskInterface.js";

// interface ITask {
//     _id : Types.ObjectId;
//     text: string;
// }

const taskSchema = new Schema<ITask>({
    text: { type: String, required: true}
}, { versionKey: false });

export default mongoose.model('Tasks', taskSchema);
// export default mongoose.model<ITask>('Tasks', taskSchema);