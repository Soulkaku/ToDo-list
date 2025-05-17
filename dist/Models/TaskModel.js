import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({
    text: { type: String, required: true }
});
export default mongoose.model('Tasks', taskSchema);
