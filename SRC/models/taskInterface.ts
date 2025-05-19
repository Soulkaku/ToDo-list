import { Types } from "mongoose";

interface ITask {
    _id : Types.ObjectId;
    text: string;
}

export default ITask;