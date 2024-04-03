import mongoose, {model, Schema} from "mongoose"

const roomSchema = new Schema(
    {
        roomName: {
            type: String,
            trim: true
        },
        isGroupRoom: {
            type: Boolean,
            default: false
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: "Users"
            }
        ],
        latestMessage: {
            type: Schema.Types.ObjectId,
            ref: "Messages"
        },
        groupAdmin: {
            type: Schema.Types.ObjectId,
            ref: "Users"
        }
    },
    {
        timestamps: true
    }
)

export default model<any>("Rooms", roomSchema)