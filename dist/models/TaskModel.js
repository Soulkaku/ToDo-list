import mongoose, { Schema } from "mongoose";
// interface ITask {
//     _id : Types.ObjectId;
//     text: string;
// }
const taskSchema = new Schema({
    text: { type: String, required: true }
}, { versionKey: false });
export default mongoose.model('Tasks', taskSchema);
// export default mongoose.model<ITask>('Tasks', taskSchema);
