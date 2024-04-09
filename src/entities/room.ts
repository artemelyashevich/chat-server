import mongoose, {model, Schema} from "mongoose";
import {MessageDto} from "../types/dto/message.dto";
import {RoomDto} from "../types/dto/room.dto";

const roomSchema = new Schema(
    {
        title: {
            type: String,
            ref: "Users"
        },
        usersId: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users"
            }
        ],
        creatorId: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }
    },
    {
        timestamps: true
    }
)

export default model<RoomDto>("Rooms", roomSchema)