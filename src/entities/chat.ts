import mongoose, {model, Schema} from "mongoose"

const chatSchema = new Schema(
    {
        chatName: {
            type: String,
            trim: true
        },
        isGroupChat: {
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

export default model<any>("Chats", chatSchema)