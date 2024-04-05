import mongoose, {model, Schema} from "mongoose";
import {MessageDto} from "../types/dto/message.dto";

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        },
        content: {
            type: String,
            trim: true
        },
        roomId: {
            type: Schema.Types.ObjectId,
            ref: "Rooms"
        }
    },
    {
        timestamps: true
    }
)

export default model<MessageDto>("Messages", messageSchema)