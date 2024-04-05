import mongoose, {model, Schema} from "mongoose";
import {MessageDto} from "../types/dto/message.dto";

const roomSchema = new Schema(
    {
        title: {
            type: String,
            ref: "Users"
        }
    },
    {
        timestamps: true
    }
)

export default model<MessageDto>("Rooms", roomSchema)