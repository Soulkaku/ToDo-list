import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({
    text: { type: String, required: true }
}, { versionKey: false });
export default mongoose.model('Tasks', taskSchema);
