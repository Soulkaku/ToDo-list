import mongoose, { Types, Schema } from "mongoose";

interface ITask {
    _id : Types.ObjectId;
    text: string;
}

const taskSchema = new Schema<ITask>({
    text: { type: String, required: true}
});

export default mongoose.model<ITask>('Tasks', taskSchema);